import { Url } from "@chat/core/enums/url"
import { Route } from "@chat/core/routes/frontend"

export const createUser = async (token: string) => {
    const response = await fetch(`${Url.LocalHostBackend}/${Route.User}/me`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Something is wrong with the token credentials')
    }
}
