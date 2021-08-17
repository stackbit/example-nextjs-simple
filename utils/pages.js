import fs from "fs";
import glob from "fast-glob";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import path from "path";

const pagesDir = path.join(process.cwd(), "content/pages");
const pagesPattern = path.join(pagesDir, "**/*.md");

const md = new MarkdownIt();

async function getPageFilePathRefs() {
  const pagePaths = glob.sync(pagesPattern).map((pageFilePath) => {
    let pagePath = pageFilePath
      .replace(pagesDir, "")
      .replace(path.extname(pageFilePath), "")
      .replace("/index", "/");
    return [pagePath, pageFilePath];
  });

  return Object.fromEntries(pagePaths);
}

export async function getPagePaths() {
  const pagePaths = await getPageFilePathRefs();
  return Object.keys(pagePaths);
}

async function getPageFileFromSlug(slug) {
  const pagePaths = await getPageFilePathRefs();
  return pagePaths[slug];
}

export async function getPageProps(slug) {
  const pagePath = `/${(slug || []).join("/")}`;
  const pageFilePath = await getPageFileFromSlug(pagePath || "/");
  const fileContent = fs.readFileSync(pageFilePath).toString();
  const { data, content } = matter(fileContent);
  let props = { ...data };
  if (content) props.children = md.render(content);

  return props;
}

export async function getNavItems() {
  const pageFiles = await getPageFilePathRefs();
  const navItems = Object.entries(pageFiles).map(([slug, filePath]) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data } = matter(fileContent);
    return { title: data.title, href: slug };
  });

  return navItems;
}
