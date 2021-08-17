import Link from "next/link";
import { getPagePaths, getPageProps, getNavItems } from "../utils/pages";

const Page = (props) => {
  return (
    <div>
      <header>
        {props.navItems.map((item, idx) => (
          <span
            key={idx}
            style={{ display: "inline-block", marginRight: ".5rem" }}>
            <Link href={item.href}>{item.title}</Link>
          </span>
        ))}
      </header>

      <hr />

      <main>
        <h1>{props.page.title}</h1>
        <h2>{props.page.subtitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: props.page.children }} />
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  const pagePaths = await getPagePaths();
  return { paths: pagePaths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = await getPageProps(params.slug);
  const navItems = await getNavItems();
  return { props: { page, navItems } };
}

export default Page;
