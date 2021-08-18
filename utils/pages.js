import fs from "fs";
import glob from "fast-glob";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import path from "path";

const pagesDir = path.join(process.cwd(), "content/pages");
const pagesPattern = path.join(pagesDir, "**/*.md");

const md = new MarkdownIt();

/**
 * Reads the pages directory and returns an object of key-value pairs where the
 * key is the path of the page on the front end, and the value is the absolute
 * path to the content file.
 *
 * Example:
 *
 *    { "/about/nested": "[CWD]/content/pages/about/nested.md" }
 */
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

/**
 * Extracts all the keys from getPageFilePathRefs() to present an array of all
 * page paths for the site.
 */
export async function getPagePaths() {
  const pagePaths = await getPageFilePathRefs();
  return Object.keys(pagePaths);
}

/**
 * Given a page path for the site, this returns an absolute path to its content
 * file.
 */
async function getPageFileFromSlug(slug) {
  const pagePaths = await getPageFilePathRefs();
  return pagePaths[slug];
}

/**
 * Given a path for a page on the site, this finds the content file, parses it,
 * then adds `id` and `children` as additional props, where `id` is the path to
 * the file from the root of the project, and `children` is the main content
 * from the file, converted to an HTML string.
 */
export async function getPageProps(slug) {
  const pagePath = `/${(slug || []).join("/")}`;
  const pageFilePath = await getPageFileFromSlug(pagePath || "/");
  const fileContent = fs.readFileSync(pageFilePath).toString();
  const { data, content } = matter(fileContent);
  let props = { ...data };
  props.id = pageFilePath.replace(process.cwd(), "").slice(1);
  if (content) props.children = md.render(content);

  return props;
}

/**
 * Reads all the pages in the content directory, and builds a list of links
 * using the title of the page as the label.
 */
export async function getNavItems() {
  const pageFiles = await getPageFilePathRefs();
  const navItems = Object.entries(pageFiles).map(([slug, filePath]) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data } = matter(fileContent);
    return { title: data.title, href: slug };
  });

  return navItems;
}
