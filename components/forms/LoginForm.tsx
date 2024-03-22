'use client'

import { loginSchema } from '@/lib/validations/schema'
import { ILoginSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import GoogleButton from '../buttons/GoogleButton'
import RippleButton from '../buttons/RippleButton'

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<ILoginSchema> = async (data) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (res?.ok) {
        toast.success('Login success')
        window.location.pathname = '/' // ??
      } else {
        console.error(res?.error)
        toast.error('Credentials do not match!')
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className="p-6 border shadow-xl w-[280px] lg:w-[320px] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-y-2  w-full "
      >
        <div className="relative mt-3">
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="Email"
            className="relative  z-10 w-full p-2 bg-transparent border-2 text-lg rounded outline-none peer placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
          />
          <label
            htmlFor="email"
            className="absolute z-20 px-1 text-sm capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
          >
            Email
          </label>
          <p className="w-full h-5 pt-1 text-primaryRed">
            {errors.email?.message}
          </p>
        </div>

        <div className="relative mt-3">
          <input
            {...register('password')}
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="relative  z-10 w-full p-2 bg-transparent border-2 text-lg  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
          />
          <label
            htmlFor="password"
            className="absolute z-20 px-1 text-sm capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
          >
            Mot de passe
          </label>
          <Eye
            className="absolute w-4 h-4 top-3.5 right-3 hover:cursor-pointer z-10"
            onMouseDown={(e) => {
              e.preventDefault()
              setIsPasswordVisible((prevState) => !prevState)
            }}
          />
          <p className="w-full h-5 pt-1 text-primaryRed">
            {errors.password?.message}
          </p>
        </div>

        <RippleButton
          text={'Connection'}
          buttonClasses={
            'w-full mt-10 text-xl rounded-md bg-primaryBlue text-white p-2 '
          }
          type="submit"
          isLoading={isSubmitting}
        />
      </form>
      <div className="w-full mt-3 text-center">
        <Link href="/forgot_password" className="hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>
      <p className="my-4 text-xl text-center">ou</p>
      <GoogleButton />
    </div>
  )
}

export default LoginForm
