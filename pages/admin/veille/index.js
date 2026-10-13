import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminVeille = dynamic(() => import('../../../src/pages/AdminVeille'), {
  ssr: false,
});

const RouteWrapper = dynamic(() => import('../../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminVeillePage() {
  return (
    <>
      <Head>
        <title>Veille Réglementaire - Admin - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminVeille />
      </RouteWrapper>
    </>
  );
}
