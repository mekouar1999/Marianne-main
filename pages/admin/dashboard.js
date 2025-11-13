import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../src/pages/AdminDashboard'), {
  ssr: false,
});

const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminDashboardPage() {
  return (
    <>
      <Head>
        <title>Admin Dashboard - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminDashboard />
      </RouteWrapper>
    </>
  );
}