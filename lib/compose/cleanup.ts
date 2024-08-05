import type { ProjectAtom, ServicesAtom } from "@/lib/compose/store";
import type { DockerCompose } from "@/lib/compose/types";

const servicesOrder = [
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
];

function sortServicesObjectKeysBasedOnOrder(
  obj: DockerCompose,
  order: string[],
) {
  for (const serviceName in obj.services) {
    if (Object.prototype.hasOwnProperty.call(obj.services, serviceName)) {
      const service = obj.services[serviceName];
      const sorted: { [key: string]: unknown } = {};

      // Sort the keys based on the order
      for (const key of order) {
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

      obj.services[serviceName] = sorted;
    }
  }
}

function modifyServices(
  obj: DockerCompose,
  config: {
    project: ProjectAtom;
    services: ServicesAtom;
  },
): DockerCompose {
  const services = obj.services;

  for (const serviceName in services) {
    if (Object.prototype.hasOwnProperty.call(services, serviceName)) {
      const service = services[serviceName];
      const uniqueName = `${config.project.name}-${serviceName}`;

      // Add the container name if not already present
      if (!service.container_name) {
        service.container_name = uniqueName;
      }

      // Add restart policy if not already present
      if (!service.restart) {
        service.restart = config.project.restart;
      }

      // If the project has more than one service, add network to each service
      if (Object.keys(services).length > 1) {
        service.networks = [...(service.networks || []), config.project.name];
      }

      // Expose the service
      if (
        config.project.domain &&
        config.services?.[serviceName]?.expose &&
        config.services?.[serviceName]?.exposePort
      ) {
        service.labels = [
          ...(service.labels || []),
          "traefik.enable=true",
          `traefik.http.routers.${serviceName}.rule=Host(\`${serviceName}.${config.project.domain}\`)`,
          `traefik.http.services.${serviceName}.loadbalancer.server.port=${config.services?.[serviceName]?.exposePort}`,
        ];
        service.networks = [...(service.networks || []), "proxy"];
      }
    }
  }

  sortServicesObjectKeysBasedOnOrder(obj, servicesOrder);

  return obj;
}

function modifyNetworks(
  obj: DockerCompose,
  config: {
    project: ProjectAtom;
    services: ServicesAtom;
  },
): DockerCompose {
  // If the project has more than one service, add the project network
  if (Object.keys(obj.services).length > 1) {
    obj.networks = {
      ...obj.networks,
      [config.project.name]: {
        driver: "bridge",
      },
    };
  }

  // If any service is exposed, add the proxy network
  if (
    Object.values(config.services).some(
      (service) => service.expose && service.exposePort,
    )
  ) {
    obj.networks = {
      ...obj.networks,
      proxy: {
        external: true,
      },
    };
  }

  return obj;
}

export function modifyDockerCompose(
  obj: DockerCompose,
  config: {
    project: ProjectAtom;
    services: ServicesAtom;
  },
) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  modifyServices(obj, config);
  modifyNetworks(obj, config);

  return obj;
}
