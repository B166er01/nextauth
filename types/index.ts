import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
  } from '@/lib/validations/schema'
  import { MouseEvent, ReactNode } from 'react'
  import { z } from 'zod'
  
  // based on Zod schema
  export type IRegisterSchema = z.infer<typeof registerSchema>
  export type ILoginSchema = z.infer<typeof loginSchema>
  export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
  export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>
  

  // Ripple button
export interface IRippleButtonProps {
  text: string
  buttonClasses?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  icon?: ReactNode
  isLoading?: boolean
}
export interface IRipple {
  x: number
  y: number
  size: number
  id: number
}
