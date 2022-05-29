import React from 'react'

interface AppContextType {
    onAddToFavorite: (id: string, url: string) => void
}

const AppContext = React.createContext<AppContextType>({
    onAddToFavorite: () => {},
})

export default AppContext
