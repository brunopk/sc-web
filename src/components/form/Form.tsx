import React from 'react'

export default function Form({ id, children, className }) {
  className = `w-100 h-100 ${className || ''}`
  return (
    <form id={id} className={className}>
      {children}
    </form>
  )
}
