import { PageContext } from 'vike/types'

export default function data(pageContext: PageContext) {
  const tagSlug = pageContext.routeParams?.tagSlug || '';
  const tagName = tagSlug.replace(/-/g, ' ');
  
  return {
    title: `Articles tagged "${tagName}"`,
    description: `Browse all Law4Minor articles tagged with ${tagName}. Legal education resources for youth.`,
  }
}
