import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import SiteRoutes from './SiteRoutes';
export { publicPaths, renderMetadata } from './lib/metadata';

export function render(path: string): string {
  return renderToString(<StaticRouter location={path}><SiteRoutes /></StaticRouter>);
}
