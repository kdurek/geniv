import { CodeEditor } from "@/components/code-editor";
import { ProjectConfig } from "@/components/compose/project-config";
import { ServicesConfig } from "@/components/compose/services-config";
import { useCompose } from "@/lib/compose/use-compose";

export function Compose() {
  const { value, setValue, cleanedValue } = useCompose();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-auto gap-4">
        <CodeEditor
          wrapperClassName="h-[800px]"
          value={value}
          onChange={setValue}
        />
        <CodeEditor
          wrapperClassName="h-[800px]"
          editable={false}
          value={cleanedValue}
        />
      </div>
      <div className="flex gap-4">
        <ProjectConfig />
        <ServicesConfig />
      </div>
    </div>
  );
}
