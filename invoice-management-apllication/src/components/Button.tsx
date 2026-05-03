import { useState } from "react";

type ButtonProps = {
  color: string;
  backgroundColor: string;
  text: string;
  hover: string;
  type?: boolean;
  status?: string
};

const Button = ({
  color,
  backgroundColor,
  text,
  hover,
  status,
  type = false,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...(!type && { type: "button" })}
      {...(text === "Save as Draft" && { id: "draft" })}
      {...(status === "Paid" && text === "Edit" && {disabled: true}) }
      style={{ color, backgroundColor: isHovered ? hover : backgroundColor }}
      className={` min-[1024px]:hover:opacity-75 cursor-pointer text-[15px] font-bold text-700 bg-1400 rounded-4xl px-6 py-3.5 max-[480px]:text-[12px] max-[480px]:px-4 max-[480px]:py-3`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
};

export default Button;
