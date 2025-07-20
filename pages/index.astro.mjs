import { c as createComponent, r as renderHead, d as addAttribute, b as renderTemplate } from '../chunks/astro/server_DeHwAsyY.mjs';
import 'kleur/colors';
import 'clsx';
import fs__default from 'fs';
import path__default from 'path';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const postDirectory = path__default.join(process.cwd(), "src/content/posts");
  const postFiles = fs__default.readdirSync(postDirectory).filter((file) => file.endsWith(".md"));
  const posts = postFiles.map((file) => {
    const filePath = path__default.join(postDirectory, file);
    const postContent = fs__default.readFileSync(filePath, "utf-8");
    const frontmatter = postContent.split("\n").slice(0, 5).join("\n");
    const titleMatch = frontmatter.match(/title: "(.*)"/);
    const title = titleMatch ? titleMatch[1] : "Kh\xF4ng c\xF3 ti\xEAu \u0111\u1EC1";
    const slug = file.replace(".md", "");
    return { title, slug };
  });
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><title>Trang chủ Blog</title>${renderHead()}</head> <body> <main> <h1>Chào mừng đến với Blog của tôi!</h1> <ul> ${posts.map((post) => renderTemplate`<li><a${addAttribute(`/posts/${post.slug}`, "href")}>${post.title}</a></li>`)} </ul> </main> </body></html>`;
}, "/Users/m1/interstellar-ice/src/pages/index.astro", void 0);

const $$file = "/Users/m1/interstellar-ice/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
