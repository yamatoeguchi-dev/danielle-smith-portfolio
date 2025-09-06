import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function ContentContainer({children}: Props) {
  return (
    <div className="px-4 md:px-8 lg:px-16 max-w-5xl mx-auto my-8 md:my-16 {">{
        children
    }</div>
  )
}