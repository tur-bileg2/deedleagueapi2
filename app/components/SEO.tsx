import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

const defaultDescription = 'Deed League Players Statistics and Data';
const defaultOgImage = '/og-image.png'; // Create a default OG image

export default function SEO({
  title,
  description = defaultDescription,
  canonicalUrl,
  ogType = 'website',
  ogImage = defaultOgImage,
}: SEOProps) {
  const router = useRouter();
  const fullTitle = title ? `${title} | Deed League API` : 'Deed League API | Stats, Players & Analytics';
  
  // Build canonical URL
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://webscraper-eosin.vercel.app/';
  const canonical = canonicalUrl || `${domain}${router.asPath}`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${domain}${ogImage}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${domain}${ogImage}`} />
    </Head>
  );
}
