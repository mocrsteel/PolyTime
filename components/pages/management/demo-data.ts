/**
 * In-memory prototype fixtures used by ManagementWorkspace.
 * They intentionally remain local state only; no fixture is persisted.
 */
import type { Entry, Group, Person, Unit } from "./model";

export const initialUnits: Unit[] = [
  {
    id: "operations",
    name: "Operations",
    description: "",
    isArchived: false,
    assets: [
      {
        id: "north",
        name: "North facility",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "maintenance",
            name: "Preventive maintenance",
            description: "",
            status: "Active",
            isArchived: false,
          },
          {
            id: "upgrade",
            name: "Equipment upgrade",
            description: "",
            status: "Active",
            isArchived: false,
          },
        ],
      },
      {
        id: "south",
        name: "South facility",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "planning",
            name: "Capacity planning",
            description: "",
            status: "Completed",
            isArchived: false,
          },
        ],
      },
    ],
  },
  {
    id: "digital",
    name: "Digital",
    description: "",
    isArchived: false,
    assets: [
      {
        id: "platform",
        name: "Customer platform",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "redesign",
            name: "Website redesign",
            description: "",
            status: "Active",
            isArchived: false,
          },
        ],
      },
    ],
  },
];

export const initialGroups: Group[] = [
  {
    id: "delivery",
    name: "Delivery",
    description: "Project delivery team",
    isArchived: false,
  },
  {
    id: "operations",
    name: "Operations",
    description: "Operations team",
    isArchived: false,
  },
];

export const initialPeople: Person[] = [
  {
    id: "alex",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "User",
    groupId: "delivery",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
  {
    id: "maya",
    name: "Maya Singh",
    email: "maya@example.com",
    role: "Manager",
    groupId: "operations",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
  {
    id: "jonas",
    name: "Jonas Lee",
    email: "jonas@example.com",
    role: "User",
    groupId: "delivery",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
];

export const initialEntries: Entry[] = [
  {
    id: "entry1",
    userId: "alex",
    projectId: "maintenance",
    date: "2026-10-28",
    hours: 7.5,
    description: "Maintenance review",
    status: "Open",
  },
  {
    id: "entry2",
    userId: "jonas",
    projectId: "redesign",
    date: "2026-10-29",
    hours: 8,
    description: "Design review",
    status: "Open",
  },
  {
    id: "entry3",
    userId: "alex",
    projectId: "maintenance",
    date: "2020-01-15",
    hours: 4,
    description: "Equipment inspection",
    status: "Open",
  },
  {
    id: "entry4",
    userId: "jonas",
    projectId: "redesign",
    date: "2020-01-16",
    hours: 5,
    description: "Project planning",
    status: "Open",
  },
];