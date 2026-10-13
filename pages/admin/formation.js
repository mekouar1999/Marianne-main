import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminFormation = dynamic(() => import('../../src/pages/AdminFormation'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function AdminFormationPage() {
  return (
    <>
      <Head>
        <title>Formation - Admin - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminFormation />
      </RouteWrapper>
    </>
  );
}
