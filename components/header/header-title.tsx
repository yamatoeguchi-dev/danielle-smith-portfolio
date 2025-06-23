import React from 'react'

import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const HeaderTitle: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <h1 className={`text-4xl md:text-6xl ${instrumentSerif.className}`}>DANIELLE SMITH</h1>
      <span className={`text-sm md:text-lg text-gray-500`}>Social. Digital. Broadcast. All about media</span>
    </div>
  )
}
