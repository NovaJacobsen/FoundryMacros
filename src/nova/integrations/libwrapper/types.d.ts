import { WrapperType, PerfMode } from ".";

export type LibWrapper = {
  register: <T extends WrapperType = WrapperType.MIXED>(
    package_id: string,
    target: string,
    fn: WrapperFn<T>,
    type?: T,
    options?: {
      chain?: boolean;
      perf_mode?: PerfMode;
    } = {}
  ) => void;

  unregister: (
    package_id: string,
    target: string,
    fail?: boolean = true
  ) => void;

  unregisterAll: (package_id: string) => void;

  ignore_conflicts(
    package_id: string,
    ignore_ids: string | string[],
    targets: string | string[],
    options?: {
      ignore_errors?: boolean = false;
    } = {}
  );

  version: `${number}.${number}.${number}.${number}.${string}`;
  versions: [number, number, number, number, string];
  git_version: string;
  version_at_least: (
    major: number,
    minor?: number = 0,
    patch?: number = 0,
    suffix?: number = 0
  ) => boolean;

  is_fallback: () => boolean;
};

export type LibWrapperHooks = {
  Ready: () => void;
};