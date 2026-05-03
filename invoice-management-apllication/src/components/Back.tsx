import { RiArrowDropLeftLine } from "react-icons/ri";
import { useDetailStore } from "../redux/DetailReduce";
import { useNavigate } from "react-router";

const Back = () => {
  const set = useDetailStore((state) => state.set);
  const navigate = useNavigate();
  return (
    <section
      onClick={() => {
        set({ id: "" });
        navigate("/");
      }}
      role="button"
      className=" cursor-pointer flex justify-start gap-2 mb-10 items-center font-bold text-[15px] text-800 dark:text-1300 min-[1024px]:hover:text-700 "
    >
      <span className=" text-100 text-[20px]">
        <RiArrowDropLeftLine />
      </span>
      <p>Go back</p>
    </section>
  );
};

export default Back;
