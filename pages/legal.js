import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Legal = dynamic(() => import('../src/pages/Legal'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function LegalPage() {
  return (
    <>
      <Head>
        <title>Mentions légales - Customs Engineering Solutions</title>
        <meta name="description" content="Mentions légales et conditions d'utilisation." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Legal />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}