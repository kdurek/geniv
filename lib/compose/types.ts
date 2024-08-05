export type DockerService = {
  image?: string;
  container_name?: string;
  ports?: string[];
  environment?: string[];
  labels?: string[];
  volumes?: string[];
  networks?: string[];
  restart?: string;
  depends_on?: string[];
  command?: string;
  build?: {
    context: string;
    dockerfile: string;
  };
  [key: string]: unknown;
};

export type DockerVolume = {
  driver: string;
  driver_opts: Record<string, string>;
  external: boolean;
};

export type DockerNetwork = {
  driver?: "bridge" | "host" | "none";
  external?: boolean;
};

export type DockerCompose = {
  version: string;
  services: Record<string, DockerService>;
  volumes?: Record<string, DockerVolume>;
  networks?: Record<string, DockerNetwork>;
};

export type UnknownObject = Record<string, unknown>;
