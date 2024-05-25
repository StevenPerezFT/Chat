'use client'
import schemaSignIn from "@chat/core/zod/schema.form.sign-in";
import { SchemaSignIn } from "@chat/core/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { createUser } from "../user/me";
import { Url } from "@chat/core/enums/url"
import { Route } from "@chat/core/routes/frontend"

export default function SignInComponent() {
    const router = useRouter();
    const { handleSubmit, register, reset, formState: { errors }, } = useForm<SchemaSignIn>({ resolver: zodResolver(schemaSignIn) });
    const submit = handleSubmit(async (data) => {
        const response = await fetch(`${Url.LocalHostBackend}/${Route.Auth}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })

        if (response.ok) {
            const responseData = await response.json()
            const token = responseData.access_token

            if (token) {
                document.cookie = `Authorization=${token}; path=/; max-age=36000;`; /**3600 means one hour */
                await createUser(token)
                router.push(`/${Route.Chat}`)
            }
        }
        reset()
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="space-y-4 w-80" onSubmit={submit} >
                <label className="block w-full">
                    <input className="border border-chatBlack-700 p-2 w-full" type="text" placeholder="Email" {...register('email')} />
                    {errors.email?.message && <p>{errors.email?.message}</p>}
                </label>
                <label className="block w-full">
                    <input className="border border-gray-300 p-2 w-full" type="text" placeholder="password" {...register('password')} />
                    {errors.password?.message && <p>{errors.password?.message}</p>}
                </label>
                <aside className="flex justify-center w-full">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" type='submit'>Sign in</button>
                </aside>
            </form>
        </div>
    )
}
