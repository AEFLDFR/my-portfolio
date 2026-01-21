import { client } from "../../../sanity/client";
import { PortableText } from "@portabletext/react";

export default async function Page({ params }) {
  const { slug: slugRaw } = await params;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;

  if (!slug || typeof slug !== "string") {
    return (
      <main className="min-h-screen p-10">
        <p>路由参数 slug 未获取到。</p>
      </main>
    );
  }

  const query = `
    *[_type == "work" && slug.current == $slug][0]{
      title,
      excerpt,
      "cover": cover.asset->url,
      content
    }
  `;

  const work = await client.fetch(query, { slug });

  if (!work) {
    return (
      <main className="min-h-screen p-10">
        <p>找不到该作品（可能未 Publish 或 slug 不存在）</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7f8]">
      <div className="mx-auto max-w-3xl px-8 py-14">
        <a href="/" className="text-sm opacity-60 hover:opacity-100">
          ← 返回首页
        </a>

        <h1 className="mt-6 text-3xl font-semibold text-black tracking-tight">
          {work.title}
        </h1>

        {work.excerpt && (
          <p className="mt-3 text-black/60 leading-relaxed">{work.excerpt}</p>
        )}

        {work.cover && (
          <img
            src={work.cover}
            alt={work.title || "cover"}
            className="mt-8 w-full rounded-2xl border border-black/5"
          />
        )}

        <article className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={work.content || []} />
        </article>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }) {
  const { slug: slugRaw } = await params;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;
  if (!slug || typeof slug !== "string") return {};

  const work = await client.fetch(
    `*[_type=="work" && slug.current==$slug][0]{ title, excerpt, "cover": cover.asset->url }`,
    { slug }
  );

  if (!work) return {};

  const title = work.title || "Work";
  const description = work.excerpt || "";
  const images = work.cover ? [{ url: work.cover }] : [];

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
