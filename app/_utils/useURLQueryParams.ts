import { getObjectKeys } from "@/app/_utils/object";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Queries<T extends string> = Record<T, string | undefined>;

function createQueryString<T extends string>(
  searchParams: URLSearchParams,
  queries: Queries<T>,
) {
  const params = new URLSearchParams(searchParams);
  const queryKeys = getObjectKeys(queries);
  for (const key of queryKeys) {
    const value = queries[key];
    if (!value) {
      params.delete(key);
      continue;
    }
    params.set(key, value);
  }

  return params.toString();
}

export function useURLQueryParams<T extends string>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function getQueryValue(querykey: T) {
    return searchParams.get(querykey);
  }

  function updateQueries(
    queries: Queries<T>,
    options: { scroll: boolean } = { scroll: true },
  ) {
    const queryString = createQueryString(searchParams, queries);
    router.push(`${pathname}?${queryString}`, {
      scroll: options.scroll,
    });
  }

  function deleteQueries(
    queryKeys: T[],
    options: { scroll: boolean } = { scroll: true },
  ) {
    // 対象のクエリパラメーターのみ削除
    const params = new URLSearchParams(searchParams);
    for (const key of queryKeys) {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, {
      scroll: options.scroll,
    });
  }

  return {
    getQueryValue,
    updateQueries,
    deleteQueries,
  } as const;
}
