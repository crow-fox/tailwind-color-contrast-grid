import { Link, useLocation } from "@remix-run/react";
import { FC } from "react";

export const Logo: FC = () => {
  const location = useLocation();
  const isTopPage = location.pathname === "/";

  return (
    <>
      {isTopPage ? (
        <h1>
          <LogoLink />
        </h1>
      ) : (
        <p>
          <LogoLink />
        </p>
      )}
    </>
  );
};

const LogoLink: FC = () => {
  return (
    <Link to="/" className="text-lg font-bold">
      Tailwind Color Contrast Grid
    </Link>
  );
};
