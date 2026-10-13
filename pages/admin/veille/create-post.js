import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminCreateVeillePost = dynamic(
  () => import('../../../src/pages/AdminCreateVeillePost'),
  { ssr: false }
);

const RouteWrapper = dynamic(() => import('../../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminCreateVeillePostPage() {
  return (
    <>
      <Head>
        <title>Nouveau post réglementaire - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminCreateVeillePost />
      </RouteWrapper>
    </>
  );
}
