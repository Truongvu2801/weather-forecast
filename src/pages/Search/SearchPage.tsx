import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/common/Button/Button'
import { useWeather } from '../../hooks/useWeather'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchItem from '../../components/features/SearchItem/SearchItem'
import { ReactComponent as BackIcon } from '../../assets/arrow-left-solid.svg'

import styles from './SearchPage.module.scss'

const SearchPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Extract the previously searched city from the location state if available
  const previousCity = location.state?.previousCity || ''

  const { weatherData, error, searchHistory, removeFromHistory, isLoading } =
    useWeather(searchTerm)

  const handleSearch = () => {
    const query = searchInputRef.current?.value
    if (query) {
      setSearchTerm(query)
    }
  }

  useEffect(() => {
    if (weatherData) {
      navigate(`/city/${encodeURIComponent(searchTerm)}`)
    }
  }, [weatherData, searchTerm, navigate])

  const handleDeleteHistory = (timestamp: number) => {
    removeFromHistory(timestamp)
  }

  const handleSearchCity = (city: string) => {
    setSearchTerm(city)
  }

  const handleBackClick = () => {
    if (searchTerm) {
      navigate(`/city/${encodeURIComponent(searchTerm)}`)
    } else if (previousCity) {
      navigate(`/city/${encodeURIComponent(previousCity)}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={styles['search-section']}>
      <div className={styles['header']}>
        <div className={styles['back-button']} onClick={handleBackClick}>
          <BackIcon />
        </div>
      </div>
      <div className={styles['search-input']}>
        <input type="text" ref={searchInputRef} placeholder="Search city..." />
        <Button onClick={() => handleSearch()} disabled={isLoading}>
          Search
        </Button>
      </div>
      {isLoading && <div className={styles['loading']}>Loading...</div>}
      {error && <div className={styles['error']}>Invalid country or city</div>}
      <div className={styles['search-history']}>
        <h3>Search History</h3>
        {searchHistory.map(item => (
          <SearchItem
            key={item.timestamp}
            item={item}
            onRemoveCity={() => handleDeleteHistory(item.timestamp)}
            onSearchCity={() => handleSearchCity(item.city)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
