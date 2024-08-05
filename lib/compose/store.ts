import type { DockerService } from "@/lib/compose/types";
import { atomWithStorage } from "jotai/utils";

export const restartPolicies = [
  "no",
  "always",
  "on-failure",
  "unless-stopped",
] as const;

export interface ProjectAtom {
  name: string;
  domain?: string;
  restart?: DockerService["restart"];
}

export const composeAtom = atomWithStorage<string>("compose-value", "");

export const projectAtom = atomWithStorage<ProjectAtom>("compose-project", {
  name: "",
  domain: "",
  restart: "",
});

export type ServicesAtom = Record<
  string,
  {
    expose?: boolean;
    exposePort?: string;
  }
>;

export const servicesAtom = atomWithStorage<ServicesAtom>(
  "compose-services",
  {},
);
