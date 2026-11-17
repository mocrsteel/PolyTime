/**
 * Shared add/edit dialog for organization, people, groups, and time entries.
 * The coordinator resolves selected records and applies the submitted FormData.
 */
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import {
  Button as AriaButton,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import Button from "@/components/ui/Button";
import { fieldClass, labelClass } from "./model";
import { ManagementSelect } from "./presentation";
import type {
  Asset,
  Entry,
  Group,
  ManagementEditorState,
  ManagementRole,
  Person,
  Project,
  Unit,
} from "./model";

export default function ManagementEditor({
  editor,
  role,
  units,
  groups,
  projects,
  selectedUnit,
  selectedAsset,
  selectedProject,
  selectedPerson,
  selectedGroup,
  selectedEntry,
  onSave,
  onDismiss,
}: {
  editor: ManagementEditorState | null;
  role: ManagementRole;
  units: Unit[];
  groups: Group[];
  projects: Project[];
  selectedUnit?: Unit;
  selectedAsset?: Asset;
  selectedProject?: Project;
  selectedPerson?: Person;
  selectedGroup?: Group;
  selectedEntry?: Entry;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
  onDismiss: () => void;
}) {
  return (
    <ModalOverlay
      isOpen={editor !== null}
      onOpenChange={(open) => {
        if (!open) onDismiss();
      }}
      isDismissable
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-sm"
    >
      <Modal className="w-full max-w-md outline-none">
        <Dialog
          aria-label={
            editor ? `${editor.id ? "Edit" : "Add"} ${editor.kind}` : "Edit"
          }
          className="max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl outline-none"
        >
          {editor && (
            <Form onSubmit={onSave} className="grid gap-4">
              <div>
                <p className="text-xs font-semibold text-teal-700 uppercase">
                  {editor.kind === "entry" ? "Time entry" : "Management"}
                </p>
                <h2 className="mt-1 text-xl font-bold capitalize">
                  {editor.id ? "Edit" : "Add"}{" "}
                  {editor.kind === "unit"
                    ? "business unit"
                    : editor.kind === "person"
                      ? "user"
                      : editor.kind}
                </h2>
              </div>
              {editor.kind === "project" && !editor.id && (
                <ManagementSelect
                  label="Asset"
                  name="assetId"
                  isRequired
                  placeholder="Select an asset"
                  options={units
                    .filter((unit) => !unit.isArchived)
                    .flatMap((unit) =>
                      unit.assets
                        .filter((asset) => !asset.isArchived)
                        .map((asset) => ({
                          value: `${unit.id}:${asset.id}`,
                          label: `${unit.name} / ${asset.name}`,
                        })),
                    )}
                />
              )}
              {editor.kind !== "entry" && (
                <TextField
                  name="name"
                  isRequired
                  defaultValue={
                    selectedProject?.name ??
                    (editor.kind === "asset"
                      ? selectedAsset?.name
                      : undefined) ??
                    (editor.kind === "unit"
                      ? selectedUnit?.name
                      : undefined) ??
                    selectedPerson?.name ??
                    selectedGroup?.name ??
                    ""
                  }
                  className={labelClass}
                >
                  <Label>Name</Label>
                  <Input className={fieldClass} />
                </TextField>
              )}
              {editor.kind === "person" && (
                <>
                  <TextField
                    name="email"
                    isRequired
                    defaultValue={selectedPerson?.email ?? ""}
                    className={labelClass}
                  >
                    <Label>Email</Label>
                    <Input type="email" className={fieldClass} />
                  </TextField>
                  <ManagementSelect
                    label="Group"
                    name="groupId"
                    isRequired
                    placeholder="Select a group"
                    defaultSelectedKey={selectedPerson?.groupId ?? null}
                    options={groups
                      .filter(
                        (group) =>
                          !group.isArchived ||
                          group.id === selectedPerson?.groupId,
                      )
                      .map((group) => ({
                        value: group.id,
                        label: `${group.name}${group.isArchived ? " (archived)" : ""}`,
                      }))}
                  />
                  {role === "Admin" && (
                    <ManagementSelect
                      label="Role"
                      name="role"
                      defaultSelectedKey={selectedPerson?.role ?? "User"}
                      options={[
                        { value: "User", label: "User" },
                        { value: "Manager", label: "Manager" },
                        { value: "Admin", label: "Admin" },
                      ]}
                    />
                  )}
                </>
              )}
              {editor.kind !== "person" && editor.kind !== "entry" && (
                <TextField
                  name="description"
                  defaultValue={
                    selectedProject?.description ??
                    (editor.kind === "asset"
                      ? selectedAsset?.description
                      : undefined) ??
                    (editor.kind === "unit"
                      ? selectedUnit?.description
                      : undefined) ??
                    selectedGroup?.description ??
                    ""
                  }
                  className={labelClass}
                >
                  <Label>Description</Label>
                  <Input className={fieldClass} />
                </TextField>
              )}
              {editor.kind === "project" && editor.id && (
                <ManagementSelect
                  label="Status"
                  name="status"
                  defaultSelectedKey={selectedProject?.status}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Inactive", label: "Inactive" },
                    { value: "Completed", label: "Completed" },
                    { value: "Archived", label: "Archived" },
                  ]}
                />
              )}
              {editor.kind === "entry" && selectedEntry && (
                <>
                  <TextField
                    name="date"
                    isRequired
                    defaultValue={selectedEntry.date}
                    className={labelClass}
                  >
                    <Label>Date</Label>
                    <Input type="date" className={fieldClass} />
                  </TextField>
                  <ManagementSelect
                    label="Project"
                    name="projectId"
                    defaultSelectedKey={selectedEntry.projectId}
                    options={projects.map((project) => ({
                      value: project.id,
                      label: project.name,
                    }))}
                  />
                  <TextField
                    name="hours"
                    isRequired
                    defaultValue={String(selectedEntry.hours)}
                    className={labelClass}
                  >
                    <Label>Hours</Label>
                    <Input
                      type="number"
                      min={0.01}
                      max={24}
                      step={0.01}
                      className={fieldClass}
                    />
                  </TextField>
                  <TextField
                    name="description"
                    defaultValue={selectedEntry.description}
                    className={labelClass}
                  >
                    <Label>Description</Label>
                    <Input className={fieldClass} />
                  </TextField>
                </>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <Button style="secondary" onClick={onDismiss}>
                  Cancel
                </Button>
                <AriaButton
                  type="submit"
                  className="rounded-md bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800"
                >
                  Save
                </AriaButton>
              </div>
            </Form>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}