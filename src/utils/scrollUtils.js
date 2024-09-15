export const scrollToElement = (element, delay = 0) => {
  setTimeout(() => {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, delay);
};