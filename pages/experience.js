import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Experience = dynamic(() => import('../src/pages/Experience'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Expérience - Customs Engineering Solutions</title>
        <meta name="description" content="Découvrez notre expérience en conseil douanier et commerce international." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Experience />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}