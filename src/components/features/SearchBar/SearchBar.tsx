import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as LocationIcon } from '../../../assets/location-icon.svg'
import { ReactComponent as SearchIcon } from '../../../assets/search-icon.svg'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: Error | null | string
}

const SearchBar = ({ value, onChange, error = null }: SearchBarProps) => {
  const navigate = useNavigate()

  const handleSearchIconClick = () => {
    navigate('/search', {
      state: { previousCity: value }
    })
  }

  return (
    <div className={styles['search-section']}>
      <div className={styles['search-input']}>
        <LocationIcon className={styles['location-icon']} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search city..."
        />
        <SearchIcon
          className={styles['search-icon']}
          onClick={handleSearchIconClick}
        />
      </div>
      {error && <div className={styles['error']}>Invalid country or city</div>}
    </div>
  )
}

export default SearchBar
