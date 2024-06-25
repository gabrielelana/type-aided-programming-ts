// Some payload coming from the outside world
type Payload = {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userAge: string;
  facilityName: string;
  facilityCity: string;
  facilityId: string;
};

// We want only the user fields
type UserPayload = {
  [K in Extract<keyof Payload, `user${string}`>]: Payload[K];
};
// type UserPayload = {
//     userId: string;
//     userFirstName: string;
//     userLastName: string;
//     userAge: string;
// }

// Alternativelly
type AnotherUserPayload = {
  [K in keyof Payload as K extends `user${string}` ? K : never]: Payload[K];
};

// Remove the "user" prefix
type StripPrefix<_S extends string, _P extends string> = TODO;

// prettier-ignore
type BetterUserPayload = {
  [K in keyof Payload as K extends `user${string}`
    ? Uncapitalize<StripPrefix<K, "user">>
    : never
  ]: Payload[K];
};
// type BetterUserPayload = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     age: string;
// }

type TODO = never;

export { UserPayload, AnotherUserPayload, BetterUserPayload };
