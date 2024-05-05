import { useCallback, useState } from "react";

export function useClipboardCopy() {
  const [isCopied, setIsCopied] = useState(false);

  const clipboardCopy = useCallback(
    async (text: string, delay: number = 1000) => {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, delay);
    },
    [],
  );

  return { isCopied, clipboardCopy } as const;
}
