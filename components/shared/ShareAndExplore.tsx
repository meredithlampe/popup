import { EditorialType, ProductType, SettingsPayload, Topic } from 'types'
import { ShareButtonPane } from './ShareButtonPane'
import Link from 'next/link'

export function ShareAndExplore({
  settings,
  typesAndTopics,
  documentType = 'editorial', // determines whether clicking on a topic takes you to "discover" for that topic or "all artwork" for that topic
}: {
  settings: SettingsPayload
  typesAndTopics: Array<ProductType | EditorialType | Topic>
  documentType: string
}) {
  return (
    <div className="bg-black custom-grid text-white gap-x-[8px] xl:gap-x-[10px] p-[35px] xl:py-[82px] xl:px-[32px] gap-y-[63px]">
      <div className="col-start-1 xl:col-start-2 col-span-8 xl:col-span-4">
        <ShareButtonPane shareLinks={settings?.productPageShareLinks} />
      </div>
      {typesAndTopics && typesAndTopics.length > 0 && (
        <div className="col-start-1 xl:col-start-[14] col-span-8 xl:col-span-10 flex flex-col gap-y-[29px]">
          <span className="font-bold">Explore More Like This</span>
          <div className="flex gap-[20px] xl:gap-[10px] flex-wrap">
            {typesAndTopics.map((typeOrTopic, key) => {
              let href = ''
              switch (typeOrTopic?._type) {
                case 'productType':
                  href = `/art?type=${typeOrTopic.slug}`
                  break
                case 'editorialType':
                  href = `/discover?type=${typeOrTopic.slug}`
                  break
                case 'topic':
                  switch (documentType) {
                    case 'product':
                      href = `/art?topic=${typeOrTopic.slug}`
                      break
                    default:
                      href = `/discover?topic=${typeOrTopic.slug}`
                      break
                  }
              }
              return (
                <Link
                  href={href}
                  key={key}
                  className="cursor-pointer button-gray whitespace-nowrap no-hover-fade"
                >
                  {typeOrTopic?.title}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
