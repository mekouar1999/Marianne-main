import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../src/components/Header'), { ssr: false });
const CookieBanner = dynamic(() => import('../../src/components/CookieBanner'), { ssr: false });
const Veille = dynamic(() => import('../../src/pages/Veille'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function VeillePage() {
  return (
    <>
      <Head>
        <title>Veille Réglementaire - Customs Engineering Solutions</title>
        <meta
          name="description"
          content="Suivez les dernières actualités et réformes réglementaires dans le domaine douanier et du commerce international."
        />
      </Head>

      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Veille />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}
