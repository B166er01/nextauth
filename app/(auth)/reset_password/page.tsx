'use client'

import { verifyTokenPassword } from '@/actions/authActions'
import RippleButton from '@/components/buttons/RippleButton'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Hourglass } from 'react-loader-spinner'

const ResetPasswordPage = ({
  searchParams,
}: {
  searchParams: { token: string }
}) => {
  const [verificationStatus, setVerificationStatus] = useState('verifying')
  const [userId, setUserId] = useState('')
  const token = searchParams?.token

  useEffect(() => {
    const verifyEmailAsync = async () => {
      if (token) {
        const res = await verifyTokenPassword(token)
        if (res.msg) {
          setUserId(res.msg)
          setVerificationStatus('success')
        } else setVerificationStatus('error')
      } else {
        console.error('Token not found in search params')
        setVerificationStatus('error')
      }
    }

    verifyEmailAsync()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {verificationStatus === 'verifying' ? (
        <div className="">
          <Hourglass
            visible={true}
            height="100"
            width="100"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass="mx-auto"
            colors={['#172554', '#72a1ed']}
          />
          <p className="pt-12 text-2xl">Verification...</p>
        </div>
      ) : verificationStatus === 'success' ? (
        <div>
          <ResetPasswordForm userId={userId} />
        </div>
      ) : verificationStatus === 'error' ? (
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex items-center gap-2">
            <X size={24} color="red" />
            <p>Registration failed. Please try again or contact support.</p>
          </div>
          <Link href={'/'}>
            <RippleButton
              text="Accueil"
              buttonClasses="rounded text-white py-1 border border-primaryBlue px-3 bg-primaryBlue"
            />
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default ResetPasswordPage
