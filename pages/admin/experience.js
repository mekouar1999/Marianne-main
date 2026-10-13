import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminExperience = dynamic(() => import('../../src/pages/AdminExperience'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function AdminExperiencePage() {
  return (
    <>
      <Head>
        <title>Expérience Client - Admin - Customs Engineering Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <RouteWrapper>
        <AdminExperience />
      </RouteWrapper>
    </>
  );
}
