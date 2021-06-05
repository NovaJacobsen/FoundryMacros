import * as nova from "..";

export const registerHooks = () => {
  Hooks.once("ready", () => {
    //@ts-ignore
    window.novaAPI = nova;
    setTimeout(() =>
      $(".notification:contains(requires a minimum screen resolution)").hide()
    );
  });
};
