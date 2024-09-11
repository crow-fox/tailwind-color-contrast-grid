import type { MetaFunction } from "@remix-run/react";

const references = [
  {
    title: "Customizing Colors - Tailwind CSS",
    href: "https://tailwindcss.com/docs/customizing-colors",
  },
  {
    title: "EightShapes Contrast Grid",
    href: "https://contrast-grid.eightshapes.com",
  },
  {
    title: "Web Content Accessibility Guidelines (WCAG) 2.2",
    href: "https://www.w3.org/TR/WCAG22/",
  },
] as const satisfies { title: string; href: string }[];

export const meta: MetaFunction = () => {
  return [{ title: "参考サイト | Tailwind Color Contrast Grid" }];
};

export default function ReferencePage() {
  return (
    <div className="grid gap-y-4">
      <h1 className="text-lg font-bold">参考サイト</h1>
      <ul className="grid list-disc gap-y-2 pl-4">
        {references.map((reference) => (
          <li key={reference.href}>
            <ReferenceLink href={reference.href}>
              {reference.title}
            </ReferenceLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReferenceLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a href={href} className="underline underline-offset-2">
      {children}
    </a>
  );
}
