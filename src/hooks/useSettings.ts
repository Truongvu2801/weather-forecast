import { useState, useEffect } from 'react'

interface AppSettings {
  temperatureUnit: 'C' | 'F'
  darkMode: boolean
  savedLocations: string[]
}

const defaultSettings: AppSettings = {
  temperatureUnit: 'C',
  darkMode: false,
  savedLocations: []
}

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('weatherAppSettings')
    return saved ? JSON.parse(saved) : defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return { settings, updateSettings }
}
