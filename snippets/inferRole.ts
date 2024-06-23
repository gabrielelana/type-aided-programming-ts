// prettier-ignore
type GetRole<T extends { role: unknown }> =
  T extends { role: infer X }
  ? X
  : never;

type T01 = GetRole<{ name: string; role: string }>; // string
type T02 = GetRole<{ name: string; role: "admin" }>; // "admin"
type T03 = GetRole<{ role: "staff" | "service" }>; // "staff" | "service"

type T04 = GetRole<{
  role: { name: "admin"; permissions: ["read" | "write"] };
}>; // {name: "admin", permissions: ["read" | "write"]

// @ts-expect-error wrong type, missing `"role"` field
type T05 = GetRole<{ name: string }>;

export { T01, T02, T03, T04, T05 };
