'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import RippleButton from '../buttons/RippleButton'

import { forgotPasswordWithCredentials } from '@/actions/authActions'
import { forgotPasswordSchema } from '@/lib/validations/schema'
import { IForgotPasswordSchema } from '@/types'
import { toast } from 'sonner'

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit: SubmitHandler<IForgotPasswordSchema> = async (data) => {
    const { email } = data

    try {
      const res = await forgotPasswordWithCredentials({ email })

      if (res.msg) toast.success(res.msg)
      else toast.error(`Error: ${res.error}`)
    } catch (err) {
      console.error('Registration error:', err)
      toast.error(
        'An error occurred during password changing Please try again.'
      )
    }
  }

  return (
    <div className="p-6 border shadow-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col   gap-y-2  w-[280px] lg:w-[320px]"
      >
        <div className="relative mt-3">
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="Email"
            className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
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

        <RippleButton
          text={'Envoyer'}
          buttonClasses={
            'w-full mt-10 text-xl rounded-md bg-primaryBlue text-white p-2 '
          }
          type="submit"
          isLoading={isSubmitting}
        />
      </form>
    </div>
  )
}

export default ForgotPasswordForm
