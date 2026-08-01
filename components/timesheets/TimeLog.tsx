import {Form} from "react-aria-components/Form";
import { Autocomplete, useFilter } from "react-aria-components/Autocomplete";
import { Select, Label, SelectValue, Button, Popover } from "react-aria-components/Select"
import { IoChevronDown } from "react-icons/io5";
import { SearchField } from "react-aria-components/SearchField";

export default function TimeLog() {
  const {contains} = useFilter({sensitivity: "base"})

  return (
    <div>
      <span>New time log</span>
      <h1>Add time</h1>
      <Form>
          <Select>
            <Label>Project</Label>
            <Button>
              <SelectValue />
              <IoChevronDown />
            </Button>
            <Popover>
              <Autocomplete filter={contains}>
                <SearchField aria-label="Search tags" autoFocus />
              </Autocomplete>
            </Popover>
          </Select>
      </Form>
    </div>
  )
}