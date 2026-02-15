import { useEffect } from "react";

export function useScrollReveal(dependencies: any[] = []) {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, dependencies);
}
