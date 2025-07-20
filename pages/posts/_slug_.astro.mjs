import { c as createComponent, a as createAstro, r as renderHead, u as unescapeHTML, b as renderTemplate } from '../../chunks/astro/server_DNO5o_fN.mjs';
import 'kleur/colors';
import 'clsx';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
export { renderers } from '../../renderers.mjs';

function getPost(slug) {
  const currentDir = new URL(".", import.meta.url).pathname;
  const filePath = path.join(currentDir, "../content/posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: {
      title: data.title,
      pubDate: data.pubDate,
      description: data.description
    },
    content
  };
}
function getAllPosts() {
  const postsDir = path.join(new URL(".", import.meta.url).pathname, "../content/posts");
  const filenames = fs.readdirSync(postsDir);
  return filenames.filter((file) => file.endsWith(".md")).map((file) => {
    const slug = file.replace(".md", "");
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      frontmatter: {
        title: data.title,
        pubDate: data.pubDate,
        description: data.description
      },
      content,
      slug
    };
  });
}
const allPosts = getAllPosts();
allPosts.sort((a, b) => {
  const dateA = new Date(a.frontmatter.pubDate);
  const dateB = new Date(b.frontmatter.pubDate);
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return a.frontmatter.title.localeCompare(b.frontmatter.title);
});

const $$Astro = createAstro();
async function getStaticPaths() {
  const postDir = path.resolve("./src/content/posts");
  const files = fs.readdirSync(postDir).filter((file) => file.endsWith(".md"));
  return files.map((file) => ({
    params: { slug: file.replace(".md", "") }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = getPost(slug || "default-slug");
  if (!post) {
    throw new Error(`Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt v\u1EDBi slug "${slug}"`);
  }
  const { frontmatter, content } = post;
  const md = new MarkdownIt({
    html: true
  });
  const htmlContent = md.render(content);
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><title>${frontmatter.title}</title>${renderHead()}</head> <body> <main style="max-width: 700px; margin: auto; padding: 2rem; font-family: 'Inter', Arial, sans-serif;"> <h1>${frontmatter.title}</h1> <p><em>${frontmatter.pubDate}</em></p> <div>${unescapeHTML(htmlContent)}</div> </main> </body></html>`;
}, "/Users/m1/interstellar-ice/src/pages/posts/[slug].astro", void 0);

const $$file = "/Users/m1/interstellar-ice/src/pages/posts/[slug].astro";
const $$url = "/<interstellar-fire>/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
