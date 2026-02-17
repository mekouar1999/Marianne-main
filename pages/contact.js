import Head from 'next/head';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('../src/components/Footer'), { ssr: false });
const CookieBanner = dynamic(() => import('../src/components/CookieBanner'), { ssr: false });
const Contact = dynamic(() => import('../src/pages/Contact'), { ssr: false });
const RouteWrapper = dynamic(() => import('../components/RouteWrapper'), { ssr: false });

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - Customs Engineering Solutions</title>
        <meta name="description" content="Contactez-nous pour vos besoins en conseil douanier et formation." />
      </Head>
      
      <RouteWrapper>
        <div className="min-h-screen bg-white antialiased">
          <Header />
          <main className="relative">
            <Contact />
          </main>
          <CookieBanner />
        </div>
      </RouteWrapper>
    </>
  );
}