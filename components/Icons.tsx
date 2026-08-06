/**
 * Default imports for icons. To ensure consistent icon usage throughout the app.
 */
import { JSX } from "react";

import {
  FiGrid as Grid,
  FiClock as Clock,
  FiBarChart2 as BarChart,
  FiSettings as Settings,
  FiSearch as Search,
  FiBell as Bell,
  FiChevronRight as ChevronRight,
  FiChevronLeft as ChevronLeft,
  FiPlus as Plus,
  FiMinus as Minus,
  FiCopy as Copy,
  FiTrash2 as Trash,
  FiCheck as Check,
  FiArrowLeft as ArrowLeft,
  FiUsers as Users,
  FiHome as Home,
  // FiMessageSquare as Message,
  FiAlertTriangle as Alert,
  FiGitBranch as Branch,
} from "react-icons/fi";

import {
  LuDot as Dot,
  LuPencil as Pen,
  LuMessageSquareText as Message,
} from "react-icons/lu";
import { ComponentProps } from "react";
import { IconBaseProps } from "react-icons";

export type AppIcons =
  | "grid"
  | "clock"
  | "barChart"
  | "settings"
  | "search"
  | "bell"
  | "chevronRight"
  | "chevronLeft"
  | "plus"
  | "minus"
  | "copy"
  | "trash"
  | "check"
  | "arrowLeft"
  | "users"
  | "home"
  | "alert"
  | "branch"
  | "dot"
  | "pen"
  | "message";

type IconProps = IconBaseProps & {
  icon: AppIcons;
};

export function iconMap({
  icon: AppIcon,
  ...props
}: IconProps): React.ReactNode {
  switch (AppIcon) {
    case "grid":
      return <Grid {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "barChart":
      return <BarChart {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "search":
      return <Search {...props} />;
    case "bell":
      return <Bell {...props} />;
    case "chevronRight":
      return <ChevronRight {...props} />;
    case "chevronLeft":
      return <ChevronLeft {...props} />;
    case "plus":
      return <Plus {...props} />;
    case "minus":
      return <Minus {...props} />;
    case "copy":
      return <Copy {...props} />;
    case "trash":
      return <Trash {...props} />;
    case "check":
      return <Check {...props} />;
    case "arrowLeft":
      return <ArrowLeft {...props} />;
    case "users":
      return <Users {...props} />;
    case "home":
      return <Home {...props} />;
    case "alert":
      return <Alert {...props} />;
    case "branch":
      return <Branch {...props} />;
    case "dot":
      return <Dot {...props} />;
    case "pen":
      return <Pen {...props} />;
    case "message":
      return <Message {...props} />;
  }
}
