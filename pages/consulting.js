import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Consulting = dynamic(() => import('../src/pages/Consulting'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function ConsultingPage() {
  return (
    <>
      <Head>
        <title>Conseil - Customs Engineering Solutions</title>
        <meta name="description" content="Services de conseil douanier personnalisés pour optimiser vos opérations." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Consulting />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}