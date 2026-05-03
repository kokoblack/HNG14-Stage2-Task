import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import InvoiceCard from "../components/InvoiceCard";
import StatusToggle from "../components/StatusToggle";
import image from "../assets/Email campaign_Flatline.png";
import InvoiceModal from "../components/InvoiceModal";
import { useClickActionStore } from "../redux/ClickActionRedux";
import { useInvoiceStore } from "../redux/ItemRedux";
import { useState } from "react";
import usePop from "../hooks/usePop";

const Home = () => {
  const { set, toggleStatusModal, toggleInvoiceModal } = useClickActionStore();

  const invoices = useInvoiceStore((state) => state.invoices);

  const [selected, setSelected] = useState<string[]>([]);
  const filterByStatus = invoices.filter((item) =>
    selected.includes(item.status),
  );

  usePop();

  return (
    <div className=" max-[1024px]:pb-25 max-[640px]:pb-70 max-[376px]:pb-120 w-full h-screen max-[764px]:px-12 max-[640px]:px-6 min-h-screen bg-1100 dark:bg-1200">
      <section className="w-185 max-[1024px]:w-150 max-[764px]:w-full max-[480px]:pt-10 pt-20 mx-auto mb-16 flex justify-center items-center max-[480px]">
        <section className="mr-auto">
          <h3 className=" text-800 dark:text-1300 font-bold text-[36px] max-[480px]:text-[26px] max-[480px]:leading-6">
            Invoices
          </h3>
          <p className="text-600 dark:text-500 font-medium text-[13px] min-[640px]:block hidden">
            There are {invoices.length} total invoice(s)
          </p>
          <p className="text-600 dark:text-500 font-medium text-[13px] max-[640px]:block hidden max-[480px]:text-[12px]">
            {invoices.length} Invoice(s)
          </p>
        </section>

        <section className=" relative flex justify-center items-center gap-3 ">
          <div
            onClick={() => set({ toggleStatusModal: !toggleStatusModal })}
            role="button"
            className=" cursor-pointer flex justify-center items-center gap-1.5"
          >
            <p className=" text-800 dark:text-1300 text-[15px] font-bold ">
              Filter <span className="max-[640px]:hidden">by status</span>
            </p>
            <span className=" text-100">
              <MdKeyboardArrowDown />
            </span>
          </div>

          <button
            onClick={() => set({ toggleInvoiceModal: true })}
            className=" cursor-pointer rounded-3xl bg-100 flex justify-center items-center gap-3 px-2.5 py-2 font-bold max-[480px]:px-2 max-[480px]:py-1.5 min-[1024px]:hover:bg-200"
          >
            <span className=" text-100 bg-white rounded-4xl p-2 max-[480px]:text-[12px]">
              <AiOutlinePlus />
            </span>
            <p className=" text-1100 text-[15px] max-[480px]:text-[12px] ">
              New <span className="max-[640px]:hidden">Invoice</span>
            </p>
          </button>

          {toggleStatusModal && <StatusToggle setSelected={setSelected} />}
        </section>
      </section>

      {selected.length < 1 &&
        invoices.map((item, index) => (
          <section key={index}>
            <InvoiceCard
              id={item.id}
              name={item.clientName}
              date={item.invoiceDate}
              due={item.paymentTerms}
              total={item.total}
              status={item.status}
            />
          </section>
        ))}

      {selected &&
        filterByStatus.map((item, index) => (
          <section key={index}>
            <InvoiceCard
              id={item.id}
              name={item.clientName}
              date={item.invoiceDate}
              due={item.paymentTerms}
              total={item.total}
              status={item.status}
            />
          </section>
        ))}

      {toggleInvoiceModal && (
        <section className="fixed top-0 left-25 z-10 bg-black/60 w-[96.1%] box-border max-[1024px]:left-0 max-[1024px]:top-25 max-[1024px]:w-full max-[480px]:top-20">
          <InvoiceModal />
        </section>
      )}

      {!invoices.length && (
        <section className=" text-center flex flex-col items-center justify-center w-60 h-[50vh] mx-auto">
          <figure>
            <img src={image} alt="Email campaign Flatline" />
          </figure>

          <h2 className=" text-800 dark:text-1300 text-[24px] font-bold mb-4 mt-10">
            There is nothing here
          </h2>
          <p className="text-600 dark:text-500 text-[13px] font-medium">
            Create an invoice by clicking the New{" "}
            <span className=" min-[640px]:inline hidden">invoice</span> button
            and get started
          </p>
        </section>
      )}
    </div>
  );
};

export default Home;
