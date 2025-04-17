import { useEffect, useState } from 'react'

export function ShopifyBuyButton({ productId }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 10

    const initializeButton = () => {
      if (typeof window !== 'undefined' && window.ShopifyBuy) {
        try {
          const client = ShopifyBuy.buildClient({
            domain: 'aeacc7-c7.myshopify.com',
            storefrontAccessToken: 'd7602d707a1a9b488b57b374f5d0de06',
          })

          ShopifyBuy.UI.onReady(client)
            .then(function (ui) {
              // https://shopify.github.io/buy-button-js/customization/
              ui.createComponent('product', {
                id: productId,
                node: document.getElementById(
                  'product-component-1735804043460',
                ),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                  product: {
                    styles: {
                      product: {
                        '@media (min-width: 601px)': {
                          // 'max-width': 'calc(25% - 20px)',
                          'margin-bottom': '50px',
                        },
                        'text-align': 'left',
                      },
                      options: {
                        'max-width': '100% !important',
                        'margin-bottom': '24px',
                        '@media (min-width: 1280px)': {
                          'margin-bottom': '43px',
                        },
                      },
                      button: {
                        ':hover': {
                          'background-color': '#F0F0F0',
                          color: '#000000',
                        },
                        'background-color': '#000000',
                        ':focus': {
                          'background-color': '#000000',
                        },
                        'border-radius': '0px',
                        'padding-left': '49px',
                        'padding-right': '49px',
                        'font-size': '18px',
                        'font-weight': 'bold',
                      },
                    },
                    contents: {
                      img: false,
                      title: false,
                      price: false,
                    },
                    text: {
                      button: 'Add to cart',
                    },
                  },
                  productSet: {
                    styles: {
                      products: {
                        '@media (min-width: 601px)': {
                          'margin-left': '-20px',
                        },
                      },
                    },
                  },
                  modalProduct: {
                    contents: {
                      img: false,
                      imgWithCarousel: true,
                      button: false,
                      buttonWithQuantity: true,
                    },
                    styles: {
                      product: {
                        '@media (min-width: 601px)': {
                          'margin-left': '0px',
                          'margin-bottom': '0px',
                        },
                      },
                      button: {
                        ':hover': {
                          'background-color': '#000000',
                        },
                        'background-color': '#000000',
                        ':focus': {
                          'background-color': '#000000',
                        },
                        'border-radius': '0px',
                        'padding-left': '49px',
                        'padding-right': '49px',
                      },
                    },
                    text: {
                      button: 'Add to cart',
                    },
                  },
                  option: {
                    styles: {
                      label: {
                        display: 'none',
                        'font-weight': 'bold',
                      },
                      wrapper: {
                        'margin-top': '28px',
                      },
                      select: {
                        outline: 'none',
                        'border-width': '1px',
                        'border-style': 'solid',
                        'border-color': 'transparent',
                        ':hover': {
                          'border-color': 'black',
                          outline: 'black',
                        },
                        // ':focus': {
                        //   'border-color': '#000000',
                        //   outline: 'black',
                        // },
                        'font-weight': 'bold',
                        'padding-top': '14px',
                        'padding-bottom': '14px',
                        'padding-left': '21px',
                        'padding-right': '21px',
                      },
                    },
                  },
                  cart: {
                    styles: {
                      button: {
                        ':hover': {
                          'background-color': '#000000',
                        },
                        'background-color': '#000000',
                        ':focus': {
                          'background-color': '#000000',
                        },
                        'border-radius': '0px',
                      },
                    },
                    text: {
                      total: 'Subtotal',
                      button: 'Checkout',
                    },
                    popup: false,
                  },
                  toggle: {
                    styles: {
                      toggle: {
                        'background-color': '#000000',
                        ':hover': {
                          'background-color': '#000000',
                        },
                        ':focus': {
                          'background-color': '#000000',
                        },
                      },
                    },
                  },
                },
              })
            })
            .catch((err) => {
              console.error('Failed to initialize Shopify UI:', err)
              setError(true)
            })

          setIsLoaded(true)
        } catch (err) {
          console.error('Failed to build Shopify client:', err)
          setError(true)
        }
      } else if (attempts < maxAttempts) {
        attempts++
        // Try again in 500ms
        setTimeout(initializeButton, 500)
      } else {
        console.error(
          'Failed to load Shopify Buy Button after maximum attempts',
        )
        setError(true)
      }
    }

    initializeButton()

    return () => {
      // Cleanup if component unmounts during initialization attempts
      attempts = maxAttempts
    }
  }, [productId]) // Added productId to dependencies

  if (error) {
    return (
      <div className="w-full text-lightGray">
        Failed to load checkout button. Please refresh the page.
      </div>
    )
  }

  return <div className="w-full" id="product-component-1735804043460"></div>
}
