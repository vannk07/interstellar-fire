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
