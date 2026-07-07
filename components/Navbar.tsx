import Image from "next/image";
import {IoGridOutline} from "react-icons/io5";
import {FaRegClock} from "react-icons/fa6";
import {FaRegChartBar} from "react-icons/fa";
import {FaRegUser} from "react-icons/fa";

import {
  FiGrid,
  FiClock,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiBell,
  FiChevronRight,
  FiPlus,
  FiCopy,
  FiTrash2,
  FiCheck,
  FiArrowLeft,
  FiUsers,
  FiHome,
  FiMessageSquare,
  FiAlertTriangle,
  FiGitBranch,} from "react-icons/fi"

import NavButton, {NavButtonProps} from "./NavButton";

type NavBarProps = {
  userType: "User" | "Manager";
}

const navigationItems = [
  {
    title: "Overview",
    href: "/",
    badge: null,
    icon: <FiGrid />
  },
  {
    title: 'Timesheet',
    icon: <FiClock />,
    badge: null,
    href: '/timesheet',
  },
  {
    title: 'Reports',
    icon: <FiBarChart2 />,
    badge: null,
    href: '/reports',
  }
] satisfies NavButtonProps[]


const workSpaceItems = [
  {
    title: 'Profile',
    icon: <FiUsers />,
    badge: null,
    href: '/profile',
  },
  {
    title: 'Management',
    icon: <FiSettings/>,
    badge: null,
    href: '/management',
  }
] satisfies NavButtonProps[]

export default function Navbar({userType}: NavBarProps) {

  return (
    <aside id="navbar"
           className="text-white fixed left-0 inset-y-0 w-20 lg:w-64 bg-cyan-950 flex flex-col px-4 py-7 lg:flex transition-all">
      <button className="mb-8 px-2 flex mx-0 lg:ml-0 gap-3 text-left">
        <Image src="/polytime-logo.svg" alt="logo" width={36} height={36} className="h-9 w-9 shrink-0 drop-shadow-sm"/>
        <span className="hidden lg:flex flex-col">
          <span className="text-xl font-bold tracking-tight leading-none">PolyTime</span>
          <span className="text-[9px] font-semibold uppercase tracking-wide mt-1 text-teal-100/80">Timesheeting</span>
        </span>
      </button>
      <nav className="grid gap-1">
        {navigationItems.map(({title, href, icon, badge}, index) => (
          <NavButton key={index} title={title} icon={icon} href={href} badge={badge}/>
        ))}
      </nav>
      <div id="workspace-navbar" className="mt-auto flex flex-col gap-1">
        <div className="hidden lg:flex px-2 pb-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Workspace</div>
        {workSpaceItems.map(({title, href, icon, badge}, index) => {
          if (title === 'Management') {
            return <NavButton key={index} title={title} icon={icon} href={href} badge={userType}/>
          } else {
            return <NavButton key={index} title={title} icon={icon} href={href} badge={null}/>
          }
        })}
        <p className="hidden text-nowrap transition-all delay-500 lg:flex mt-4 px-3 text-[9px] text-slate-400">© 2026 Yannick Thimmesch</p>
      </div>
    </aside>
  )
}
