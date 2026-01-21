import HomeClient from "../components/HomeClient";
import { client } from "../sanity/client";

export const revalidate = 60;

const HOME_QUERY = `
{
  "site": *[_type=="site"][0]{
    title, tagline, introTitle, introText, contactEmail, contactSocial
  },
  "featured": *[_type=="work" && featured==true && defined(slug.current)]
    | order(featuredOrder asc, date desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "cover": cover.asset->url,
      date,
      featured,
      featuredOrder
    },
  "works": *[_type=="work" && (!defined(featured) || featured!=true) && defined(slug.current)]
    | order(date desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "cover": cover.asset->url,
      date
    }
}
`;

export default async function Page() {
  const data = await client.fetch(HOME_QUERY);
  return (
    <HomeClient
      site={data?.site}
      featured={data?.featured || []}
      works={data?.works || []}
    />
  );
}
