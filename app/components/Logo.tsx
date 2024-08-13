import { Link, useLocation } from "@remix-run/react";
import { FC } from "react";

export const Logo: FC = () => {
  const location = useLocation();
  const isTopPage = location.pathname === "/";

  return (
    <>
      {isTopPage ? (
        <h1>
          <Link to="/" className="text-lg font-bold">
            Tailwind Color Contrast Grid
          </Link>
        </h1>
      ) : (
        <p>
          <Link to="/" className="text-lg font-bold">
            Tailwind Color Contrast Grid
          </Link>
        </p>
      )}
    </>
  );
};
