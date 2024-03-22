import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1 className='mb-6 text-4xl'>Mot de passe oublié</h1>
      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPasswordPage