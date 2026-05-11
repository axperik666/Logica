/** Единый easing для скролл-анимаций секций (как на премиум landing). */
export const SECTION_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Порог для `whileInView` / `viewport` у motion-компонентов. */
export const sectionRevealViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -12% 0px"
} as const;

/** Те же пороги для `useInView` (секции со stagger внутри). */
export const sectionInViewOptions = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -12% 0px"
} as const;

export function sectionRevealTransition(delay = 0) {
  return {
    duration: 0.52,
    delay,
    ease: SECTION_REVEAL_EASE
  };
}

/** Варианты для `initial` / `whileInView` на целых секциях. */
export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: sectionRevealTransition()
  }
} as const;
