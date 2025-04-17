import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="noindex" />
        {/* add shopify buy button script */}
        <script
          async
          src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        />
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
