import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminEditVeillePost = dynamic(
  () => import('../../../../src/pages/AdminEditVeillePost'),
  { ssr: false }
);

const RouteWrapper = dynamic(() => import('../../../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminEditVeillePostPage() {
  return (
    <>
      <Head>
        <title>Modifier le post réglementaire - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminEditVeillePost />
      </RouteWrapper>
    </>
  );
}
