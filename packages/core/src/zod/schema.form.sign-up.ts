import * as z from 'zod';

const schemaSignUp = z.object({
    name: z.string().min(2, { message: 'Required' }).max(64, { message: "Your name shold be less than 64 characters" }),
    email: z.string().min(2, { message: 'Required' }).max(64, { message: "Your email shold be less than 64 characters" }),
    password: z.string().min(2, { message: 'Required' }).max(64, { message: "Your password shold be less than 64 characters" }),
    confirmPassword: z.string().min(2, { message: 'Required' }).max(64, { message: "Your confirm password shold be less than 64 characters" })
});

export default schemaSignUp
