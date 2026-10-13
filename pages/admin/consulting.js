import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminConsulting = dynamic(() => import('../../src/pages/AdminConsulting'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function AdminConsultingPage() {
  return (
    <>
      <Head>
        <title>Consulting - Admin - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminConsulting />
      </RouteWrapper>
    </>
  );
}
