import { PackageName } from "../../..";
import { LibWrapper } from "./types";
import wrappers from "./wrappers";

export const libWrapper = () => {
  //@ts-ignore
  const libWrapper: LibWrapper = globalThis.libWrapper;

  wrappers.forEach(it => {
    libWrapper.register(
      PackageName,
      it.target,
      it.fn,
      it.type
    )
  })
};

export const checkLibWrapper = () => {
  //@ts-ignore
  if (globalThis.libWrapper) {
    console.log("Libwrapper found!")
  } else {
    console.log("Libwrapper NOT found!")
  }
}

export enum Hooks {
  READY = "libWrapper.Ready",
  REGISTER = "libWrapper.Register",
  UNREGISTER = "libWrapper.Unregister",
  UNREGISTER_ALL = "libWrapper.UnregisterAll",
  CONFLICT = "libWrapper.ConflictDetected",
  OVERRIDE_LOST = "libWrapper.OverrideLost",
}

export enum PerfMode {
  NORMAL = "NORMAL",
  FAST = "FAST",
  AUTO = "AUTO",
}

export enum WrapperType {
  WRAPPER = "WRAPPER",
  MIXED = "MIXED",
  OVERRIDE = "OVERRIDE",
}