import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Privacy = dynamic(() => import('../src/pages/Privacy'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - Customs Engineering Solutions</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Privacy />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}