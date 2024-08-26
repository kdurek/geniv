import type { DockerService } from "@/lib/compose/types";
import { atomWithStorage } from "jotai/utils";

export const composeAtom = atomWithStorage<string>("compose-value", "");

export interface ProjectAtom {
  name: string;
  domain: string;
}

export const projectAtom = atomWithStorage<ProjectAtom>("compose-project", {
  name: "",
  domain: "",
});
