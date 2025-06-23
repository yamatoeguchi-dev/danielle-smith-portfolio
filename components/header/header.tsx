import React from 'react'

import { Navbar } from "@/components/header/navbar";
import { HeaderTitle } from './header-title';
import { Separator } from '../ui/separator';

export const Header: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <HeaderTitle />
      <Navbar />
      <Separator />
    </div>
  )
}
