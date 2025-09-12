import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function ContentContainer({children}: Props) {
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto my-8">
      {children}
    </div>
  )
}