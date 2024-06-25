// We have seen this before
// prettier-ignore
type SnakeToCamel<Str> =
  Str extends `${infer First}_${infer Rest}`
  ? `${First}${SnakeToCamel<Capitalize<Rest>>}`
  : Str;

// We have request payload which we don't like because internally in our core
// domain we use cammel case for the fields
type RequestPayload = {
  chapter_title: string;
  author: { full_name: string };
};

// We don't want to rewire by hand all those request types do we?

// We can do it at type-level with Mapped Types

// Let's take it step by step

// First rebuild the exact same object type and familiarize with the syntax
type SamePayload = { [K in keyof RequestPayload]: RequestPayload[K] };

// We want to change all the keys to cammel case, let's start with the external
// keys
type OnlyFirstLevelKeys = {
  [K in keyof RequestPayload as SnakeToCamel<K>]: RequestPayload[K];
};
// type OnlyFirstLevelKeys = {
//     chapterTitle: string;
//     author: {
//         full_name: string;
//     };
// }

// Now add recursion and the job is done
type ToInternalPayload<T> = {
  [K in keyof T as SnakeToCamel<K>]: ToInternalPayload<T[K]>;
};

type InternalPayload = ToInternalPayload<RequestPayload>;
// type InternalPayload = {
//     chapterTitle: string;
//     author: {
//         fullName: string;
//     };
// }

// NOTE: if you are not able to see the previous type, use Expand, can you tell
// now what's it's doing?
type Expand<T> = {} & { [P in keyof T]: Expand<T[P]> };

export { SamePayload, OnlyFirstLevelKeys, InternalPayload, Expand };
