import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pt-20">
      <h1 className="mb-4 text-2xl lg:text-3xl">Se connecter</h1>
      <LoginForm />
      <Link href="/register" className="mt-9 group">
        Pas de compte ?{' '}
        <span className="group-hover:underline">S&apos;ENREGISTRER</span>
      </Link>
    </div>
  )
}

export default LoginPage
