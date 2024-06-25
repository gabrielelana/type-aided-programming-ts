type TLD = "com" | "it" | "eu" | "dev";
type EmailAddress = `${string}@${string}.${TLD}`;

// @ts-expect-error missing domain
const r01: EmailAddress = "gabriele";

// @ts-expect-error still missing domain
const r02: EmailAddress = "gabriele.lana";

// @ts-expect-error missing TLD in domain
const r03: EmailAddress = "gabriele.lana@gmail";

// OK
const r04: EmailAddress = "gabriele.lana@gmail.com";

// @ts-expect-error `dev` is not a valid TLD domain (list only a few)
const r05: EmailAddress = "gabriele.lana@gmail.foo";

type TODO = never;

export { r01, r02, r03, r04, r05, TODO };
