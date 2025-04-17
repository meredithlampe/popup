import { Section } from 'components/sections'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import type { ArtistPagePayload, PagePayload, SettingsPayload } from 'types'
import PageHead from '../page/PageHead'
import { Breadcrumbs } from 'components/shared/Breadcrumbs'

export interface ArtistPageProps {
  artistPage: ArtistPagePayload
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function ArtistPage({
  artistPage,
  settings,
  preview,
  loading,
}: ArtistPageProps) {
  const artist = artistPage
  // Default to an empty object to allow previews on non-existent documents
  const { sections, title } = artist || {}

  return (
    <>
      <PageHead
        page={artist}
        settings={settings}
        title={`${artist.firstName} ${artist.lastName} | Artist Profile & Art for Sale`}
      />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div className="custom-padding flex flex-col gap-y-[31px]">
            {/* Header */}
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: 'Artists',
                  href: '/artists',
                },
                {
                  label: `${artist.firstName} ${artist.lastName}`,
                  classes:
                    'font-bold overflow-hidden whitespace-nowrap text-ellipsis',
                },
              ]}
            />
            <h1>
              {artist.firstName} {artist.lastName}
            </h1>
          </div>

          {/* Sections */}
          {sections && sections.length > 0 && (
            <div className="flex flex-col">
              {sections.map((section, key) => (
                <Section index={key} section={section} settings={settings} />
              ))}
            </div>
          )}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
