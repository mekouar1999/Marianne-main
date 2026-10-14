import { useRouter } from 'next/router';
import '../src/index.css';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdmin =
    Boolean(router.pathname?.startsWith('/admin')) ||
    Boolean(router.asPath?.startsWith('/admin'));

  return (
    <LanguageProvider>
      <Component {...pageProps} />
      {!isAdmin && <Footer />}
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}

export default MyApp;