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
  