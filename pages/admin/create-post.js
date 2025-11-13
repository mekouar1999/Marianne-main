import Head from 'next/head';
import dynamic from 'next/dynamic';

const AdminCreatePost = dynamic(() => import('../../src/pages/AdminCreatePost'), { ssr: false });
const RouteWrapper = dynamic(() => import('../../components/RouteWrapper'), { ssr: false });

export default function AdminCreatePostPage() {
  return (
    <>
      <Head>
        <title>Create Post - Admin</title>
        <meta name="description" content="Create a new blog post" />
      </Head>
      
      <RouteWrapper>
        <AdminCreatePost />
      </RouteWrapper>
    </>
  );
}