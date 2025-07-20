import { c as createComponent, r as renderHead, d as addAttribute, b as renderTemplate } from '../chunks/astro/server_DNO5o_fN.mjs';
import 'kleur/colors';
import 'clsx';
import fs__default from 'fs';
import path__default from 'path';
import matter from 'gray-matter';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const postDirectory = path__default.join(process.cwd(), "src/content/posts");
  const postFiles = fs__default.readdirSync(postDirectory).filter((file) => file.endsWith(".md"));
  const posts = postFiles.map((file) => {
    const filePath = path__default.join(postDirectory, file);
    const postContent = fs__default.readFileSync(filePath, "utf-8");
    const { data } = matter(postContent);
    return {
      title: data.title || "No name",
      pubDate: data.pubDate || "",
      // Ngày mặc định nếu thiếu
      slug: file.replace(".md", "")
    };
  }).sort((a, b) => {
    const dateA = new Date(a.pubDate);
    const dateB = new Date(b.pubDate);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return a.title.localeCompare(b.title);
  });
  return renderTemplate`<html lang="vi" data-astro-cid-j7pv25f6> <head><meta charset="UTF-8"><title>Interstellar ice</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <main data-astro-cid-j7pv25f6> <h1 style="text-align: center;" data-astro-cid-j7pv25f6>Chân Không</h1> <ul style="list-style-type: none;" data-astro-cid-j7pv25f6> ${posts.map((post) => renderTemplate`<li style="margin: 15px 15px; text-align: right;" data-astro-cid-j7pv25f6> <a${addAttribute(`/posts/${post.slug}`, "href")} data-astro-cid-j7pv25f6>${post.title}</a> </li>`)} </ul> </main> <footer data-astro-cid-j7pv25f6>
© 2025 knnav – All rights reserved.
</footer> </body></html>`;
}, "/Users/m1/interstellar-ice/src/pages/index.astro", void 0);

const $$file = "/Users/m1/interstellar-ice/src/pages/index.astro";
const $$url = "/<interstellar-fire>";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
