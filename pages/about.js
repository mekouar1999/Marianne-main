import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const About = dynamic(() => import('../src/pages/About'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>À propos - Customs Engineering Solutions</title>
        <meta name="description" content="Découvrez notre expertise en conseil douanier et formation internationale." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <About />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}