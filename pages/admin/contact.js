import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminContact = dynamic(() => import('../../src/pages/AdminContact'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function AdminContactPage() {
  return (
    <>
      <Head>
        <title>Messages Contact - Admin - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminContact />
      </RouteWrapper>
    </>
  );
}
