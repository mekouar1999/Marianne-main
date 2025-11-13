import { BrowserRouter as Router } from 'react-router-dom';
import ClientOnly from './ClientOnly';

export default function RouteWrapper({ children }) {
  return (
    <ClientOnly>
      <Router>
        {children}
      </Router>
    </ClientOnly>
  );
}