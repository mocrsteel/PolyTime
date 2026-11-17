/**
 * Renders the business-unit, asset, and project hierarchy.
 * ManagementWorkspace supplies permission-aware actions and owns all mutations.
 */
import {
  IoArchiveOutline,
  IoChevronDownOutline,
  IoFolderOpenOutline,
  IoPencilOutline,
} from "react-icons/io5";
import Button from "@/components/ui/Button";
import { Badge, IconAction } from "./presentation";
import type { Asset, Project, Unit } from "./model";

export default function OrganizationPanel({
  units,
  canManage,
  onAddUnit,
  onAddProject,
  onAddAsset,
  onEditUnit,
  onEditAsset,
  onEditProject,
  onToggleUnitArchived,
  onToggleAssetArchived,
  onToggleProjectArchived,
}: {
  units: Unit[];
  canManage: boolean;
  onAddUnit: () => void;
  onAddProject: () => void;
  onAddAsset: (unitId: string) => void;
  onEditUnit: (unit: Unit) => void;
  onEditAsset: (unit: Unit, asset: Asset) => void;
  onEditProject: (unit: Unit, asset: Asset, project: Project) => void;
  onToggleUnitArchived: (unitId: string) => void;
  onToggleAssetArchived: (unitId: string, assetId: string) => void;
  onToggleProjectArchived: (
    unitId: string,
    assetId: string,
    projectId: string,
  ) => void;
}) {
  return (
    <section
      aria-labelledby="organization-heading"
      className="rounded-lg border border-slate-200 bg-white"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2
            id="organization-heading"
            className="text-base font-bold text-slate-900"
          >
            Organization
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Business units, assets and projects
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canManage && (
            <Button style="secondary" onClick={onAddUnit}>
              Add business unit
            </Button>
          )}
          <Button style="primary" onClick={onAddProject}>
            Add project
          </Button>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {units.map((unit) => (
          <div key={unit.id} className="px-5 py-3">
            <div className="flex items-start gap-2">
              <details open className="group/unit min-w-0 flex-1">
                <summary className="flex cursor-pointer list-none items-center gap-2 py-1 text-sm font-bold text-slate-900 marker:content-none">
                  <IoChevronDownOutline className="h-4 w-4 shrink-0 -rotate-90 text-slate-400 group-open/unit:rotate-0" />
                  <IoFolderOpenOutline className="h-4 w-4 shrink-0 text-teal-700" />
                  <span className="wrap-break-word">{unit.name}</span>
                  {unit.isArchived && <Badge>Archived</Badge>}
                  <span className="ml-auto text-xs font-normal whitespace-nowrap text-slate-500">
                    {unit.assets.length} assets
                  </span>
                </summary>
                <div className="mt-2 ml-2 border-l border-slate-200 pl-3 sm:ml-5 sm:pl-5">
                  {unit.assets.map((asset) => (
                    <div key={asset.id} className="flex items-start gap-2">
                      <details open className="group/asset min-w-0 flex-1">
                        <summary className="flex cursor-pointer list-none items-center gap-2 py-2 text-sm font-semibold text-slate-700 marker:content-none">
                          <IoChevronDownOutline className="h-3.5 w-3.5 shrink-0 -rotate-90 text-slate-400 group-open/asset:rotate-0" />
                          <span className="wrap-break-word">{asset.name}</span>
                          {asset.isArchived && <Badge>Archived</Badge>}
                          <span className="ml-auto text-xs font-normal whitespace-nowrap text-slate-500">
                            {asset.projects.length} projects
                          </span>
                        </summary>
                        <div className="pl-5">
                          {asset.projects.map((project) => (
                            <div
                              key={project.id}
                              className="flex min-h-10 items-center gap-2 border-t border-slate-50 text-sm text-slate-600"
                            >
                              <span className="min-w-0 flex-1 wrap-break-word">
                                {project.name}
                              </span>
                              <Badge>
                                {project.isArchived
                                  ? "Archived"
                                  : project.status}
                              </Badge>
                              {canManage && (
                                <>
                                  <IconAction
                                    label={`Edit ${project.name}`}
                                    onClick={() =>
                                      onEditProject(unit, asset, project)
                                    }
                                  >
                                    <IoPencilOutline />
                                  </IconAction>
                                  <IconAction
                                    label={`${project.isArchived ? "Restore" : "Archive"} ${project.name}`}
                                    onClick={() =>
                                      onToggleProjectArchived(
                                        unit.id,
                                        asset.id,
                                        project.id,
                                      )
                                    }
                                  >
                                    <IoArchiveOutline />
                                  </IconAction>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                      {canManage && (
                        <div className="flex shrink-0">
                          <IconAction
                            label={`Edit ${asset.name}`}
                            onClick={() => onEditAsset(unit, asset)}
                          >
                            <IoPencilOutline />
                          </IconAction>
                          <IconAction
                            label={`${asset.isArchived ? "Restore" : "Archive"} ${asset.name}`}
                            onClick={() =>
                              onToggleAssetArchived(unit.id, asset.id)
                            }
                          >
                            <IoArchiveOutline />
                          </IconAction>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
              {canManage && (
                <div className="flex shrink-0">
                  <IconAction
                    label={`Edit ${unit.name} business unit`}
                    onClick={() => onEditUnit(unit)}
                  >
                    <IoPencilOutline />
                  </IconAction>
                  <IconAction
                    label={`${unit.isArchived ? "Restore" : "Archive"} ${unit.name} business unit`}
                    onClick={() => onToggleUnitArchived(unit.id)}
                  >
                    <IoArchiveOutline />
                  </IconAction>
                  <Button
                    style="secondary"
                    size="custom"
                    className="px-2 py-1.5"
                    onClick={() => onAddAsset(unit.id)}
                  >
                    Add asset
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}