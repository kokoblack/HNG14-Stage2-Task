import Back from "../components/Back";
import Button from "../components/Button";
import DeleteModal from "../components/DeleteModal";
import InvoiceModal from "../components/InvoiceModal";
import { useDetailStore } from "../redux/DetailReduce";
import { useInvoiceStore } from "../redux/ItemRedux";
import { useClickActionStore } from "../redux/ClickActionRedux";
import {
  calculateDueDate,
  formatDate,
  formatDecimal,
} from "../utils/formatDate";
import usePop from "../hooks/usePop";
import type { DetailButtonProps } from "../types/Types";

const DetailPage = () => {
  const invoices = useInvoiceStore((state) => state.invoices);
  const id = useDetailStore((state) => state.id);
  const invoiceIndex = invoices.findIndex((i) => i.id === id);
  const invoiceData = invoices[invoiceIndex];

  if (!invoices) return <p>Loading...</p>;

  const { toggleDeleteModal, toggleInvoiceModal } = useClickActionStore();

  usePop();

  return (
    <div className=" w-full box-border max-[640px]:pb-30 relative pb-20 min-[1024px]:pl-25 bg-1100 dark:bg-1200">
      <div className="w-185 max-[1024px]:w-160 max-[764px]:w-full mx-auto pt-12 max-[764px]:px-10 max-[480px]:px-6">
        <section>
          <Back />
        </section>

        <section className="py-6 flex justify-center items-center px-8 max-[480px]:px-6 bg-1300 dark:bg-300 rounded-lg">
          <section className=" flex justify-center items-center gap-6 mr-auto max-[640px]:m-0 max-[640px]:w-full">
            <p className=" text-[13px] max-[480px]:text-[12px] text-[#858BB2] dark:text-500 font-medium max-[640px]:mr-auto">
              Status
            </p>
            <p
              className={`${invoiceData?.status === "Pending" && "text-[#FF8F00] bg-[#FF8F00]/10 "} ${invoiceData?.status === "Draft" && "text-[#373B53] bg-[#373B53]/10 dark:text-500 dark:bg-500/10 "} ${invoiceData?.status === "Paid" && "text-[#33D69F] bg-[#33D69F]/10 "} text=[15px] max-[480px]:text-[14px] font-bold rounded-md px-3 py-2`}
            >
              • {invoiceData?.status}
            </p>
          </section>

          <section className=" font-bold text-[15px] flex gap-2 max-[640px]:hidden">
            <DetailButton status={invoiceData?.status} id={invoiceData?.id} />
          </section>
        </section>

        <section className=" max-[480px]:px-6 max-[480px]:py-6 px-12 py-10 mt-10 bg-1300 dark:bg-300 rounded-lg max-[480px]:[&_strong,time]:text-[14px] max-[480px]:[&_p]:text-[12px] [&_strong,time]:text-[15px], [&_strong,time]:text-800 dark:[&_strong,time]:text-1300 [&_strong,time]:font-bold [&_p]:text-[13px] [&_p]:text-700 dark:[&_p]:text-500  [&_p]:font-medium">
          <section className="flex items-start justify-between mb-4 max-[480px]:flex-col max-[480px]:gap-y-6">
            <section>
              <strong>
                <span className=" text-600 dark:text-700">#</span>
                {invoiceData?.id}
              </strong>
              <p>{invoiceData?.projectDescription}</p>
            </section>

            <section className="">
              <p>{invoiceData?.fromStreetAddress}</p>
              <p>{invoiceData?.fromCity} </p>
              <p>{invoiceData?.fromPostCode}</p>
              <p>{invoiceData?.fromCountry}</p>
            </section>
          </section>

          <section className="flex justify-start items-start  gap-x-16 max-[640px]:gap-x-8 max-[640px]:justify-between max-[730px]:flex-wrap max-[480px]:mt-6">
            <section>
              <p className=" mb-2">Invoice Date</p>
              <time>
                {invoiceData && formatDate(new Date(invoiceData.invoiceDate))}
              </time>

              <p className=" mb-2 mt-6">Payment Due</p>
              <time>
                {invoiceData &&
                  calculateDueDate(
                    invoiceData?.invoiceDate,
                    invoiceData?.paymentTerms,
                  )}
              </time>
            </section>

            <section>
              <p className=" mb-2">Bill To</p>

              <strong>{invoiceData?.clientName}</strong>

              <p>{invoiceData?.toStreetAddress}</p>
              <p>{invoiceData?.toCity} </p>
              <p>{invoiceData?.toPostCode}</p>
              <p>{invoiceData?.toCountry}</p>
            </section>

            <section className="max-[480px]:w-full">
              <p className=" mb-2 max-[720px]:mt-6">Sent to</p>
              <strong>{invoiceData?.clientEmail}</strong>
            </section>
          </section>

          <section className=" bg-1100 dark:bg-400 mt-10 rounded-md ">
            <table className=" w-full text-left hidden min-[640px]:block">
              <thead>
                <tr className="text-[13px] [&_th]:py-8 [&_th]:px-6 text-700 dark:text-500 font-medium">
                  <th className="w-[35%] text-left">Item Name</th>
                  <th className="w-[5%] text-center">QTY.</th>
                  <th className="w-[25%] text-center">Price</th>
                  <th className="w-[35%] text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {invoiceData?.items.map((i, index) => (
                  <tr key={index} className="text-[15px] font-bold [&_td]:pb-4">
                    <td className="w-[35%] text-800 dark:text-1300 text-left pl-6">
                      {i.name}
                    </td>
                    <td className="w-[5%] text-700 dark:text-500 text-center">
                      {i.quantity}
                    </td>
                    <td className="w-[25%] text-700 dark:text-500 text-center">
                      £ {formatDecimal(i.price)}
                    </td>
                    <td className="w-[35%] text-800 dark:text-1300 text-right pr-6">
                      £ {formatDecimal(i.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {invoiceData?.items.map((i, index) => (
              <section
                key={index}
                className="hidden max-[640px]:flex px-6 pt-6 justify-between items-center [&>p]:text-[15px] [&>p]:text-800 dark:[&>p]:text-1300  [&>p]:font-bold max-[480px]:[&>p]:text-[14px] max-[480px]:px-4 max-[480px]:pt-4"
              >
                <div className="[&>p]:text-[15px] [&>p]:text-800 dark:[&>p]:text-1300 [&>p]:font-bold [&>p]:last:text-700 dark:[&>p]:last:text-500 max-[480px]:[&>p]:text-[14px]">
                  <p className="text-800">{i.name}</p>
                  <p className="text-700">
                    {i.quantity} x £ {formatDecimal(i.price)}
                  </p>
                </div>

                <p>£ {formatDecimal(i.total)}</p>
              </section>
            ))}

            <div className=" bg-[#373B53] dark:bg-black [&>p]:text-1300 [&>p]:last:font-bold [&>p]:last:text-[24px] max-[480px]:[&>p]:last:text-[20px] mt-4 px-6 py-6 max-[480px]:px-4 flex justify-between items-center rounded-bl-md rounded-br-md">
              <p>Amount Due</p>
              <p>£ {formatDecimal(invoiceData?.total)}</p>
            </div>
          </section>
        </section>

        {/* <div className="w-full h-50 bg-red-600"></div> */}

        <section className="min-[640px]:hidden fixed w-full bottom-0 left-0 max-[764px]:w-150 max-[640px]:w-full max-[640px]:rounded-none shadow-edit max-[640px]:px-10 max-[480px]:px-6 max-[640px]:py-4 max-[480px]:gap-1 px-10 py-6 gap-4 bg-1300 dark:bg-1200 rounded-br-4xl flex justify-center items-center">
          <DetailButton status={invoiceData?.status} id={invoiceData?.id} />
        </section>

        {toggleDeleteModal && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <DeleteModal id={invoiceData?.id} open={true} />
          </section>
        )}
      </div>

      {toggleInvoiceModal && (
        <section className="fixed top-0 left-25 z-10 bg-black/60 w-full box-border max-[1024px]:left-0 max-[1024px]:top-25 max-[1024px]:w-full max-[480px]:top-20">
          <InvoiceModal
            id={invoiceData?.id.toUpperCase()}
            status={invoiceData?.status}
          />
        </section>
      )}
    </div>
  );
};

export default DetailPage;

const DetailButton = ({ status, id }: DetailButtonProps) => {
  const set = useClickActionStore((state) => state.set);
  const updateStatus = useInvoiceStore((state) => state.updateStatus);
  return (
    <>
      <section
        onClick={() => set({ toggleInvoiceModal: true })}
        className="max-[640px]:mr-auto"
      >
        <Button
          status={status}
          color="#7E88C3"
          backgroundColor="#F9FAFE"
          hover="#DFE3FA"
          text="Edit"
        />
      </section>
      <section onClick={() => set({ toggleDeleteModal: true })}>
        <Button
          color="#FFFFFF"
          backgroundColor="#EC5757"
          hover="#FF9797"
          text="Delete"
        />
      </section>
      <section
        onClick={() => {
          updateStatus(id);
        }}
      >
        <Button
          color="#FFFFFF"
          backgroundColor="#7C5DFA"
          hover="#9277FF"
          text="Mark as Paid"
        />
      </section>
    </>
  );
};
