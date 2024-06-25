// Given an object with fields, create a type with settes and getters for those
// fields

// HINT: you can compose/join two objects with `&` constructor

// prettier-ignore
type SettersAngGetters<O> =
    {[K in keyof O & string as `get${Capitalize<K>}`]: () => O[K]} &
    {[K in keyof O & string as `set${Capitalize<K>}`]: (value: O[K]) => void}

type R01 = SettersAngGetters<{ theme: "light" | "dark" }>;
type T01 = Expect<
  Equal<
    R01,
    {
      getTheme: () => "light" | "dark";
      setTheme: (value: "light" | "dark") => void;
    }
  >
>;

type R02 = SettersAngGetters<{ name: string; age: number }>;
type T02 = Expect<
  Equal<
    R02,
    {
      getName: () => string;
      setName: (value: string) => void;
      getAge: () => number;
      setAge: (value: number) => void;
    }
  >
>;

type R03 = SettersAngGetters<{}>;
type T03 = Expect<Equal<R03, {}>>;

type TODO = never;
type Expect<T extends true> = T;
type Equal<X, Y> = [X, Y] extends [Y, X] ? true : false;

export { T01, T02, T03, TODO };
