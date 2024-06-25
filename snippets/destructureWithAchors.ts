// prettier-ignore
type Split<T extends string> =
  T extends `${infer P} ${infer S}`
  ? [P, S]
  : never;

type T01 = Split<"Gabriele Lana">[0]; // "Gabriele"
type T02 = Split<"Gabriele Lana">[1]; // "Lana"

type IpClasses<T extends string> =
  T extends `${infer O1}.${infer O2}.${infer O3}.${number}`
    ? {
        a: `${O1}`;
        b: `${O1}.${O2}`;
        c: `${O1}.${O2}.${O3}`;
      }
    : never;

type T03 = IpClasses<"127.0.0.1">;
// type T03 = {
//   a: "127";
//   b: "127.0";
//   c: "127.0.0";
// }
type T04 = IpClasses<"192.168.1.100">;
// type T03 = {
//   a: "192";
//   b: "192.168";
//   c: "192.168.1";
// }

export { T01, T02, T03, T04 };
