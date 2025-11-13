import dynamic from 'next/dynamic';

const CookiesPage = dynamic(() => import('../src/pages/Cookies'), {
  ssr: false,
});

export default CookiesPage;