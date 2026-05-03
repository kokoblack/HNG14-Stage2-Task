import { useEffect } from "react";

const useStatic = (state: boolean) => {
  return useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);
};

export default useStatic;
