import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useHttp } from './hooks/http.hook'
import { CatType } from './interfaces/cat.interface'
import { FavoritesType } from './interfaces/favorites.interfase'
import AppContext from './context/app.context'

import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

const App: React.FC = () => {
    const [data, setData] = useState<CatType[] | null>(null)
    const [favoritesCat, setFavoritesCat] = useState<FavoritesType[]>([])
    const { loading, error, request } = useHttp()

    useEffect(() => {
        //@ts-ignore
        const data = JSON.parse(localStorage.getItem('cats'))
        !data && localStorage.setItem('cats', JSON.stringify([]))
        setFavoritesCat(data)

        async function fetchCats() {
            const catsData = await request(
                'https://api.thecatapi.com/v1/images/search?limit=15',
                {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                }
            )

            setData(catsData)
        }

        fetchCats()
    }, [request])

    const onAddToFavorite = useCallback((id: string, url: string) => {
        const obj = {
            id,
            url,
        }

        //@ts-ignore
        const dataFromLS = JSON.parse(localStorage.getItem('cats'))

        if (dataFromLS && dataFromLS.find((cat: CatType) => cat.id === id)) {
            const filteredData = dataFromLS.filter(
                (cat: CatType) => cat.id !== id
            )
            localStorage.setItem('cats', JSON.stringify(filteredData))
            setFavoritesCat(filteredData)
        } else {
            if (dataFromLS) {
                localStorage.setItem(
                    'cats',
                    JSON.stringify([...dataFromLS, obj])
                )
                setFavoritesCat([...dataFromLS, obj])
            } else {
                localStorage.setItem('cats', JSON.stringify([obj]))
                setFavoritesCat([obj])
            }
        }
    }, [])

    return (
        <AppContext.Provider value={{ onAddToFavorite }}>
            <Header />
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Home loading={loading} error={error} data={data} />
                        }
                    />
                    <Route
                        path='/favorites'
                        element={<Favorites favoritesCat={favoritesCat} />}
                    />
                </Routes>
            </main>
        </AppContext.Provider>
    )
}

export default App
