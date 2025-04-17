import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import PreviewNavbar from 'components/global/PreviewNavbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import { useEffect, useState } from 'react'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  siteTitle: '',
  menuItems: [],
  footer: [],
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
  loading?: boolean
}

export default function Layout({
  children,
  settings = fallbackSettings,
  preview,
  loading,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div
      className={`flex flex-col bg-white text-black ${
        mobileMenuOpen ? ' h-[100vh] overflow-hidden' : ''
      }`}
    >
      {preview && <PreviewBanner loading={loading} />}
      {/* {preview ? (
        <PreviewNavbar settings={settings} />
      ) : ( */}
      <Navbar
        menuItems={settings?.menuItems}
        logo={settings.logo}
        settings={settings}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={(open) => {
          setMobileMenuOpen(open)
        }}
      />
      {/* )} */}
      <div className="flex-grow min-h-[100vh]">{children}</div>
      <Footer
        image={settings?.logoFooter}
        menus={settings?.menusFooter}
        pressSubmenu={settings?.pressSubmenu}
        emailSubscribeSettings={settings?.emailSubscribeSettings}
      />
    </div>
  )
}
