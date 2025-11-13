import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminLogin = dynamic(() => import('../../src/pages/AdminLogin'), {
  ssr: false,
});

const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), {
  ssr: false,
});

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin Login - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminLogin />
      </RouteWrapper>
    </>
  );
}