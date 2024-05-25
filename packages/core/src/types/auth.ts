import schemaSignIn from "../zod/schema.form.sign-in"
import schemaSignUp from "../zod/schema.form.sign-up"

export type SchemaInputs = Zod.infer<typeof schemaSignUp>;
export type SchemaSignIn = Zod.infer<typeof schemaSignIn>

