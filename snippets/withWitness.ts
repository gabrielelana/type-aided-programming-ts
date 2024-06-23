type Some<T> = { _tag: "Some"; value: T };
type None<T> = { _tag: "None"; _witness: T };

// NOTE: you can always populate this value with `undefined as T` placeholder
type Maybe<T> = Some<T> | None<T>;

type UnwrapMaybe<X extends Maybe<any>> = X extends Maybe<infer T> ? T : never;

type T01 = UnwrapMaybe<Some<string>>; // string
type T02 = UnwrapMaybe<None<string>>; // string
type T03 = UnwrapMaybe<Maybe<string>>; // string

const none = <T>(): None<T> => ({ _tag: "None", _witness: undefined as T });

const noneString = none<string>();

type T04 = UnwrapMaybe<typeof noneString>; // string

export { T01, T02, T03, T04 };
