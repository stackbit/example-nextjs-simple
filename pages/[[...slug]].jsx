import Image from "next/image";
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

      <main data-sb-object-id={props.page.id}>
        <h1 data-sb-field-path="title">{props.page.title}</h1>
        <h2 data-sb-field-path="subtitle">{props.page.subtitle}</h2>
        {props.page.image && (
          <Image
            data-sb-field-path="image#@src"
            src={props.page.image}
            width={640}
            height={424}
          />
        )}
        <div
          data-sb-field-path="content"
          dangerouslySetInnerHTML={{ __html: props.page.children }}
        />
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
