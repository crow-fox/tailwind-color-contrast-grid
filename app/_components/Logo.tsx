"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Logo({ className, children }: Props) {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  return (
    <>
      {isTopPage ? (
        <h1 className={className}>{children}</h1>
      ) : (
        <p className={className}>{children}</p>
      )}
    </>
  );
}
