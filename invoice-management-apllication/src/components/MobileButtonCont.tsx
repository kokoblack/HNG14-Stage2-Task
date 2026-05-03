import { useClickActionStore } from "../redux/ClickActionRedux";
import Button from "./Button";

type MobileButtonContProps = {
  id?: string;
};
const MobileButtonCont = ({ id }: MobileButtonContProps) => {
  const text = id ? "Save Changes" : "Save & Send";
  const text2 = id ? "Cancel" : "Discard";
  const set = useClickActionStore((state) => state.set);
  return (
    <div className=" w-170 max-[764px]:w-150 max-[640px]:w-full max-[640px]:rounded-none shadow-edit max-[640px]:px-4 max-[640px]:py-4 max-[480px]:gap-1 px-10 py-6 gap-4 bg-1300 dark:bg-1200 rounded-br-4xl flex justify-center items-center">
      <section onClick={() => set({ toggleInvoiceModal: false })} className={`${id? "ml-auto" : "mr-auto"}`}>
        <Button
          color="#7E88C3"
          hover="#DFE3FA"
          backgroundColor="#F9FAFE"
          text={text2}
        />
      </section>
      {!id && (
        <section>
          <Button
            type={true}
            color="#888EB0"
            hover="#0C0E16"
            backgroundColor="#373B53"
            text="Save as Draft"
          />
        </section>
      )}
      <section>
        <Button
          type={true}
          color="#ffffff"
          hover="#9277FF"
          backgroundColor="#7C5DFA"
          text={text}
        />
      </section>
    </div>
  );
};

export default MobileButtonCont;
