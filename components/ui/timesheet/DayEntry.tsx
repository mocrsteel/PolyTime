import {Message, Dot, Plus, Minus, Trash} from "@/components/Icons";
import Button from "@/components/ui/Button";

export type DayEntryProps = {
  readonly id: string;
  readonly businessUnit: string;
  readonly asset: string;
  readonly project: string;
  date: Date;
  hours: number;
  comments: string[];
}

export default function DayEntry({id, businessUnit, asset, project, date, hours, comments}: DayEntryProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <span id={`${id}-marker`} />
      <div className="flex flex-col gap-1">
        <div
          className="
            relative

            before:absolute
            before:w-1.5
            before:h-full
            before:bg-polytime-coral
            before:-left-6
            before:rounded-full
          "
        >
          <h1 className="font-bold text-xs">{project}</h1>
          <p className="text-polytime-muted text-[10px] mb-1">{asset}</p>
        </div>
        <div className="flex flex-col gap-1">
          {comments.map((comment, index) => (
            <div key={index} className="flex flex-row items-center content-center text-polytime-muted font-medium text-[9px] bg-polytime-muted/10 rounded-md py-1 px-2">
            <span>
              <Message className="text-polytime-teal-dark h-3 w-3 mr-2"/>
            </span>
            <p>
              {comment}
            </p>

            </div>
          ))}
          <button className="flex flex-row gap-1 items-center text-[10px] text-polytime-teal-dark font-semibold"><Message />Edit comments</button>
        </div>
      </div>
      <div className="text-polytime-muted text-[10px] flex flex-row items-center content-center flex-nowrap">
        <Dot className="h-6 w-6 text-polytime-muted/50"/> {businessUnit}
      </div>
      <div>
        <form className="flex flex-row items-center gap-1">
          <Button tiny onClick={() => {}}><Minus className="h-3 w-3 text-polytime-muted"/></Button>
          <input type="number" value={hours} step={0.01} className="w-12 text-center text-sm -webkit-appearance-none bg-transparent"/>
          <Button tiny onClick={() => {}}><Plus className="h-3 w-3 text-polytime-muted"/></Button>
          <Button tiny onClick={() => {}} className="hover:text-red-600"><Trash className="h-3 w-3 text-polytime-muted"/></Button>
        </form>
      </div>
    </div>
  )
}
