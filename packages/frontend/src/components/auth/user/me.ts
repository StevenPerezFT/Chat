
export const createUser = async (token: string) => {
    const response = await fetch(`http://localhost:4000/user/me`, {
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
