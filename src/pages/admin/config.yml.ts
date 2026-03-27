import { getCmsRuntimeConfig, renderCmsConfigYml } from '../../utils/cms-config';

export const prerender = true;

export function GET() {
  const body = renderCmsConfigYml(getCmsRuntimeConfig());
  return new Response(body, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
