'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const root = window.document.documentElement
    if (stored === 'dark') {
      root.classList.add('dark')
      setTheme('dark')
    } else {
      root.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const isDark = root.classList.contains('dark')
  
    console.log('[ThemeToggle] Currently:', isDark ? 'dark' : 'light')
  
    if (isDark) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
      console.log('[ThemeToggle] Switched to light mode')
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
      console.log('[ThemeToggle] Switched to dark mode')
    }
  }
  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
