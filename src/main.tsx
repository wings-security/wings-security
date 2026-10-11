import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/premium.css'

const container: HTMLElement | null = document.getElementById('root');
if (!container) throw new Error('WINGS root element is missing.');
const currentPath: string = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
const renderedPath: string | undefined = container.dataset.renderedPath;
// A SPA preview server serves homepage HTML for unknown URLs; that tree cannot hydrate a 404 route.
if (container.hasChildNodes() && (renderedPath === currentPath || renderedPath === '/404')) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
