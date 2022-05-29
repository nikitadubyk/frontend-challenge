import React from 'react'
import { CatType } from '../../interfaces/cat.interface'

import CatItem from '../CatItem'

import './CatList.scss'

interface CatListProps {
    catsData: CatType[] | null
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
