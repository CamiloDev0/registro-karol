import { useState } from "react";

export const usePageView = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const goToPage = (page = -1) => {
    if (page === -1) return;
    setCurrentScreen(page);
  };

  return { goToPage, currentScreen };
};
