import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectAtom } from "@/lib/compose/store";
import type { DockerCompose } from "@/lib/compose/types";
import { useCompose } from "@/lib/compose/use-compose";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { parse, stringify } from "yaml";

export function Expose() {
  const { setValue, objValue } = useCompose();
  const project = useAtomValue(projectAtom);
  const [exposeValue, setExposeValue] = useState("");
  const [exposePortValue, setExposePortValue] = useState("");

  const servicesList = objValue?.services
    ? Object.keys(objValue?.services)
    : [];

  function handleExpose(values: {
    service: string;
    port: string;
    projectName: string;
    domain: string;
  }) {
    setValue((prevValue) => {
      if (!values.service || !values.port || !values.domain) prevValue;

      const parsedValue: DockerCompose = parse(prevValue);
      const updatedValue = { ...parsedValue };

      for (const [name, service] of Object.entries(updatedValue.services)) {
        if (name === values.service) {
          service.labels = [
            ...(service.labels || []),
            "traefik.enable=true",
            `traefik.http.routers.${values.projectName}.rule=Host(\`${values.projectName}.${values.domain}\`)`,
            `traefik.http.services.${values.projectName}.loadbalancer.server.port=${values.port}`,
          ];
          service.networks = [...(service.networks || []), "proxy"];
          service.ports = undefined;
        }
        // If the project has more than one service, add network to each service
        if (Object.keys(updatedValue.services).length > 1) {
          service.networks = [...(service.networks || []), values.projectName];
        }
      }

      // If the project has more than one service, add the project network
      if (Object.keys(updatedValue.services).length > 1) {
        updatedValue.networks = {
          ...updatedValue.networks,
          [values.projectName]: {
            driver: "bridge",
          },
        };
      }

      updatedValue.networks = {
        ...updatedValue.networks,
        proxy: {
          external: true,
        },
      };

      setExposeValue("");
      setExposePortValue("");

      const stringifiedValue = stringify(updatedValue);
      return stringifiedValue;
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="actions-expose">Expose Service</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="actions-expose" variant="outline" className="w-full">
            Expose
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="actions-expose-service">Service</Label>
              <Select value={exposeValue} onValueChange={setExposeValue}>
                <SelectTrigger
                  id="actions-expose-service"
                  className="col-span-2"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {servicesList.map((policy) => (
                    <SelectItem key={policy} value={policy}>
                      {policy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="actions-expose-port">Port</Label>
              <Input
                id="actions-expose-port"
                className="col-span-2"
                value={exposePortValue}
                onChange={(e) => setExposePortValue(e.target.value)}
              />
            </div>
            <Button
              onClick={() =>
                handleExpose({
                  service: exposeValue,
                  port: exposePortValue,
                  projectName: project.name,
                  domain: project.domain,
                })
              }
            >
              Expose
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
