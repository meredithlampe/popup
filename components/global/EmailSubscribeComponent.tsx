import { CustomPortableText } from 'components/shared/CustomPortableText'
import { useState } from 'react'
import { isColoredBackground } from 'lib/utils'

export function EmailSubscribeComponent({
  placeholder,
  finePrint,
  colorScheme,
  bgColor,
  hoverColor = '#A3A5AA', // make sure this is also in tailwind safelist
}) {
  const [hovered, setHovered] = useState(false)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  // handle form submission

  const onSubmit = () => {
    // e.preventDefault()

    // set an error if there's no Klaviyo list supplied...
    // if (!klaviyoListID) setError(true)

    // ...and bail out if terms active and not agreed to (or just Klaviyo list is missing)
    // if ((!hasAgreed && terms && !klaviyoListID) || !klaviyoListID) return

    setSubmitting(true)
    setSuccess(false)
    setError(false)
    //
    fetch('/api/klaviyo/newsletter-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listID: 'Vwjyy7',
        email: text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error && res.error.length > 0) {
          setSubmitting(false)
          setError(true)
          setErrorMessage(res.error[0].detail)
          return
        } else {
          setSubmitting(false)
          setSuccess(true)
        }
      })
  }

  return (
    <>
      <div className="flex flex-col">
        <div
          className={`border-b border-solid ${
            colorScheme == 'black'
              ? hovered || text.length > 0
                ? `border-[${hoverColor}]`
                : 'border-black'
              : hovered || text.length > 0
              ? `border-[${hoverColor}]`
              : 'border-white'
          }`}
        >
          <input
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onChange={(e) => setText(e.target.value)}
            type="email"
            placeholder={placeholder}
            className={`${
              colorScheme == 'black'
                ? `${
                    hovered || text.length > 0
                      ? `placeholder:text-[${hoverColor}]`
                      : 'placeholder:text-black'
                  } `
                : `${
                    hovered || text.length > 0
                      ? `placeholder:text-[${hoverColor}]`
                      : 'placeholder:text-white'
                  } `
            } text-[${hoverColor}] focus:outline-none bg-transparent pb-[8px] placeholder:text-[18px] w-full`}
          />
        </div>
        <div className="flex flex-row mb-[20px] xl:mb-[55px] pt-[10px]">
          {error && (
            <div className="text-red">
              {errorMessage ? errorMessage : 'Error'}
            </div>
          )}
          {success && (
            <div className="text-medGray">Thank you for subscribing!</div>
          )}
          <div className="invisible">SPACER</div>
        </div>
        <button
          onClick={() => {
            onSubmit()
          }}
          disabled={submitting}
          className={`${
            colorScheme == 'black'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          } ${
            submitting
              ? 'cursor-not-allowed opacity-[.5]'
              : colorScheme == 'black'
              ? 'hover:bg-white hover:text-black'
              : 'hover:bg-darkGray hover:text-white'
          } h-[40px] px-[38px] xl:px-[100px] w-fit font-bold`}
        >
          Sign Up
        </button>
      </div>
      <div className="mt-[25px] text-[16px]">
        <CustomPortableText
          value={finePrint}
          textColorScheme={colorScheme}
          isOnColoredBackground={isColoredBackground(bgColor)}
        />
      </div>
    </>
  )
}
