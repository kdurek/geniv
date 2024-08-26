import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type ProjectAtom, projectAtom } from "@/lib/compose/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Settings2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const projectFormSchema = z.object({
  name: z.string(),
  domain: z.string(),
});

export function ProjectConfig() {
  const [project, setProject] = useAtom(projectAtom);
  const form = useForm<ProjectAtom>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project.name ?? "",
      domain: project.domain ?? "",
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        domain: project.domain,
      });
    }
  }, [project, form.reset]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2Icon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(setProject)} className="grid gap-4">
            <FormField
              name="name"
              label="Name"
              className="grid grid-cols-3 items-center gap-4"
              render={({ field }) => (
                <Input className="col-span-2" {...field} />
              )}
            />
            <FormField
              name="domain"
              label="Domain"
              className="grid grid-cols-3 items-center gap-4"
              render={({ field }) => (
                <Input className="col-span-2" {...field} />
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
