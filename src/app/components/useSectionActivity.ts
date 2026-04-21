import { useEffect, useRef, useState } from "react";

export function useSectionActivity<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [hasEntered, setHasEntered] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    setIsNear(false);
    setIsActive(false);
    setHasEntered(false);

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNear(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      {
        rootMargin: "35% 0px 35% 0px",
        threshold: 0.01,
      },
    );

    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      {
        rootMargin: "-15% 0px -15% 0px",
        threshold: 0.15,
      },
    );

    nearObserver.observe(node);
    activeObserver.observe(node);

    return () => {
      nearObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return {
    ref,
    hasEntered,
    isActive,
    isNear,
  };
}