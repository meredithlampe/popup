import Image from 'components/Image'
import { Section } from 'components/sections'
import { Breadcrumbs } from 'components/shared/Breadcrumbs'
import Layout from 'components/shared/Layout'
import { EditorialPayload, SettingsPayload } from 'types'

import PageHead from '../page/PageHead'
import { CustomPortableText } from 'components/shared/CustomPortableText'

export interface EditorialPageProps {
  editorial: EditorialPayload
  settings: SettingsPayload
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function EditorialPage({
  editorial,
  settings,
  preview,
  loading,
}: EditorialPageProps) {
  return (
    <>
      <PageHead page={editorial} settings={settings} title={editorial.title} />
      <Layout settings={settings} preview={preview} loading={loading}>
        {/* overall section stack */}
        <div className="flex flex-col">
          {/* top white editorial header */}
          <div className="flex flex-col gap-y-[31px] custom-padding">
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: 'Exhibitions & Stories',
                  href: '/exhibitions-and-stories',
                },
                {
                  label: editorial.title,
                  classes:
                    'font-bold overflow-hidden whitespace-nowrap text-ellipsis',
                },
              ]}
            />
            <Image
              src={editorial.featuredImage}
              alt={editorial.featuredImage?.alt}
              objectFit="contain"
            />
            <div className="custom-grid custom-gap gap-y-[10px]">
              <h5 className="col-span-8 xl:col-span-24">
                {editorial.type?.title}
              </h5>
              <div className="col-span-8 xl:col-span-12">
                <h1 className="h3">{editorial.title}</h1>
              </div>
            </div>
            <div>
              <CustomPortableText value={editorial.metadata?.content} />
            </div>
            {/* <div className="flex flex-col gap-y-[10px]">
              <div className="small-text">Writing by</div>
              <div className="flex flex-col leading-[20px]">
                <h5 className="font-bold">
                  {editorial.creatorFirstName} {editorial.creatorLastName}
                </h5>
                <h5>{editorial.creatorTitle && editorial.creatorTitle}</h5>
              </div>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <div className="small-text">Published on</div>
              <h5 className="leading-[20px]">
                {new Date(editorial.creationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h5>
            </div> */}
          </div>
          {editorial.sections &&
            editorial.sections.length > 0 &&
            editorial.sections.map((section, key) => (
              <Section
                key={key}
                index={key}
                section={section}
                settings={settings}
              />
            ))}
        </div>
      </Layout>
    </>
  )
}
