import { WrapperType } from "..";

const wrappers: Wrapper<any[], any>[] = [];

export default wrappers;


export type WrapperFn<
  T extends WrapperType,
  C extends any[],
  R
> = T extends WrapperType.OVERRIDE
  ? (...params: C) => R
  : (next: (...params: C) => R, ...params: C) => R;


interface ModuleChange {
  target: string;
  fn: any
  type: WrapperType
}

export class Override<P extends any[], R = void> implements ModuleChange {
  target
  fn
  type = WrapperType.OVERRIDE
  constructor(target: string, fn: WrapperFn<WrapperType.OVERRIDE, P, R>) {
    this.target = target;
    this.fn = fn;
  }
}
export class MixedWrapper<P extends any[], R = void> implements ModuleChange{
  target;
  fn;
  type = WrapperType.MIXED;
  constructor(target: string, fn: WrapperFn<WrapperType.MIXED, P, R>) {
    this.target = target;
    this.fn = fn;
  }
}
export class Wrapper<P extends any[], R = void> implements ModuleChange {
  target;
  fn;
  type = WrapperType.WRAPPER;
  constructor(target: string, fn: WrapperFn<WrapperType.WRAPPER, P, R>) {
    this.target = target;
    this.fn = fn;
  }
}

