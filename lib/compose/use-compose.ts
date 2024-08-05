import { modifyDockerCompose } from "@/lib/compose/cleanup";
import { composeAtom, projectAtom, servicesAtom } from "@/lib/compose/store";
import type { DockerCompose } from "@/lib/compose/types";
import { useAtom, useAtomValue } from "jotai";
import { parse, stringify } from "yaml";

export function useCompose() {
  const [value, setValue] = useAtom(composeAtom);
  const project = useAtomValue(projectAtom);
  const [services, setServices] = useAtom(servicesAtom);

  let yamlObj: DockerCompose;
  let cleanedValue = value;
  let objValue = {} as DockerCompose;

  try {
    yamlObj = parse(value);

    if (Object.keys(services).length) {
      for (const serviceName in services) {
        if (
          Object.prototype.hasOwnProperty.call(services, serviceName) &&
          !Object.prototype.hasOwnProperty.call(yamlObj.services, serviceName)
        ) {
          setServices((prev) => {
            const copy = { ...prev };
            delete copy[serviceName];
            return copy;
          });
        }
      }
    }

    modifyDockerCompose(yamlObj, { project, services });

    objValue = yamlObj;
    cleanedValue = stringify(yamlObj);

    if (!value) {
      cleanedValue = "Paste docker-compose.yml to the left editor";
    }

    if (!project.name) {
      cleanedValue = "Project name is required";
    }
  } catch (error) {
    cleanedValue = (error as Error)?.message;
  }

  return { value, setValue, cleanedValue, objValue };
}
