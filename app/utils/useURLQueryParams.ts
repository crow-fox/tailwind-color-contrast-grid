import { useSearchParams } from "@remix-run/react";

type Queries<T extends string> = Record<T, string | undefined>;

export function useURLQueryParams<T extends string>() {
  const [searchParams, setSearchParams] = useSearchParams();

  function getQueryValue(querykey: T) {
    return searchParams.get(querykey);
  }

  function updateQueries(
    queries: Queries<T>,
    options: { preventScrollReset: boolean } = { preventScrollReset: false },
  ) {
    // 既存のクエリパラメーターを保持したまま、新たなクエリパラメーターを追加
    const params = new URLSearchParams(searchParams);
    for (const key in queries) {
      const value = queries[key];
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    setSearchParams(params, {
      preventScrollReset: options.preventScrollReset,
    });
  }

  function deleteQueries(
    queryKeys: T[],
    options: { preventScrollReset: boolean } = { preventScrollReset: false },
  ) {
    // 対象のクエリパラメーターのみ削除
    const params = new URLSearchParams(searchParams);
    for (const key of queryKeys) {
      params.delete(key);
    }
    setSearchParams(params, {
      preventScrollReset: options.preventScrollReset,
    });
  }

  return {
    getQueryValue,
    updateQueries,
    deleteQueries,
  } as const;
}
