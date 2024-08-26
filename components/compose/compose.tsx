import { CodeEditor } from "@/components/code-editor";
import { Actions } from "@/components/compose/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projectAtom } from "@/lib/compose/store";

import { useCompose } from "@/lib/compose/use-compose";
import { useAtom } from "jotai";

export function Compose() {
  const { value, setValue, errorValue } = useCompose();
  const [project, setProject] = useAtom(projectAtom);

  return (
    <div className="flex h-[calc(100dvh-64px)]">
      <div className="flex flex-auto flex-col gap-4 py-4 pl-4">
        <CodeEditor value={value} onChange={setValue} copy />
      </div>
      {errorValue ? (
        <div className="w-96 p-4">
          <CodeEditor value={errorValue} editable={false} />
        </div>
      ) : (
        <ScrollArea className="w-96">
          <div className="space-y-16 p-4">
            <div className="space-y-8">
              <h2 className="text-5xl">Project</h2>
              <div className="space-y-2">
                <Label htmlFor="project-name">Name</Label>
                <Input
                  id="project-name"
                  value={project.name}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </div>
            <Actions />
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
