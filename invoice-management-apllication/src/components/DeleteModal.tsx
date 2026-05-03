import Button from "./Button";
import { useClickActionStore } from "../redux/ClickActionRedux";
import { useInvoiceStore } from "../redux/ItemRedux";
import { useNavigate } from "react-router";
import useStatic from "../hooks/useStatic";

type DeleteModalProps = {
  open: boolean;
  id: string;
};

const DeleteModal = ({ open, id }: DeleteModalProps) => {
  const set = useClickActionStore((state) => state.set);
  const deleteInvoice = useInvoiceStore((state) => state.deleteInvoice);
  const navigate = useNavigate();

  useStatic(open);
  return (
    <div className="w-120 bg-1300 dark:bg-300 px-12 py-10 rounded-lg max-[640px]:w-100 max-[480px]:w-[80%] max-[480px]:px-6 max-[480px]:py-6">
      <h2 className="text-800 dark:text-1300 font-bold text-[24px] max-[480px]:text-[20px]">
        Confirm Deletion
      </h2>
      <p className="text-600 dark:text-500 font-medium text-[13px] my-5 max-[480px]:text-[12px]">
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>

      <div className=" flex gap-1 justify-end">
        <section
          onClick={() => {
            set({ toggleDeleteModal: false });
          }}
        >
          <Button
            hover="#DFE3FA"
            color="#7E88C3"
            backgroundColor="#F9FAFE"
            text="Cancel"
          />
        </section>
        <section
          onClick={() => {
            deleteInvoice(id);
            navigate("/");
            set({ toggleDeleteModal: false });
          }}
        >
          <Button
            hover="#FF9797"
            color="#FFFFFF"
            backgroundColor="#EC5757"
            text="Delete"
          />
        </section>
      </div>
    </div>
  );
};

export default DeleteModal;
