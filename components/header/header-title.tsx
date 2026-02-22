import React from "react"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const HeaderTitle: React.FC = () => {
  return (
    <Link href="/about-me" className="group text-center">
      <div className="flex flex-col items-center gap-2">
        <h1
          className={[
            instrumentSerif.className,
            "tracking-[0.12em] uppercase",
            "text-3xl sm:text-4xl md:text-5xl",
            "text-gray-900",
          ].join(" ")}
        >
          Danielle Smith
        </h1>

        <span className="text-xs sm:text-sm text-gray-600 tracking-wide">
          Social • Digital • Broadcast • All about media
        </span>

        {/* subtle hover underline vibe */}
        <span className="h-px w-24 bg-transparent group-hover:bg-gray-300 transition-colors" />
      </div>
    </Link>
  )
}