import { Expose } from "@/components/compose/actions/expose";
import { ContainerNames } from "@/components/compose/actions/container-names";
import { Restart } from "@/components/compose/actions/restart";
import { SortKeys } from "@/components/compose/actions/sort-keys";
import { BindVolumes } from "@/components/compose/actions/bind-volumes";

export function Actions() {
  return (
    <div className="space-y-8">
      <h2 className="text-5xl">Actions</h2>
      <ContainerNames />
      <Restart />
      <Expose />
      <BindVolumes />
      <SortKeys />
    </div>
  );
}
