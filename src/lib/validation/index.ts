import { z } from "zod"

export const SignUpValid = z.object({
    name: z.string().min(2, {message: "Too short"}),
    username: z.string().min(2, {message: "Too short"}).max(50, {message: "Too long"}),
    email: z.string().email(),
    password: z.string().min(8, {message:"the password must be atleast 8 characters"})
  })

  export const SignInValid = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message:"the password must be atleast 8 characters"})
  })