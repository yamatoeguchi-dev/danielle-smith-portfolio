import FeaturedProjectBlock, { type FeaturedProject } from "./components/FeaturedProjectBlock"
import SectionHeader from "./components/SectionHeader"
import SocialEmbedGrid from "./components/SocialEmbedGrid"

const streamingSpecials: FeaturedProject[] = [
  {
    title: "Annenberg TV News Election Night Live Special",
    role: "Executive Producer",
    organization: "Annenberg Media, USC",
    description:
      "Led a 1.5-hour live-streamed election night special, managing all aspects of production from schedule to on-air execution.",
    impacts: [
      "Managed a 65-person team across studio and field crews",
      "Organized full production schedule and assigned tasks across departments",
      "Booked and coordinated live guests for real-time interviews",
    ],
    award: "Best TV Reporting, Podcast or Stream — Los Angeles Press Clubs",
    media: {
      url: "https://youtu.be/Z2x5YI21hLw",
      title: "Annenberg TV News Election Night Live Special",
    },
  },
  {
    title: "NBC San Diego Clear the Shelters Streaming Special",
    role: "Producer",
    organization: "NBC 7 San Diego",
    description:
      "Produced the first local Clear the Shelters streaming special, spotlighting animal-related stories across San Diego.",
    impacts: [
      "First local Clear the Shelters streaming special for NBC San Diego",
      "Produced an original package on a cat cafe and wine bar",
      "Coordinated an in-studio interview with a local animal shelter to promote the annual campaign",
      "Spotlighted compelling animal-related stories throughout the region",
    ],
    media: {
      url: "https://youtu.be/tPtH-DBANhI",
      title: "NBC San Diego Clear the Shelters Streaming Special",
    },
  },
]

const socialPosts: { platform: "tiktok" | "instagram"; url: string }[] = [
  { platform: "tiktok", url: "https://www.tiktok.com/@nbcsandiego/video/7465404186377801006?embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C122122240%2C121351166%2C121811500%2C121960941%2C122122244%2C122122243%2C122122242%2C121487028%2C121679410%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_share&refer=embed&referer_url=rdaniellesmith.wordpress.com%2Fproducing%2F&referer_video_id=7465404186377801006" },
  { platform: "tiktok", url: "https://www.tiktok.com/@nbcsandiego/video/7572772442721062199?referer_url=rdaniellesmith.wordpress.com%2Fproducing%2F&refer=embed&embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C122122240%2C121351166%2C121811500%2C121960941%2C122122244%2C122122243%2C122122242%2C121487028%2C121679410%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_blank&referer_video_id=7572772442721062199" },
  { platform: "tiktok", url: "https://www.tiktok.com/@nbcsandiego/video/7374595415695461674?referer_url=rdaniellesmith.wordpress.com%2Fproducing%2F&refer=embed&embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C122122240%2C121351166%2C121811500%2C121960941%2C122122244%2C122122243%2C122122242%2C121487028%2C121679410%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_blank&referer_video_id=7374595415695461674" },
  { platform: "tiktok", url: "https://www.tiktok.com/@nbcsandiego/video/7436919495970589995?referer_url=rdaniellesmith.wordpress.com%2Fproducing%2F&refer=embed&embed_source=121374463%2C121468991%2C121439635%2C121749182%2C121433650%2C121404359%2C121497414%2C122122240%2C121351166%2C121811500%2C121960941%2C122122244%2C122122243%2C122122242%2C121487028%2C121679410%2C121331973%2C120811592%2C120810756%2C121885509%3Bnull%3Bembed_blank&referer_video_id=7436919495970589995" },
  { platform: "instagram", url: "https://www.instagram.com/reel/DNejmbON5Q6/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==" },
  { platform: "instagram", url: "https://www.instagram.com/reel/C1ABQDNuN4W/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==" },
]

const diyProjects: FeaturedProject[] = [
  {
    title: "My Brother's Kitchen — Twinspire",
    role: "Producer, Videographer & Editor",
    organization: "USC Capstone Project",
    description:
      "A monthly culinary cooking class for young people across Los Angeles, documented through a natural sound package.",
    impacts: [
      "Produced, shot, and edited a complete natural sound package",
      "Captured the energy of hands-on cooking classes for young Angelenos",
      "Delivered as USC capstone project showcasing end-to-end production skills",
    ],
    mediaPlaceholderLabel: "Twinspire Package",
    media: {
      url: "https://youtu.be/Q_Vd3bTas-k",
      title: "My Brother’s Kitchen: Teaching young people in L.A. how to cook",
    },
  },
  {
    title: "Choctaw Language Preservation Story",
    role: "Producer & Videographer",
    organization: "USC Class Project",
    description:
      "A social media video exploring language preservation efforts within the Choctaw Nation of Oklahoma — the third largest tribe in the U.S., with fewer than 10,000 fluent speakers remaining.",
    impacts: [
      "Interviewed Jacqueline Brixey on Choctaw language revitalization efforts",
      "Produced a social media video highlighting cultural preservation",
      "Explored the challenges facing one of the largest tribal nations in the U.S.",
    ],
    mediaPlaceholderLabel: "Choctaw Language Story",
    media: {
      url: "https://vimeo.com/639813089?fl=pl&fe=sh",
      title: "Computer Scientist Develops Chatbot to Preserve Choctaw Language",
    },
  },
]

export default function ProducingPage() {
  return (
    <main className="mx-auto w-full max-w-7xl py-8">
      <div className="space-y-16">
        <section>
          <SectionHeader
            title="Streaming Specials"
          />
          {streamingSpecials.map((project) => (
            <FeaturedProjectBlock key={project.title} {...project} />
          ))}
        </section>

        <section>
          <SectionHeader
            title="Social Media"
          />
          <SocialEmbedGrid posts={socialPosts} />
        </section>

        <section>
          <SectionHeader
            title="DIY Projects"
          />
          {diyProjects.map((project) => (
            <FeaturedProjectBlock key={project.title} {...project} />
          ))}
        </section>
      </div>
    </main>
  )
}