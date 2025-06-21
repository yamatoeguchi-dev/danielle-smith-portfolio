import React from 'react'

export const NavBar: React.FC = () => {
  return (
    <div className='w-full mt-3 sm:px-20 lg:px-30 xl:px-40'>
      <ul className='w-full flex flex-row justify-start items-start gap-10'>
        <li>Social Media</li>
        <li>Digital Writing</li>
        <li>Project Leadership</li>
      </ul>
    </div>
  )
}
