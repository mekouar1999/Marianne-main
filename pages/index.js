import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Home = dynamic(() => import('../src/pages/Home'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Customs Engineering Solutions - Votre partenaire douanes sur mesure</title>
        <meta name="description" content="Expert en conseil douanier et formation internationale. Solutions personnalisées pour optimiser vos opérations douanières." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Home />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}