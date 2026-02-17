import '../src/index.css';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Footer />
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}

export default MyApp;