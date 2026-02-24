import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Cookies = dynamic(() => import('../src/pages/Cookies'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function CookiesPage() {
  return (
    <>
      <Head>
        <title>Politique de cookies - Customs Engineering Solutions</title>
        <meta name="description" content="Politique de cookies et gestion du consentement." />
      </Head>

      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Cookies />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}