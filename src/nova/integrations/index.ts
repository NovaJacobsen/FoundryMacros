import { libWrapper, checkLibWrapper, Hooks } from "./libwrapper";

export type onceIntegration = { call: () => void; once: string };
export type onIntegration = { call: () => void; on: string };
export type Integration = onIntegration | onceIntegration;

export const integrations: Integration[] = [
  { call: libWrapper, once: Hooks.READY },
  { call: checkLibWrapper, once: "init" },
];
