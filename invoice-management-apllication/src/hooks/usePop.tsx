import { useEffect } from "react";
import { useNavigationType } from "react-router";
import { useClickActionStore } from "../redux/ClickActionRedux";

const usePop = () => {
  const navType = useNavigationType();
  const { set } = useClickActionStore();

  return useEffect(() => {
    if (navType === "POP") {
      set({ toggleInvoiceModal: false });
    }
  }, [navType]);
};

export default usePop;
