import dynamic from "next/dynamic";

export const Header = dynamic(() => import("./Header"));
export const nextDynamic = (file: string) => dynamic(() => import(`./${file}`));
