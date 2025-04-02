import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout: React.FC = () => {
  return (
    <div className={styles['main-layout']}>
      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
