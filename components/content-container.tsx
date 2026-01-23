import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function ContentContainer({children}: Props) {
  return (
    <div className="px-4 sm:px-6 lg:px-6 xl:px-36 max-w-7xl mx-auto">
      {children}
    </div>
  )
}