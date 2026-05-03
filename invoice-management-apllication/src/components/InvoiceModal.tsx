import { IoMdTrash } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import MobileButtonCont from "./MobileButtonCont";
import useStatic from "../hooks/useStatic";
import useInvoiceForm from "../hooks/useForm";
import type { InputFieldProps, InvoiceModalProps } from "../types/Types";

const InvoiceModal = ({ id, status }: InvoiceModalProps) => {
  const {
    onValid,
    controlledItems,
    register,
    errors,
    handleSubmit,
    append,
    remove,
    items,
  } = useInvoiceForm(id!, status!);

  useStatic(true);

  return (
    <div className=" [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] box-border scroll-smooth overflow-y-scroll bg-1300 dark:bg-1200 w-170 max-[764px]:w-150 max-[640px]:w-full h-screen max-[640px]:px-6 max-[640px]:rounded-none max-[640px]:pt-10 px-12 pt-16 pb-30 rounded-tr-4xl rounded-br-4xl text-100 [&_h2]:text-[15px] [&_h2]:mb-6 [&_h2]:font-medium">
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <fieldset>
          <>
            {id && (
              <legend className="text-800 dark:text-1300 text-[24px] mb-10 font-bold">
                Edit<span className="text-700">#</span>
                {id}
              </legend>
            )}

            {!id && (
              <legend className="text-800 dark:text-1300 text-[24px] mb-10 font-bold">
                New Invoice
              </legend>
            )}
          </>
          <section className="mb-12 ">
            <h2>Bill Form</h2>

            <InputField
              id="fromStreetAddress"
              name="Street Address"
              register={register}
              error={errors.fromStreetAddress!}
            />

            <div className=" w-full flex justify-between items-center gap-5 max-[480px]:gap-0 max-[480px]:[&_div]:w-[46%] max-[480px]:[&_div]:last:w-full max-[480px]:flex-wrap">
              <InputField
                id="fromCity"
                name="City"
                register={register}
                error={errors.fromCity!}
              />
              <InputField
                id="fromPostCode"
                name="Post Code"
                register={register}
                error={errors.fromPostCode!}
              />
              <InputField
                id="fromCountry"
                name="Country"
                register={register}
                error={errors.fromCountry!}
              />
            </div>
          </section>

          <section className="mb-12">
            <h2>Bill To</h2>

            <InputField
              id="clientName"
              name="Client's Name"
              register={register}
              error={errors.clientName!}
            />
            <InputField
              id="clientEmail"
              name="Client's Email"
              register={register}
              error={errors.clientEmail!}
            />
            <InputField
              id="toStreetAddress"
              name="Street Address"
              register={register}
              error={errors.toStreetAddress!}
            />

            <div className=" flex justify-between items-center gap-5 max-[480px]:gap-0 max-[480px]:[&_div]:w-[46%] max-[480px]:[&_div]:last:w-full max-[480px]:flex-wrap">
              <InputField
                id="toCity"
                name="City"
                register={register}
                error={errors.toCity!}
              />
              <InputField
                id="toPostCode"
                name="Post Code"
                register={register}
                error={errors.toPostCode!}
              />
              <InputField
                id="toCountry"
                name="Country"
                register={register}
                error={errors.toCountry!}
              />
            </div>
          </section>

          <section className="mb-12">
            <div className=" flex justify-center items-center gap-5">
              <div className="w-[50%]">
                <InputField
                  type="date"
                  id="invoiceDate"
                  name="Invoice date"
                  register={register}
                  error={errors.invoiceDate!}
                />
              </div>

              <div className="w-[50%] flex flex-col mb-6">
                <label
                  htmlFor="paymentTerms"
                  className="text-[13px] text-700 dark:text-500 mb-2"
                >
                  Payment Terms
                </label>
                <select
                  {...register("paymentTerms")}
                  className="min-[1024px]:hover:border-100 min-[1024px]:hover:border cursor-pointer font-bold dark:text-1300 h-10 border-500 dark:border-400 border text-[15px] dark:bg-400 text-800 px-2 py-2 rounded-md"
                >
                  <option value="Net 1 Day">Net 1 Day</option>
                  <option value="Net 7 Days">Net 7 Days</option>
                  <option value="Net 14 Days">Net 14 Days</option>
                  <option value="Net 30 Days">Net 30 Days</option>
                </select>
              </div>
            </div>

            <InputField
              id="projectDescription"
              name="Project Description"
              register={register}
              error={errors.projectDescription!}
            />
          </section>

          <section className="mb-6">
            <h3 className="text-[#777F98] text-[18px] mb-5">Item List</h3>

            <section className="max-[480px]:hidden gap-4 flex justify-center items-center w-full text-[13px] text-700 mb-3">
              <p className="w-[55%]">Item Name</p>
              <p className="w-[10%]">QTY.</p>
              <p className="w-[15%]">Price</p>
              <p className="w-[30%]">Total</p>
            </section>

            {controlledItems.map((i, index) => (
              <div
                key={i.id}
                className=" max-[480px]:mb-3 flex justify-between items-start gap-4 text-[13px] max-[480px]:flex-wrap max-[480px]:gap-0 text-700 dark:text-500 font-medium [&_label]:min-[480px]:hidden [&_input]:max-[480px]:mt-2"
              >
                <section className="w-[55%] max-[480px]:w-full">
                  <label
                    htmlFor="name"
                    className={`dark:text-500 text-[13px] text-700 mr-auto`}
                  >
                    Item Name
                  </label>
                  <input
                    {...register(`items.${index}.name` as const, {
                      value: i.name,
                    })}
                    className={` ${errors.items?.[index]?.name ? "border-900" : "border-500 dark:border-400"} mb-3 min-[1024px]:hover:border-100 min-[1024px]:hover:border border font-bold text-[15px] text-800 dark:text-1300 dark:bg-400 px-2 py-2 rounded-sm w-full`}
                  ></input>
                </section>

                <section className="w-[10%]  max-[480px]:w-[15%] ">
                  <label
                    htmlFor="quantity"
                    className={`dark:text-500 text-[13px] text-700 mr-auto`}
                  >
                    QTY.
                  </label>
                  <input
                    key={i.id}
                    type="number"
                    {...register(`items.${index}.quantity` as const, {
                      valueAsNumber: true,
                    })}
                    className={` ${errors.items?.[index]?.quantity ? "border-900" : "border-500 dark:border-400"} mb-3 min-[1024px]:hover:border-100 min-[1024px]:hover:border border font-bold text-[15px] text-800 dark:text-1300 dark:bg-400 px-2 py-2 rounded-sm w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0`}
                  ></input>
                </section>

                <section className="w-[15%]  max-[480px]:w-[30%] ">
                  <label
                    htmlFor="price"
                    className={`dark:text-500 text-[13px] text-700 mr-auto`}
                  >
                    Price
                  </label>
                  <input
                    key={i.id}
                    type="number"
                    {...register(`items.${index}.price` as const, {
                      valueAsNumber: true,
                      value: i.quantity,
                    })}
                    className={` ${errors.items?.[index]?.price ? "border-900" : "border-500 dark:border-400"} mb-3 min-[1024px]:hover:border-100 min-[1024px]:hover:border border font-bold text-[15px] text-800 dark:text-1300 dark:bg-400 px-2 py-2 rounded-sm w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0`}
                  ></input>
                </section>

                <section className="w-[30%] max-[480px]:w-[35%]">
                  <p className="min-[480px]:hidden">Total</p>
                  <div
                    key={i.id}
                    className=" max-[480px]:mt-2 mb-3 flex justify-start items-center text-[15px] font-bold text-600 dark:text-500 h-10"
                  >
                    <input hidden {...register(`items.${index}.id` as const)} />
                    <p className=" mr-auto">
                      £{" "}
                      {Number.isNaN(i.price) || Number.isNaN(i.quantity)
                        ? 0
                        : i.price * i.quantity}
                    </p>
                    <span
                      onClick={() => remove(index)}
                      role="button"
                      className="cursor-pointer max-[480px]:ml-auto"
                    >
                      <IoMdTrash />
                    </span>
                  </div>
                </section>
              </div>
            ))}
          </section>

          <div className="min-[1024px]:left-25 right-0 left-0 z-10 fixed bottom-0">
            <MobileButtonCont id={id} />
          </div>
        </fieldset>
      </form>

      <div>
        <button
          onClick={() => append(items)}
          className="w-full cursor-pointer min-[1024px]:hover:bg-500 min-[1024px]:dark:hover:bg-400/30 flex gap-2 justify-center items-center py-4 text-700 dark:text-500 text-[15px] font-bold bg-700/10  rounded-4xl"
        >
          <span>
            <AiOutlinePlus />
          </span>
          <p>Add New Item</p>
        </button>
      </div>

      <div className=" text-900 text-[10px] mb-30 font-semibold">
        <p className="mt-12 mb-1">- All fields must be added</p>
        <p className="mb-14">- An item must be added</p>
      </div>
    </div>
  );
};

export default InvoiceModal;

const InputField = ({
  register,
  id,
  name,
  mBottom,
  type,
  error,
}: InputFieldProps) => {
  const mb = mBottom === "" ? mBottom : "24px";
  return (
    <div
      style={{ marginBottom: mb }}
      className="flex w-full flex-col gap-2 max-[480px]:[&_div]:w-full"
    >
      <div className=" flex justify-center items-center w-full ">
        <label
          htmlFor={id}
          className={`${error ? "text-900" : "text-700 dark:text-500"} text-[13px] text-700 mr-auto`}
        >
          {name}
        </label>
        {error && <p className="text-900 text-[10px]">{error.message}</p>}
      </div>

      <input
        type={type}
        {...register(id)}
        className={` ${error ? "border-900" : "border-500 dark:border-400"} min-[1024px]:hover:border-100 min-[1024px]:hover:border  border font-bold text-[15px] text-800 dark:text-1300 dark:bg-400 px-2 py-2 rounded-sm w-full bg-transparent`}
      ></input>
    </div>
  );
};
