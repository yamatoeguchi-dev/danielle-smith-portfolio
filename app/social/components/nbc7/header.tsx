import Image from "next/image"

type Props = {}

export default function Header({}: Props) {
  return (
    <div className="flex items-center justify-start">
      <Image
        src={'/logos/nbc.png'}
        alt="NBC Logo"
        width={100}
        height={100}
        style={{
          height: '1.5em', // Matches the line height of the text
          width: 'auto', // Maintains aspect ratio
        }}
      />
      <h1 className="text-3xl ml-2">NBC 7 San Diego</h1>
    </div>
  )
}