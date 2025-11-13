import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Formation = dynamic(() => import('../src/pages/Formation'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function FormationPage() {
  return (
    <>
      <Head>
        <title>Formation - Customs Engineering Solutions</title>
        <meta name="description" content="Formations professionnelles en douanes et commerce international." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Formation />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}