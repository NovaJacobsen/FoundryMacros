import * as nova from "..";
import { integrations } from "../integrations";

export const registerHooks = () => {
  Hooks.once("ready", () => {
    //@ts-ignore
    window.novaAPI = nova;

    setTimeout(() =>
      $(".notification:contains(requires a minimum screen resolution)").hide()
    );
  });

  integrations.forEach((integration) => {
    if ("on" in integration) {
      Hooks.on(integration.on, integration.call);
    }
    if ("once" in integration) {
      Hooks.once(integration.once, integration.call);
    }
  });
};
