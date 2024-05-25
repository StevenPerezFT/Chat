import { z } from "zod";

const schemaSignIn = z.object({
    email: z.string().min(2, { message: 'Required' }).max(64, { message: "Your email shold be less than 64 characters" }),
    password: z.string().min(2, { message: 'Required' }).max(64, { message: "Your password shold be less than 64 characters" }),
});

export default schemaSignIn