'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schemaSignUp from "@chat/core/zod/schema.form.sign-up";
import { SchemaInputs } from "@chat/core/types/auth";
import { useRouter } from 'next/navigation';

export default function SignUpComponent() {
    const router = useRouter();

    const { handleSubmit, register, reset, formState: { errors }, } = useForm<SchemaInputs>({ resolver: zodResolver(schemaSignUp) });
    const submit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            <p>Password is not equal</p>
        }
        const { name, email, password } = data
        const response = await fetch(`http://localhost:4000/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            router.push(`/auth/sign-in`)
        }
        reset()
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="space-y-4 w-80" onSubmit={submit} >
                <label className="block w-full">
                    <input className="border border-chatBlack-700 p-2 w-full" type="text" placeholder="Your name" {...register('name')} />
                    {errors.name?.message && <p>{errors.name?.message}</p>}
                </label>
                <label className="block w-full">
                    <input className="border border-chatBlack-700 p-2 w-full" type="text" placeholder="Email" {...register('email')} />
                    {errors.email?.message && <p>{errors.email?.message}</p>}
                </label>
                <label className="block w-full">
                    <input className="border border-gray-300 p-2 w-full" type="text" placeholder="password" {...register('password')} />
                    {errors.password?.message && <p>{errors.password?.message}</p>}
                </label>
                <label className="block w-full">
                    <input className="border border-gray-300 p-2 w-full" type="text" placeholder="password" {...register('confirmPassword')} />
                    {errors.confirmPassword?.message && <p>{errors.confirmPassword?.message}</p>}
                </label>
                <aside className="flex justify-center w-full">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" type='submit'>Sign up</button>
                </aside>
            </form>
        </div>
    )
}
