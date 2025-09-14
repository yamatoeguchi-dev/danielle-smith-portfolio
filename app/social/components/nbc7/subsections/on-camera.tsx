import ArticleCarousel from "@/components/article-carousel"
import { Separator } from "@/components/ui/separator"
import { SOCIAL_MEDIA_ARTICLES } from "@/data/articles"


type Props = {}

export default function OnCamera({}: Props) {
  return (
    <div className="flex flex-col px-6">
      <div className="my-4">
        <h1 className="text-2xl font-bold">On Camera! 🎥</h1>
      </div>
      <ArticleCarousel articles={SOCIAL_MEDIA_ARTICLES}/>
      <Separator className='my-10'/>
    </div>
  )
}