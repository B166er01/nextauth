'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import RippleButton from '../buttons/RippleButton'

const Navbar =  () => {
    const { data: session } = useSession()
  return (
      <header className='w-full h-24 flex justify-end items-center p-6'>
              {/* Right side */}
              <div className="flex gap-3">
            <Link href="/subscribe">
              <RippleButton
                text="S'abonner"
                buttonClasses="rounded-lg text-white py-[2px] px-3 border border-primaryBlue bg-primaryBlue lg:text-lg"
              />
            </Link>
            {session?.user ? (
              <Link href={`/profile/${session.user.userId}`}>
                <RippleButton
                  text="Profile"
                  buttonClasses="rounded-lg py-1 border border-primaryBlue py-[2px] px-3 bg-white text-primaryBlue lg:text-lg"
                />
              </Link>
            ) : (
              <Link href="/login">
                <RippleButton
                  text="Connexion"
                  buttonClasses="rounded-lg py-1 border border-primaryBlue py-[2px] px-3 bg-white text-primaryBlue lg:text-lg"
                />
              </Link>
            )}
          </div>
    </header>
  )
}

export default Navbar