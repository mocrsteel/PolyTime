import { Button, TextField, Input, Label } from "react-aria-components";
import { iconMap } from "@/components/Icons";

const user = {
  name: "Alex Turner",
  role: "Operations Manager",
};

export default function TopBar() {
  return (
    <div className="mr-0 flex w-full flex-row px-4 py-2">
      <TextField className="text-polytime-muted flex content-center items-center gap-4">
        <Label className="inline">
          <p className="hidden">Search</p>
          {iconMap({ icon: "search", className: "h-5 w-5" })}
        </Label>
        <Input placeholder="Search projects, assets, ..." />
      </TextField>
      <div id="profile" className="center ml-auto flex flex-row gap-4">
        <Button
          id="notifications"
          className="flex cursor-pointer content-center items-center"
        >
          {iconMap({ icon: "bell", className: "h-5 w-5" })}
        </Button>
        <div id="separator" className="h-full w-0.5 bg-gray-100"></div>
        <Button
          id="user-button"
          className="flex cursor-pointer flex-row items-center justify-center gap-2"
        >
          <div
            id="user-icon"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-xs font-extrabold tracking-widest text-orange-900"
          >
            {user.name.split(" ")[0].charAt(0).toUpperCase() +
              user.name.split(" ")[1].charAt(0).toUpperCase()}
          </div>
          <div
            id="user-description"
            className="flex flex-col items-start justify-center"
          >
            <strong className="text-xs">{user.name}</strong>
            <div className="text-polytime-muted text-xs">{user.role}</div>
          </div>
          <div id="expand-button" className="flex items-center justify-center">
            {iconMap({ icon: "chevronDown" })}
          </div>
        </Button>
      </div>
    </div>
  );
}
