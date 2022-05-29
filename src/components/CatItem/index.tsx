import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/app.context'
import { CatType } from '../../interfaces/cat.interface'

import styles from './CatItem.module.scss'

interface CarItemProps {
    url: string
    id: string
}

const CatItem: React.FC<CarItemProps> = ({ url, id }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { onAddToFavorite } = useContext(AppContext)

    useEffect(() => {
        //@ts-ignore
        const dataFromLS = JSON.parse(localStorage.getItem('cats'))

        dataFromLS.find((cat: CatType) => cat.id === id)
            ? setIsFavorite(true)
            : setIsFavorite(false)
    }, [id])

    return (
        <div className={styles.card}>
            <img src={url} alt='cat' className={styles.card__image} />

            <img
                src={isFavorite ? './heart-fill.svg' : './heart.svg'}
                alt='heart'
                className={styles.card__heart}
                onMouseOver={e =>
                    !isFavorite
                        ? (e.currentTarget.src = './heart-fill.svg')
                        : null
                }
                onMouseOut={e =>
                    !isFavorite ? (e.currentTarget.src = './heart.svg') : null
                }
                onClick={() => {
                    onAddToFavorite(id, url)
                    setIsFavorite(prevState => !prevState)
                }}
            />
        </div>
    )
}

export default CatItem
