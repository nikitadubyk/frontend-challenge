import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const request = useCallback(async (url: string, headers: any) => {
        setLoading(true)

        try {
            const response = await fetch(url, {
                headers,
            })

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                )
            }

            const data = await response.json()

            setLoading(false)
            return data
        } catch (error: unknown) {
            setLoading(false)
            if (error instanceof Error) {
                setError(error.message)
            }
            throw error
        }
    }, [])

    return { loading, error, request }
}
