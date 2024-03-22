'use client'

import { Chrome } from 'lucide-react'
import { signIn } from 'next-auth/react'
import RippleButton from './RippleButton'

const GoogleButton = () => {
  return (
    <RippleButton
      buttonClasses="flex items-center justify-center w-56 gap-5 text-lg rounded-md bg-primaryBlue p-2 text-white w-full"
      text="Google Connection"
      icon={<Chrome size={34} />}
      onClick={() => signIn('google', { callbackUrl: '/' })}
    />
  )
}

export default GoogleButton
