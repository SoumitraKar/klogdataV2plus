import { useEffect, useRef, useState } from "react";

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

function createObserverManager(options: IntersectionObserverInit) {
  let observer: IntersectionObserver | null = null;
  const listeners = new Map<Element, Set<ObserverCallback>>();

  const getObserver = () => {
    if (observer || typeof IntersectionObserver === "undefined") {
      return observer;
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        listeners.get(entry.target)?.forEach((listener) => listener(entry));
      }
    }, options);

    return observer;
  };

  return {
    observe(node: Element, callback: ObserverCallback) {
      const currentObserver = getObserver();
      if (!currentObserver) {
        return () => undefined;
      }

      const nodeListeners = listeners.get(node) ?? new Set<ObserverCallback>();
      const isFirstListener = nodeListeners.size === 0;

      nodeListeners.add(callback);
      listeners.set(node, nodeListeners);

      if (isFirstListener) {
        currentObserver.observe(node);
      }

      return () => {
        const activeListeners = listeners.get(node);
        if (!activeListeners) {
          return;
        }

        activeListeners.delete(callback);
        if (activeListeners.size > 0) {
          return;
        }

        listeners.delete(node);
        currentObserver.unobserve(node);
      };
    },
  };
}

const nearObserverManager = createObserverManager({
  rootMargin: "35% 0px 35% 0px",
  threshold: 0.01,
});

const activeObserverManager = createObserverManager({
  rootMargin: "-15% 0px -15% 0px",
  threshold: 0.15,
});

export function useSectionActivity<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const stopNearObservation = nearObserverManager.observe(node, (entry) => {
      setIsNear(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasEntered(true);
      }
    });

    const stopActiveObservation = activeObserverManager.observe(node, (entry) => {
      setIsActive(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasEntered(true);
      }
    });

    return () => {
      stopNearObservation();
      stopActiveObservation();
    };
  }, []);

  return {
    ref,
    hasEntered,
    isActive,
    isNear,
  };
}