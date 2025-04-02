import React from 'react'
import { Outlet } from 'react-router-dom'
import './MainLayout.scss'

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
