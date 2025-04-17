import { IconContainer } from './IconContainer'
import { LinkIcon } from './LinkIcon'

export function CopyUrlButton({ children, onClick }) {
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString())
  }
  return (
    <div
      onClick={() => {
        copyUrlToClipboard()
        onClick && onClick()
      }}
    >
      {children}
    </div>
  )
}
