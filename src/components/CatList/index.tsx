import React from 'react'
import { CatType } from '../../interfaces/cat.interface'
import { FavoritesType } from '../../interfaces/favorites.interfase'

import CatItem from '../CatItem'

import './CatList.scss'

interface CatListProps {
    catsData: CatType[] | FavoritesType[] | null
}

const CatList: React.FC<CatListProps> = ({ catsData }) => {
    return (
        <div className='cat__wrapper'>
            {catsData &&
                catsData.map(cat => (
                    <CatItem url={cat.url} key={cat.id} id={cat.id} />
                ))}
        </div>
    )
}

export default CatList
