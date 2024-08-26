import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DockerCompose } from "@/lib/compose/types";
import { useCompose } from "@/lib/compose/use-compose";
import { useState } from "react";
import { parse, stringify } from "yaml";

const restartPolicies = [
  "no",
  "always",
  "on-failure",
  "unless-stopped",
] as const;

export function Restart() {
  const { setValue } = useCompose();
  const [restartValue, setRestartValue] = useState("");

  function setRestart(value: string) {
    setValue((prevValue) => {
      const parsedValue: DockerCompose = parse(prevValue);
      const updatedValue = { ...parsedValue };
      for (const service of Object.values(updatedValue.services)) {
        if (!value) {
          service.restart = undefined;
        } else {
          service.restart = value;
        }
        setRestartValue(value);
      }
      const stringifiedValue = stringify(updatedValue);
      return stringifiedValue;
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="actions-restart">Restart Policy</Label>
      <Select value={restartValue} onValueChange={setRestart}>
        <SelectTrigger id="actions-restart" className="flex-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {restartPolicies.map((policy) => (
            <SelectItem key={policy} value={policy}>
              {policy}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
