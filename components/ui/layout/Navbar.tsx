import Image from "next/image";

import NavButton, { NavButtonProps } from "./NavButton";

type NavBarProps = {
  userType: "User" | "Manager";
};

const navigationItems = [
  {
    title: "Overview",
    href: "/",
    badge: null,
    icon: "grid",
  },
  {
    title: "Timesheet",
    icon: "clock",
    badge: null,
    href: "/timesheets",
  },
  {
    title: "Reports",
    icon: "barChart",
    badge: null,
    href: "/reports",
  },
] satisfies NavButtonProps[];

const workSpaceItems = [
  {
    title: "Profile",
    icon: "users",
    badge: null,
    href: "/profile",
  },
  {
    title: "Management",
    icon: "settings",
    badge: null,
    href: "/management",
  },
] satisfies NavButtonProps[];

export default function Navbar({ userType }: NavBarProps) {
  return (
    <aside
      id="navbar"
      className="fixed inset-y-0 left-0 flex w-20 flex-col bg-cyan-950 px-4 py-7 text-white transition-all lg:flex lg:w-64"
    >
      <button className="mx-0 mb-8 flex gap-3 px-2 text-left lg:ml-0">
        <Image
          src="/polytime-logo.svg"
          alt="logo"
          width={36}
          height={36}
          className="h-9 w-auto shrink-0 drop-shadow-sm"
          loading="eager"
        />
        <span className="hidden flex-col lg:flex">
          <span className="text-xl leading-none font-bold tracking-tight">
            PolyTime
          </span>
          <span className="mt-1 text-[9px] font-semibold tracking-wide text-teal-100/80 uppercase">
            Timesheeting
          </span>
        </span>
      </button>
      <nav className="grid gap-1">
        {navigationItems.map(({ title, href, icon, badge }, index) => (
          <NavButton
            key={index}
            title={title}
            icon={icon}
            href={href}
            badge={badge}
          />
        ))}
      </nav>
      <div id="workspace-navbar" className="mt-auto flex flex-col gap-1">
        <div className="hidden px-2 pb-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase lg:flex">
          Workspace
        </div>
        {workSpaceItems.map(({ title, href, icon }, index) => {
          if (title === "Management") {
            return (
              <NavButton
                key={index}
                title={title}
                icon={icon}
                href={href}
                badge={userType}
              />
            );
          } else {
            return (
              <NavButton
                key={index}
                title={title}
                icon={icon}
                href={href}
                badge={null}
              />
            );
          }
        })}
        <p className="mt-4 hidden px-3 text-[9px] text-nowrap text-slate-400 transition-all delay-500 lg:flex">
          © 2026 Yannick Thimmesch
        </p>
      </div>
    </aside>
  );
}
