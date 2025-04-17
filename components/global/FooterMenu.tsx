import { Submenu } from 'types'
import { FooterMenuLink } from './FooterMenuLink'
import { FooterTitle } from './FooterTitle'

export function FooterMenu({ menu }: { menu: Submenu }) {
  return (
    <>
      <FooterTitle>{menu.title}</FooterTitle>
      <div className="flex flex-col">
        {menu.menu.menuItems.map((item, key) => (
          <FooterMenuLink key={key} menuItem={item} />
        ))}
      </div>
    </>
  )
}
