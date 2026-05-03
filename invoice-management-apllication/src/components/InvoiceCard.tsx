import { RiArrowDropRightLine } from "react-icons/ri";
import { useDetailStore } from "../redux/DetailReduce";
import { useNavigate } from "react-router";
import { calculateDueDate, formatDate, formatDecimal } from "../utils/formatDate";

type InvoiceCardProps = {
  id: string;
  due: string;
  name: string;
  total: number;
  status: string;
  date: string
};

const InvoiceCard = ({ id, due, date, name, total, status }: InvoiceCardProps) => {
  const set = useDetailStore((state) => state.set);
  const navigate = useNavigate();

  return (
    <section
      onClick={() => {
        set({ id });
        navigate("detail");
      }}
      className=" cursor-pointer w-185 mb-4 shadow max-[1024px]:w-150 max-[764px]:w-full mx-auto py-4 px-4 rounded-lg flex justify-between items-center gap-3 max-[764px]:gap-0.5 bg-white dark:bg-300 max-[640px]:items-start min-[1024px]:hover:border-100 min-[1024px]:hover:border"
    >
      <div className="flex justify-between items-center gap-8 max-[1024px]:gap-6 max-[640px]:flex-col w-[60%] max-[700px]:w-[55%] max-[640px]:items-start max-[700px]:gap-2">
        <p className="text-800 dark:text-1300 font-bold text-[15px] max-[640px]:mb-4 basis-[20%] max-[700px]:basis-[23%]">
          <span className="text-700 ">#</span>
          {id}
        </p>
        <time className="text-600 dark:text-500 font-medium text-[13px] basis-[40%] max-[700px]:basis-[38%]">
          <span className="text-[#858BB2] mr-1">Due </span>
          {calculateDueDate(date, due)}
        </time>
        <p className="text-[#858BB2] dark:text-1300 font-medium text-[13px] basis-[40%] max-[700px]:basis-[35%]">{name}</p>
      </div>

      <div className="flex justify-between items-center gap-10 max-[1024px]:gap-4 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-2">
        <p className="text-800 dark:text-1300 font-bold text-[15px] max-[640px]:mb-4">
          £ {formatDecimal(total)}
        </p>
        <div className=" flex justify-center items-center gap-2">
          <div className={`${status === "Pending" && "text-[#FF8F00] bg-[#FF8F00]/10 "} ${status === "Draft" && "text-[#373B53] bg-[#373B53]/10 dark:text-500 dark:bg-500/10 "} ${status === "Paid" && "text-[#33D69F] bg-[#33D69F]/10 "} rounded-md w-22 flex items-center justify-center`}>
            <p className={` py-2 font-bold text-[15px]`}>
            • {status}
          </p>
          </div>
          
          <span className="text-100 text-[24px] max-[640px]:hidden">
            <RiArrowDropRightLine />
          </span>
        </div>
      </div>
    </section>
  );
};

export default InvoiceCard;
