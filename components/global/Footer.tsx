import Image from 'components/Image'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { getHrefForLink } from 'lib/next.helpers'
import Link from 'next/link'
import React from 'react'
import {
  CustomImage,
  EmailSubscribeSettings,
  ImageSubmenu,
  Submenu,
} from 'types'
import { EmailSubscribeComponent } from './EmailSubscribeComponent'
import { FooterMenu } from './FooterMenu'
import { FooterTitle } from './FooterTitle'

interface FooterProps {
  image: CustomImage | undefined
  menus: Array<Submenu>
  pressSubmenu: ImageSubmenu
  emailSubscribeSettings: EmailSubscribeSettings
}

export function Footer({
  image,
  menus,
  pressSubmenu,
  emailSubscribeSettings,
}: FooterProps) {
  return (
    <footer className="w-full bg-lightestGray pt-[36px] px-[32px]">
      <div className="custom-grid gap-y-[50px]">
        <div className="col-span-8 xl:col-span-4">
          {menus && menus[0] && <FooterMenu menu={menus[0]} />}
        </div>
        <div className="col-span-8 xl:col-span-6 xl:col-start-12 xl:col-end-17">
          {menus && menus[1] && <FooterMenu menu={menus[1]} />}
        </div>
        <div className="col-span-8 xl:col-span-6 xl:col-start-18 xl:col-end-24">
          {menus && menus[2] && <FooterMenu menu={menus[2]} />}
        </div>
        <div className="col-span-8 xl:col-span-4">
          {pressSubmenu && (
            <>
              <FooterTitle>{pressSubmenu.title}</FooterTitle>
              <div className="flex flex-col gap-y-[18px]">
                {pressSubmenu.imageLinks.items.map((item, key) => (
                  <Link
                    key={key}
                    href={getHrefForLink(item.link)}
                    className="w-fit xl:hover:opacity-[.5]"
                  >
                    <div className="h-[25px]">
                      <Image
                        src={item.image}
                        alt={item.image?.alt}
                        height={25}
                        objectFit="contain"
                        objectPosition="left"
                        className="w-fit"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        {/* email subscribe */}
        {emailSubscribeSettings && (
          <div className="col-span-8 xl:col-span-12 xl:col-start-12 xl:col-end-24">
            <FooterTitle>{emailSubscribeSettings.title}</FooterTitle>
            <div className="max-w-[220px] mb-[33px] xl:mb-[43px]">
              <CustomPortableText
                value={emailSubscribeSettings.contentAbove.content}
                textColorScheme={'black'}
              />
            </div>
            {/* email subscribe and sign up button */}
            <EmailSubscribeComponent
              placeholder={emailSubscribeSettings.placeholder}
              finePrint={emailSubscribeSettings.finePrint.content}
              colorScheme={'black'}
              hoverColor="#727379"
            />
            <div className="mt-[50px] xl:mt-[100px] max-w-[296px]">
              <CustomPortableText
                value={emailSubscribeSettings.contentBelow.content}
              />
            </div>
          </div>
        )}
        <div className="col-span-8 xl:col-span-24">
          {image && <Image src={image} alt={image?.alt} />}
        </div>
      </div>
    </footer>
  )
}
