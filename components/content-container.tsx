import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function ContentContainer({children}: Props) {
  return (
    <div className="px-6 sm:px-16 lg:px-36 max-w-350 mx-auto">
      {children}
    </div>
  )
}