import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { DockerCompose } from "@/lib/compose/types";
import { useCompose } from "@/lib/compose/use-compose";
import { parse, stringify } from "yaml";

export function BindVolumes() {
  const { setValue } = useCompose();

  function bindVolumes() {
    setValue((prevValue) => {
      const parsedValue: DockerCompose = parse(prevValue);
      const updatedValue = { ...parsedValue };

      for (const service of Object.values(updatedValue.services)) {
        if (service.volumes?.length) {
          service.volumes = service.volumes.map((volume) => `./${volume}`);
        }
      }
      updatedValue.volumes = undefined;

      const stringifiedValue = stringify(updatedValue);
      return stringifiedValue;
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="actions-bind-volumes">Bind Volumes</Label>
      <Button
        id="actions-bind-volumes"
        variant="outline"
        className="w-full"
        onClick={bindVolumes}
      >
        Bind
      </Button>
    </div>
  );
}
