import { dbConnect } from '@/lib/dbConnect'
import User from '@/lib/models/User'
import { loginSchema } from '@/lib/validations/schema'
import bcrypt from 'bcryptjs'
import nextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Define authentication options
const authOptions: AuthOptions = {
  providers: [
    // Credentials-based authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const validationResult = loginSchema.safeParse(credentials)

        if (validationResult.success) {
          const { email, password } = validationResult.data

          await dbConnect()

          // Find the user by email
          const user = await User.findOne({ email })

          // Check if the user exists and the password is correct
          const compare = user
            ? await bcrypt.compare(password, user.password)
            : false

          if (!user || !compare) {
            // Handle invalid credentials
            return null
          }

          return user
        } else {
          // Handle validation errors
          console.error(validationResult.error.errors)
          return null
        }
      },
    }),

    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signOut: '/login',
  },

  callbacks: {
    // Handle Google OAuth sign-in
    async signIn({ account, profile }) {
      if (account?.type === 'oauth' && profile) {
        await dbConnect()

        // Check if the user already exists
        const user = await User.findOne({ email: profile?.email })
        if (!user) {
          // Create a new user if not found
          const newUser = new User({
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
            provider: account.provider,
            isSubscribe: account.isSubscribe,
          })
          await newUser.save()
        }
      }
      return true
    },

    // Map token user to session user
    async session({ session, token }) {
      session.user.role = token.role
      session.user.userId = token.userId
      session.user.provider = token.provider
      session.user.isSubscribe = token.isSubscribe
      return session
    },

    // Fetch user data from the database based on the email in the JWT token
    async jwt({ token }) {
      await dbConnect()
      const user = await User.findOne({ email: token.email }).select(
        '-password'
      )
      if (user) {
        token.role = user.role
        token.userId = user._id
        token.provider = user.provider
        token.isSubscribe = user.isSubscribe
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Initialize the nextAuth handler with the provided options
const handler = nextAuth(authOptions)
export { handler as GET, handler as POST }
