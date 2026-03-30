"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    // Initial check
    reveal();

    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return null;
}
