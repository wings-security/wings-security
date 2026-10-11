import type { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SiteRoutes from './SiteRoutes';

export default function App(): JSX.Element {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}
