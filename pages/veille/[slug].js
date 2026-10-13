import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../src/components/Header'), { ssr: false });
const CookieBanner = dynamic(() => import('../../src/components/CookieBanner'), { ssr: false });
const VeilleDetail = dynamic(() => import('../../src/pages/VeilleDetail'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function VeilleDetailPage() {
  return (
    <>
      <Head>
        <title>Actualité Réglementaire - Customs Engineering Solutions</title>
        <meta
          name="description"
          content="Actualité et décryptage réglementaire sur les douanes et le commerce international."
        />
      </Head>

      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <VeilleDetail />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}
