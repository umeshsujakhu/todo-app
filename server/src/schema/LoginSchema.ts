import { TypeOf, object, string } from 'zod';

export const registerSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email({ message: 'Please enter a valid email address.' }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email({ message: 'Please enter a valid email address.' }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type LoginSchema = TypeOf<typeof loginSchema>;
export type RegisterSchema = TypeOf<typeof registerSchema>;