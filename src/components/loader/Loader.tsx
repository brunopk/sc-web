import React from 'react'
import './Loader.css'

type LoaderProps = {
  className ?: string
  size?: number
}

function Loader({ size, className }: LoaderProps) {
  size = typeof size === 'undefined' ? 18 : size
  className = `loader ' ${className || ''}`
  return (
    <div className={className} style={{ width: size, height: size }} />
  )
}

export default Loader
