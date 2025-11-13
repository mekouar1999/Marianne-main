import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminEditPost = dynamic(() => import('../../../src/pages/AdminEditPost'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../../components/RouteWrapper'), { ssr: false });

export default function AdminEditPostPage() {
  return (
    <>
      <Head>
        <title>Modifier l'Article - Administration</title>
        <meta name="description" content="Modifier un article de blog" />
      </Head>
      
      <RouteWrapper>
        <AdminEditPost />
      </RouteWrapper>
    </>
  );
}