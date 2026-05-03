import type React from "react";
import { useClickActionStore } from "../redux/ClickActionRedux";

type StatusToggleProps = {
  setSelected: React.Dispatch<React.SetStateAction<[] | string[]>>;
};

const StatusToggle = ({ setSelected }: StatusToggleProps) => {
  const set = useClickActionStore((state) => state.set);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelected((prev) => [...prev, value]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== value));
    }
  };
  return (
    <section
      onMouseLeave={() => set({ toggleStatusModal: false })}
      className="w-40 max-[480px]:w-30 absolute rounded-lg max-[640px]:right-25 max-[480px]:right-22 right-36 top-10 z-10 px-5 py-6 bg-white dark:bg-300 shadow-lg"
    >
      <StatusItem label="Draft" handleChange={handleChange} />
      <StatusItem label="Pending" handleChange={handleChange} />
      <StatusItem label="Paid" handleChange={handleChange} />
    </section>
  );
};

export default StatusToggle;

type StatusItemProps = {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StatusItem = ({ label, handleChange }: StatusItemProps) => {
  return (
    <section className=" text-800 dark:text-1300 text-[15px] max-[480px]:text-[13px] font-bold">
      <input
        onChange={handleChange}
        value={label}
        type="checkbox"
        className="scale-120 max-[480px]:scale-110 cursor-pointer bg-1100 border-0 hover:border-100 hover:border"
      />
      <label className="ml-3">{label}</label>
    </section>
  );
};
