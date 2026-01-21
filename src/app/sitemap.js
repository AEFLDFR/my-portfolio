import { client } from "../sanity/client";

export default async function sitemap() {
  const works = await client.fetch(`*[_type=="work" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

  const baseUrl = "https://你的域名";

  return [
    { url: baseUrl, lastModified: new Date() },
    ...works.map((w) => ({
      url: `${baseUrl}/work/${w.slug}`,
      lastModified: w._updatedAt ? new Date(w._updatedAt) : new Date(),
    })),
  ];
}
