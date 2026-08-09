"use client";

import {
  Button,
  TextField,
  Input,
  Label,
  MenuTrigger,
  Popover,
  Menu,
  MenuItem,
  Separator,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { iconMap } from "@/components/Icons";

const user = {
  name: "Alex Turner",
  role: "Operations Manager",
};

type TopBarProps = {
  notificationsEnabled?: boolean;
  notificationsCount?: number;
};

const notificationsVariant = tv({
  base: "relative content-center items-center",
  variants: {
    notificationsEnabled: {
      true: "flex",
      false: "hidden",
    },
    hasNotifications: {
      false: "before:hidden after:hidden",
      true:
        "after-ring-2 after:absolute after:top-0 after:right-0 after:z-10 after:h-2 after:w-2 after:translate-y-2 after:rounded-full after:bg-teal-500 after:ring-2 after:ring-white " +
        "before:no-motion-reduce:hidden before:absolute before:top-0 before:right-0 before:z-11 before:h-2 before:w-2 before:translate-y-2 before:animate-ping before:rounded-full before:bg-transparent before:shadow-xl before:ring-2 before:ring-teal-200/50",
    },
  },
});

const menuItemVariant = tv({
  base: "focus:ring-polytime-teal focus:ring-offset-polytime-background flex flex-row flex-nowrap items-center gap-2 rounded-lg border-none px-3 py-2 text-sm hover:outline-none focus:outline-none",
  variants: {
    isLogout: {
      true: "text-red-700 hover:bg-red-700 hover:text-white",
      false: "text-polytime-ink hover:bg-polytime-line",
    },
  },
});

export default function TopBar({
  notificationsEnabled,
  notificationsCount,
}: TopBarProps) {
  return (
    <div className="border-polytime-line sticky top-0 left-0 z-20 mr-0 flex w-full flex-row border-b bg-white px-4 py-2">
      <TextField className="text-polytime-muted flex w-full content-center items-center gap-4">
        <Label className="inline">
          <p className="hidden">Search</p>
          {iconMap({ icon: "search", className: "h-5 w-5" })}
        </Label>
        <Input
          placeholder="Search projects, assets, ..."
          className="placeholder:text-polytime-muted focus:text-polytime-ink w-full outline-none"
        />
      </TextField>
      <div
        id="profile"
        className="center ml-auto flex flex-row gap-4 md:min-w-60"
      >
        <Button
          id="notifications"
          aria-label="Notifications"
          name="notifications"
          className={notificationsVariant({
            notificationsEnabled: notificationsEnabled,
            hasNotifications: notificationsCount
              ? notificationsCount > 0
              : false,
          })}
        >
          {iconMap({ icon: "bell", className: "h-5 w-5" })}
        </Button>
        <div id="separator" className="h-full w-[1px] bg-gray-200"></div>
        <MenuTrigger>
          <Button
            aria-label="User Menu"
            id="user-button"
            name="user-button"
            className="flex cursor-pointer flex-row items-center justify-center gap-2 focus:ring-0 focus:outline-none"
          >
            <div
              id="user-icon"
              className="flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-orange-100 text-xs font-extrabold tracking-widest text-orange-900"
            >
              {user.name.split(" ")[0].charAt(0).toUpperCase() +
                user.name.split(" ")[1].charAt(0).toUpperCase()}
            </div>
            <div
              id="user-description"
              className="hidden flex-col items-start justify-center md:flex"
            >
              <strong className="text-xs">{user.name}</strong>
              <div className="text-polytime-muted text-xs">{user.role}</div>
            </div>
            <div
              id="expand-button"
              className="flex items-center justify-center"
            >
              {iconMap({ icon: "chevronDown" })}
            </div>
          </Button>
          <Popover className="border-polytime-line rounded-lg border-1 bg-white p-2 shadow-lg transition-all focus:outline-none">
            <Menu className="flex flex-col gap-2 focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none">
              <MenuItem id="profile-link" className={menuItemVariant()}>
                Profile
              </MenuItem>
              <MenuItem id="settings-link" className={menuItemVariant()}>
                Settings
              </MenuItem>
              <Separator className="bg-polytime-line h-[1px]" />
              <MenuItem
                id="logout-link"
                className={menuItemVariant({ isLogout: true })}
              >
                {" "}
                {iconMap({ icon: "logout" })}
                Log Out
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    </div>
  );
}
