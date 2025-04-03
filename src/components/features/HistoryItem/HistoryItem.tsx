import React from 'react'
import { SearchHistoryItem } from '../../../types/weather'
import { ReactComponent as SearchIcon } from '../../../assets/search-icon.svg'
import { ReactComponent as TrashIcon } from '../../../assets/trash-solid.svg'

import styles from './HistoryItem.module.scss'

const HistoryItem = ({
  item,
  onRemoveCity,
  onSearchCity
}: {
  item: SearchHistoryItem
  onRemoveCity: () => void
  onSearchCity: () => void
}) => {
  return (
    <div className={styles['search-item']}>
      <div className={styles['search-item-detail']}>
        {item.city}, {item.country}
      </div>
      <div className={styles['search-action']}>
        <span onClick={onSearchCity} className={styles['action-button']}>
          <SearchIcon className={styles['search-icon']} />
        </span>
        <span onClick={onRemoveCity} className={styles['action-button']}>
          <TrashIcon className={styles['trash-icon']} />
        </span>
      </div>
    </div>
  )
}

export default HistoryItem
