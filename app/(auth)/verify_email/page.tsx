'use client'

import { verifyEmail } from '@/actions/authActions'
import RippleButton from '@/components/buttons/RippleButton'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Hourglass } from 'react-loader-spinner'

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const [verificationStatus, setVerificationStatus] = useState('verifying')
  //const { push } = useRouter()
  const token = searchParams?.token


  useEffect(() => {
    console.log("first")
    const verifyEmailAsync = async () => {
   
        // try {
        //   const res = await verifyEmail(token)

        //   console.log({res: res})
        //   // If registration is successful, redirect to login page
        //   if (res.msg === 'Verification success') {
        //     setVerificationStatus('success')
        //   }

        //   else setVerificationStatus('error')
        // } catch (error) {
        //   setVerificationStatus('error')

        //   console.error('Error verifying email:', error)
        //   setVerificationStatus('error')
        // }
    }

    verifyEmailAsync()
  },[] )

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
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex items-center gap-2">
            <Check size={24} color="green" />
            <p>
              Your registration is successful. You will be redirected to the
              login page shortly.
            </p>
          </div>
          <Link href={'/'}>
            <RippleButton
              text="Accueil"
              buttonClasses="rounded text-white py-1 border border-primaryBlue px-3 bg-primaryBlue"
            />
          </Link>
        </div>
      ) : verificationStatus === 'error' ? (
        <div className="flex items-center gap-2">
          <X size={24} color="red" />
          <p>Registration failed. Please try again or contact support.</p>
        </div>
      ) : null}
    </div>
  )
}

export default VerifyPage

