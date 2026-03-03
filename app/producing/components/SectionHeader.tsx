interface SectionHeaderProps {
  title: string
  description?: string
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="mt-3 font-serif text-xl md:text-2xl xl:text-3xl leading-tight text-neutral-900">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-3 border-t border-border" />
    </div>
  )
}
