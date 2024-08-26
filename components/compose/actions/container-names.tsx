import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { projectAtom } from "@/lib/compose/store";
import type { DockerCompose } from "@/lib/compose/types";
import { useCompose } from "@/lib/compose/use-compose";
import { useAtomValue } from "jotai";
import { parse, stringify } from "yaml";

export function ContainerNames() {
  const { setValue } = useCompose();
  const project = useAtomValue(projectAtom);

  function setContainerNames(values: { projectName: string }) {
    setValue((prevValue) => {
      const parsedValue: DockerCompose = parse(prevValue);
      const updatedValue = { ...parsedValue };

      for (const [name, service] of Object.entries(updatedValue.services)) {
        if (values.projectName === name) {
          service.container_name = name;
        } else {
          service.container_name = `${values.projectName}-${name}`;
        }
      }

      const stringifiedValue = stringify(updatedValue);
      return stringifiedValue;
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="actions-container-names">Container Names</Label>
      <Button
        id="actions-container-names"
        variant="outline"
        className="w-full"
        onClick={() => setContainerNames({ projectName: project.name })}
      >
        Set
      </Button>
    </div>
  );
}
