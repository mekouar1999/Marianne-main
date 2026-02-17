import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Blog = dynamic(() => import('../src/pages/Blog'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog - Customs Engineering Solutions</title>
        <meta name="description" content="Articles et actualités sur les douanes et le commerce international." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Blog />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}