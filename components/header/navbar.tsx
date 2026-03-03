"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "../ui/separator"

type NavbarProps = {
  variant: "mobile" | "desktop"
}

const NAV_ITEMS = [
  { href: "/digital", label: "Digital Writing" },
  { href: "/hosting", label: "Hosting" },
  { href: "/producing", label: "Producing" },
]

export const Navbar: React.FC<NavbarProps> = ({ variant }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  /* =========================
     DESKTOP NAV
  ========================== */
  if (variant === "desktop") {
    return (
      <nav aria-label="Primary" className="w-full">
        <ul className="flex items-center justify-center gap-10">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href)

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={[
                    "text-sm tracking-widest uppercase transition-colors duration-200",
                    active
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900",
                  ].join(" ")}
                >
                  {item.label}
                </Link>

                {/* Sleek animated underline */}
                <span
                  className={[
                    "absolute left-0 -bottom-2 h-[2px] bg-gray-900 transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  ].join(" ")}
                />
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  /* =========================
     MOBILE NAV
  ========================== */
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTitle className="hidden">Menu</SheetTitle>

        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="h-10 w-10 rounded-full hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-900" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72 px-6 py-8">
          <div className="flex h-full flex-col">
            <div className="pt-2">
              <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                My Work
              </div>
              <Separator className="my-4" />
            </div>

            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "rounded-md px-3 py-2 text-base transition-all duration-200",
                      active
                        ? "bg-gray-900 text-white"
                        : "text-gray-900 hover:bg-gray-100",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto pb-6">
              <Separator className="my-4" />
              <Link
                href="/about-me"
                onClick={() => setOpen(false)}
                className={[
                  "text-sm transition-colors",
                  pathname === "/about-me"
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900",
                ].join(" ")}
              >
                About
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}