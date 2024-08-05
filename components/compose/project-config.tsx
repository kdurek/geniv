import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectAtom, restartPolicies } from "@/lib/compose/store";
import { useAtom } from "jotai";

export function ProjectConfig() {
  const [project, setProject] = useAtom(projectAtom);

  const handleProjectChange = (key: string, value?: unknown) =>
    setProject((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex w-full flex-col gap-4">
      Project
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Name
        </label>
        <Input
          id="name"
          value={project.name}
          onChange={(e) => handleProjectChange("name", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="domain"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Domain
        </label>
        <Input
          id="domain"
          value={project.domain}
          onChange={(e) => handleProjectChange("domain", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="restart"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Restart
        </label>
        <Select
          value={project.restart}
          onValueChange={(value) => handleProjectChange("restart", value)}
        >
          <SelectTrigger id="restart" className="w-[180px]">
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
    </div>
  );
}
