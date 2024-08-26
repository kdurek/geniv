import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { DockerCompose } from "@/lib/compose/types";
import { useCompose } from "@/lib/compose/use-compose";
import { parse, stringify } from "yaml";

export function SortKeys() {
  const { setValue } = useCompose();

  function sortKeys(values: { order: string[] }) {
    setValue((prevValue) => {
      const parsedValue: DockerCompose = parse(prevValue);
      const updatedValue = { ...parsedValue };

      for (const serviceName in updatedValue.services) {
        if (
          Object.prototype.hasOwnProperty.call(
            updatedValue.services,
            serviceName
          )
        ) {
          const service = updatedValue.services[serviceName];
          const sorted: { [key: string]: unknown } = {};

          // Sort the keys based on the order
          for (const key of values.order) {
            if (key in service) {
              sorted[key] = service[key];
              delete service[key];
            }
          }

          // Add the remaining keys
          for (const key in service) {
            if (Object.prototype.hasOwnProperty.call(service, key)) {
              sorted[key] = service[key];
            }
          }

          updatedValue.services[serviceName] = sorted;
        }
      }

      const stringifiedValue = stringify(updatedValue);
      return stringifiedValue;
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="actions-sort-keys">Sort Keys</Label>
      <Button
        id="actions-sort-keys"
        variant="outline"
        className="w-full"
        onClick={() =>
          sortKeys({
            order: [
              "container_name",
              "image",
              "restart",
              "command",
              "user",
              "depends_on",
              "ports",
              "volumes",
              "networks",
              "environment",
              "labels",
              "logging",
            ],
          })
        }
      >
        Sort
      </Button>
    </div>
  );
}
