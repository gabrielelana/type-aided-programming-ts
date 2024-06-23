type Some<T> = { _tag: "Some"; value: T };
type None = { _tag: "None" };
type Maybe<T> = Some<T> | None;

type UnwrapMaybe<X extends Maybe<any>> = X extends Maybe<infer T> ? T : never;

type T01 = UnwrapMaybe<Some<string>>; // string
type T02 = UnwrapMaybe<None>; // unknown ??? 🤨
type T03 = UnwrapMaybe<Maybe<string>>; // unknown ??? 🤨

export { T01, T02, T03 };
