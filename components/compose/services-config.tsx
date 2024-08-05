import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { servicesAtom } from "@/lib/compose/store";
import { useCompose } from "@/lib/compose/use-compose";
import { useAtom } from "jotai";

export function ServicesConfig() {
  const [services, setServices] = useAtom(servicesAtom);
  const { objValue } = useCompose();

  if (!objValue?.services) {
    return null;
  }

  const handleServicesChange = (
    service: string,
    key: string,
    value?: unknown
  ) =>
    setServices((prev) => ({
      ...prev,
      [service]: { ...prev[service], [key]: value },
    }));

  return (
    <div className="flex w-full flex-col gap-4">
      Services
      {Object.keys(objValue.services).map((service) => (
        <div
          key={service}
          className="flex flex-col gap-4 rounded-md border p-4"
        >
          {service}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="expose"
              checked={services?.[service]?.expose}
              onCheckedChange={(value) =>
                handleServicesChange(service, "expose", value)
              }
            />
            <label
              htmlFor="expose"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Expose
            </label>
          </div>

          {services?.[service]?.expose && (
            <div className="space-y-2">
              <label
                htmlFor="exposePort"
                className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Expose Port
              </label>
              <Input
                id="exposePort"
                type="number"
                value={services?.[service]?.exposePort}
                onChange={(e) =>
                  handleServicesChange(service, "exposePort", e.target.value)
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
