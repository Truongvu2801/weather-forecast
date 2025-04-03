import React from 'react'

import styles from './Skeleton.module.scss'

const Skeleton = () => {
  return (
    <div className={styles['weather-skeleton']}>
      <div className={styles['skeleton-card']}></div>
      <div className={styles['skeleton-forecasts']}>
        {[1, 2, 3, 4, 5].map(item => (
          <div key={item} className={styles['skeleton-item']}></div>
        ))}
      </div>
    </div>
  )
}

export default Skeleton
