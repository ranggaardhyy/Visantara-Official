import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
