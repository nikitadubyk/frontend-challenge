import React from 'react'
import { FavoritesType } from '../interfaces/favorites.interfase'

import CatList from '../components/CatList'

interface FavoritesProps {
    favoritesCat: FavoritesType[] | null
}

const Favorites: React.FC<FavoritesProps> = ({ favoritesCat }) => {
    return (
        <div className='container'>
            {favoritesCat?.length === 0 && (
                <p className='center'>Вы не добавили котиков в избранное</p>
            )}
            {favoritesCat && <CatList catsData={favoritesCat} />}
        </div>
    )
}

export default Favorites
