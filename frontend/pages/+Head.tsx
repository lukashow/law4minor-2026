import { usePageContext } from 'vike-react/usePageContext'

export function Head() {
  const pageContext = usePageContext() as any
  const title = pageContext.data?.title
  const description = pageContext.data?.description
  const image = pageContext.data?.image
  
  const siteName = 'Law4Minor'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const defaultDescription = 'Empowering minors with legal knowledge. Learn about your rights, stay informed, and get the legal guidance you need.'
  const finalDescription = description || defaultDescription
  const siteUrl = 'https://law4minor.my'
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`
  
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={siteUrl} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImage} />
    </>
  )
}
