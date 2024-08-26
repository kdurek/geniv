import { Compose } from "@/components/compose/compose";
import { ProjectConfig } from "@/components/compose/project-config";
import { useCompose } from "@/lib/compose/use-compose";

export default function Page() {
  const { isConfigured } = useCompose();

  if (!isConfigured) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        Configure your project first
        <ProjectConfig />
      </div>
    );
  }

  return <Compose />;
}
