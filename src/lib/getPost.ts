import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

type PostData = {
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
  };
  content: string;
};

export function getPost(slug: string): PostData | null {
  // Lấy đường dẫn thư mục của file hiện tại
const currentDir = new URL('.', import.meta.url).pathname;

// Kết hợp với thư mục posts
const filePath = path.join(currentDir, '../content/posts', `${slug}.md`);
  // const filePath = path.join(import.meta.dir, '../content/posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: {
      title: data.title,
      pubDate: data.pubDate,
      description: data.description,
    },
    content,
  };
}

export function getAllPosts(): PostData[] {
  const postsDir = path.join(new URL('.', import.meta.url).pathname, '../content/posts');
  const filenames = fs.readdirSync(postsDir);

  return filenames
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        frontmatter: {
          title: data.title,
          pubDate: data.pubDate,
          description: data.description,
        },
        content,
        slug,
      };
    });
}
const allPosts = getAllPosts();

const sortedPosts = allPosts.sort((a, b) => {
  const dateA = new Date(a.frontmatter.pubDate);
  const dateB = new Date(b.frontmatter.pubDate);

  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;

  return a.frontmatter.title.localeCompare(b.frontmatter.title);
});
