import Head from "@/layouts/head-default";
import Layout from "@/layouts/layout-default";
import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,

  // <title>
  title: "Geniv",
  extends: vikeReact,

  ssr: false,
} satisfies Config;
