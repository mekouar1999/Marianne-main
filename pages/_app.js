import '../src/index.css';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}

export default MyApp;