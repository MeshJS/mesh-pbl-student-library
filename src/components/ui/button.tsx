import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export default function Button(props: Props) {
  const styles = [];

  if (props.className) {
    styles.push(props.className);
  } else {
    styles.push(
      "inline-flex w-full cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto outline-none ring-1 ring-inset ring-gray-300"
    );
    if (props.color == "white") {
      styles.push("bg-white text-gray-900 hover:bg-gray-50");
    } else if (props.color == "red") {
      styles.push("bg-red-600 text-white hover:bg-red-500");
    } else if (props.color == "green") {
      styles.push("bg-green-600 text-white hover:bg-green-500");
    } else if (props.color == "orange") {
      styles.push("bg-orange-600 text-white hover:bg-orange-500");
    } else {
      styles.push("bg-indigo-600 text-white hover:bg-indigo-500");
    }
  }

  return (
    <button {...props} className={clsx([styles])}>
      {props.children}
    </button>
  );
}
