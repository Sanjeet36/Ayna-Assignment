import React from 'react'

interface DayProps {
  date:  string
}

export default function Day({ date }: DayProps) {
  return (
    <div  className='text-[#506A86] bg-[#E3FEFF] px-2 rounded-sm text-sm md:text-base'>{date}</div>
  )
}
