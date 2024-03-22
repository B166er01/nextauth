import RegisterForm from '@/components/forms/RegisterForm'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen pt-20 justify-center">
      <h1 className="mb-4 text-2xl lg:text-3xl">S&apos;enregister</h1>

      <RegisterForm />

      <Link href="/login" className="mt-9 group">
        Dejas un compte ?{' '}
        <span className="group-hover:underline">SE CONNECTER</span>
      </Link>
    </div>
  )
}

export default RegisterPage
