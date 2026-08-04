"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcons, iconMap } from "@/components/Icons";

// import { Re } from "react-icons/io5";

export type NavButtonProps = {
  title: string;
  icon: AppIcons;
  badge: string | null;
  href: string;
};

export default function NavButton({
  title,
  icon,
  badge,
  href,
}: NavButtonProps) {
  const currentPath = usePathname();
  const isActive =
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  // const activeDetail = active
  //   ? "before:absolute before:w-1 before:h-[24px] before:bg-teal-400 before:left-4 before:rounded-full"
  //   : "";
  // const activeClass = active
  //   ? "text-white bg-white/10"
  //   : "text-gray-400 hover:text-white hover:bg-white/10";
  // const defaultClass = "rounded-lg text-md py-3 px-4 flex gap-3 decoration-none items-center"
  // className={defaultClass + ' ' + activeClass + ' ' + activeDetail}>
  return (
    <Link
      data-active={isActive}
      href={href}
      className="text-md relative flex flex-col items-center gap-2 rounded-md px-4 py-3 transition-all hover:bg-white/10 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:before:absolute data-[active=true]:before:top-1/2 data-[active=true]:before:left-0 data-[active=true]:before:h-[24px] data-[active=true]:before:w-1 data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-full data-[active=true]:before:bg-teal-500/70 lg:flex-row lg:gap-3"
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative">{iconMap({ icon: icon })}</span>
      {title === "Management" && badge === "Manager" && (
        <span className="absolute left-4 flex h-2 w-2 translate-x-3 -translate-y-1 rounded-full bg-teal-500 ring-2 ring-slate-900 drop-shadow-sm lg:hidden" />
      )}
      <span className="hidden lg:flex">{title}</span>
      {badge && (
        <span
          data-active={isActive}
          className="data-[active=true] data-[active=false] mt-2 hidden w-fit rounded bg-teal-400/10 bg-teal-600/30 px-1.5 py-1 text-[9px] tracking-widest text-teal-200 uppercase drop-shadow-sm lg:mt-0 lg:flex"
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
