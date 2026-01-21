"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function WorkCard({ w }) {
  return (
    <Link href={`/work/${w.slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="group rounded-2xl border border-black/5 bg-white/70 p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-black">{w.title || "Untitled"}</div>
          <div className="text-xs text-black/40 group-hover:text-black/60 transition">↗</div>
        </div>

        <div className="mt-3 h-28 rounded-xl border border-black/5 bg-[linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.02))] overflow-hidden">
          {w.cover ? (
            <img
              src={w.cover}
              alt={w.title || "cover"}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>

        <div className="mt-3 text-sm leading-relaxed text-black/60">
          {w.excerpt || "（暂无简介）"}
        </div>
      </motion.div>
    </Link>
  );
}

export default function HomeClient({ site, featured, works }) {
  const featuredReady = (featured || []).filter((w) => !!w?.slug);
  const worksReady = (works || []).filter((w) => !!w?.slug);

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_10%,rgba(16,185,129,0.12),transparent_55%),linear-gradient(to_bottom,rgba(248,250,252,1),rgba(245,246,248,1))]">
      <div className="relative mx-auto max-w-6xl px-8 py-14 space-y-10">
        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-black/70">
            <span className="h-1.5 w-1.5 rounded-full bg-black/50" />
            Portfolio
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">
            {site?.title || "Portfolio"}
          </h1>
          <p className="max-w-2xl leading-relaxed text-black/60">
            {site?.tagline || ""}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#works" className="rounded-xl bg-black px-4 py-2 text-sm text-white shadow hover:opacity-90 transition">
              查看作品
            </a>
            <a href="#contact" className="rounded-xl border border-black/10 bg-white/60 px-4 py-2 text-sm text-black hover:bg-white transition">
              联系方式
            </a>
          </div>
        </div>

        {/* Featured Works */}
        {featuredReady.length > 0 && (
          <section className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-black tracking-tight">精选作品</h2>
                <p className="text-black/60">置顶项目，优先展示。</p>
              </div>
              <div className="text-xs text-black/40">
                featuredOrder asc · date desc
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredReady.map((w) => (
                <WorkCard key={w._id} w={w} />
              ))}
            </div>
          </section>
        )}

        {/* All Works */}
        <section
          id="works"
          className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black tracking-tight">全部作品</h2>
              <p className="text-black/60"></p>
            </div>
            <div className="text-xs text-black/40">date desc</div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {worksReady.map((w) => (
              <WorkCard key={w._id} w={w} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-semibold text-black tracking-tight">联系</h2>
          <div id="contact" className="mt-6 flex flex-wrap items-center gap-6 text-black/70">
            {site?.contactEmail ? <div>Email：{site.contactEmail}</div> : null}
            {site?.contactSocial ? <div>Social：{site.contactSocial}</div> : null}
          </div>
        </section>

        <div className="pb-6 text-xs text-black/40">© {new Date().getFullYear()} · Built with Next.js</div>
      </div>
    </main>
  );
}
