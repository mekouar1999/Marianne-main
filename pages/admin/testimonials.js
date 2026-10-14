import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminHome = dynamic(() => import('../../src/pages/AdminHome'), {
  ssr: false,
});

const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminTestimonialsPage() {
  return (
    <>
      <Head>
        <title>Témoignages Page d'accueil - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminHome />
      </RouteWrapper>
    </>
  );
}
