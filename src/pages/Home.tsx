import React from 'react'

import CatList from '../components/CatList'
import { CatType } from '../interfaces/cat.interface'

interface HomeProps {
    data: CatType[] | null
    loading?: boolean
    error?: string | null
}

const Home: React.FC<HomeProps> = ({ loading, error, data }) => {
    return (
        <div className='container'>
            {error && (
                <p className='center'>Произошла котоошибка, попробуйте еще</p>
            )}
            {loading && <p className='center'>идет загрузка котиков...</p>}
            <CatList catsData={data} />
        </div>
    )
}

export default Home