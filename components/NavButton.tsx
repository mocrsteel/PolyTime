"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
// import { Re } from "react-icons/io5";

export type NavButtonProps = {
  title: string;
  icon: React.ReactElement,
  badge: string | null;
  href: string;
}

export default function NavButton({title, icon, badge, href}: NavButtonProps) {
  const currentPath = usePathname();
  const isActive = href === "/"
    ? currentPath === "/"
    : currentPath.startsWith(href);

  // const activeDetail = active
  //   ? "before:absolute before:w-1 before:h-[24px] before:bg-teal-400 before:left-4 before:rounded-full"
  //   : "";
  // const activeClass = active
  //   ? "text-white bg-white/10"
  //   : "text-gray-400 hover:text-white hover:bg-white/10";
  // const defaultClass = "rounded-lg text-md py-3 px-4 flex gap-3 decoration-none items-center"
  // className={defaultClass + ' ' + activeClass + ' ' + activeDetail}>
  return (
    <Link data-active={isActive} href={href} className="
        relative text-md py-3 px-4 flex flex-col gap-2 lg:flex-row lg:gap-3 items-center rounded-md
        hover:text-white hover:bg-white/10
        transition-all

        data-[active=true]:text-white
        data-[active=true]:bg-white/10
        data-[active=true]:before:absolute
        data-[active=true]:before:bg-teal-500/70
        data-[active=true]:before:w-1
        data-[active=true]:before:h-[24px]
        data-[active=true]:before:left-0
        data-[active=true]:before:rounded-full
        data-[active=true]:before:top-1/2
        data-[active=true]:before:-translate-y-1/2
      "
      aria-current={isActive ? "page" : undefined}
      >
      <span className="relative">{icon}</span>
      {title==="Management" && badge==="Manager" &&
        <span className="flex lg:hidden absolute bg-teal-500 w-2 h-2 left-4 rounded-full -translate-y-1 translate-x-3 drop-shadow-sm ring-2 ring-slate-900"/>
      }
      <span className="hidden lg:flex">{title}</span>
      {badge &&
        <span
          data-active={isActive}
          className="
            hidden w-fit lg:flex text-[9px] uppercase tracking-widest text-teal-200 rounded px-1.5 mt-2 lg:mt-0 py-1 drop-shadow-sm
            data-[active=true] bg-teal-600/30
            data-[active=false] bg-teal-400/10
          ">{badge}</span>
      }
    </Link>
  )
}
