import React from "react"

import { Navbar } from "@/components/header/navbar"
import { HeaderTitle } from "./header-title"
import { Separator } from "../ui/separator"

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Masthead row */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center py-6">          <div className="flex justify-start">
            <div className="h-10 w-10 md:hidden" aria-hidden="true" />
            <div className="hidden md:block text-xs text-gray-500">
              {/* Optional: date / location / tagline */}
            </div>
          </div>

          {/* Center title (always in column 2) */}
          <div className="flex justify-center">
            <HeaderTitle />
          </div>

          {/* Right: mobile hamburger only */}
          <div className="flex justify-end">
            <Navbar variant="mobile" />
          </div>
        </div>

        {/* Desktop nav row (only once) */}
        <div className="hidden md:block pb-4">
          <Separator className="mb-4" />
          <div className="flex justify-center">
            <Navbar variant="desktop" />
          </div>
        </div>
      </div>
    </header>
  )
}