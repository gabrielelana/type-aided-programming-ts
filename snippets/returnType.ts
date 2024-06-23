type ReturnType<F> = F extends (...params: any[]) => infer R ? R : never;

type Fn = (name: string, id: number) => boolean;

type T01 = ReturnType<Fn>; // => boolean

export { T01 };
