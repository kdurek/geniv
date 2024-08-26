import { composeAtom, projectAtom } from "@/lib/compose/store";
import type { DockerCompose } from "@/lib/compose/types";
import { useAtom, useAtomValue } from "jotai";
import { parse } from "yaml";

export function useCompose() {
  const [value, setValue] = useAtom(composeAtom);
  const project = useAtomValue(projectAtom);

  let objValue = {} as DockerCompose;
  let errorValue = "";

  try {
    objValue = parse(value);
  } catch (error) {
    errorValue = (error as Error)?.message;
  }

  const isConfigured = !!project.name && !!project.domain;

  return { value, setValue, errorValue, objValue, isConfigured };
}
