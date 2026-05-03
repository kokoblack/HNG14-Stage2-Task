import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import logo from "../assets/full-logo.png";
import avatar from "../assets/avatar.png";
import { useClickActionStore } from "../redux/ClickActionRedux";

const SideNav = () => {
  const { set, toggleTheme } = useClickActionStore();
  return (
    <section className="bg-300 z-10 justify-center items-center float-left left-0 min-[1024px]:min-h-screen fixed w-25 rounded-tr-[20px] rounded-br-[20px] max-[1024px]:rounded-none max-[1024px]:h-fit max-[1024px]:float-none max-[1024px]:w-full max-[1024px]:flex max-[1024px]:sticky max-[1024px]:top-0">
      <figure className=" mr-auto rounded-tr-lg rounded-br-lg w-25 max-[480px]:w-20 mb-auto">
        <img src={logo} alt="logo" />
      </figure>

      <div className="flex justify-center items-center w-full flex-col pb-8 place-self-center absolute bottom-0 max-[1024px]:static max-[1024px]:flex-row max-[1024px]:pb-0 max-[1024px]:w-fit max-[1024px]:pr-8 max-[480px]:pr-3">
        <div className="text-700 text-2xl max-[480px]:text-xl min-[1024px]:hover:text-500">
          {toggleTheme === "" && (
            <span
              role="button"
              onClick={() => set({ toggleTheme: "dark" })}
              className="cursor-pointer"
            >
              <IoMoon />
            </span>
          )}
          {toggleTheme === "dark" && (
            <span
              role="button"
              onClick={() => set({ toggleTheme: "" })}
              className="cursor-pointer"
            >
              <IoSunny />
            </span>
          )}
        </div>

        <div className=" border-x border-[#494E6E] max-[480px]:mx-5 mx-10 h-24 max-[480px]:h-20 min-[1024px]:hidden "></div>
        <hr className="border border-[#494E6E] my-8 w-full max-[1024px]:hidden" />

        <figure className="rounded-4xl max-[480px]:w-8">
          <img src={avatar} alt="avatar" />
        </figure>
      </div>
    </section>
  );
};

export default SideNav;
