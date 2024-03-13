import { assertOptions } from "vixeny";
import parser from "vixeny/components/runtime/parseArguments.mjs";
import pugP from "./plugins/pug.ts";
import sassP from "./plugins/sass.ts";
import typescriptP from "./plugins/typescript.ts";
import remarkP from "./plugins/remark.ts";
import { pug, pugStaticServerPlugin } from "vixeny-prespective";
import * as pugModule from "pug";

const fromPug = pug(pugModule);

const { liveReloading: enableLiveReloading = false } = parser();

const globalOptions = {
  hasName: "http://localhost:3000/",
  enableLiveReloading,
  cyclePlugin: { ...fromPug },
};

const cryptoKey = {
  globalKey: crypto.randomUUID(),
};

const staticServer = {
  type: "fileServer",
  name: "/",
  path: "./views/public/",
  slashIs: "$page",
  template: [pugP, sassP, typescriptP, remarkP],
};

const docs = {
  type: "fileServer",
  name: "/docs",
  path: "./node_modules/vixeny/docs/",
  slashIs: "$page",
  template: [pugP, sassP, typescriptP, remarkP],
};

assertOptions(globalOptions);
export { cryptoKey, globalOptions, staticServer , docs};
