type Container<T> = { content: T };

type Contained<T extends Container<any>> =
  T extends Container<infer X> ? X : never;

type T01 = Contained<Container<string>>; // string
type T02 = Contained<Container<[boolean, number]>>; // [boolean, number]

export { T01, T02 };
