type FromStringToBooleans = Record<string, boolean>;

// The same as
// type FromStringToBooleans = { [key: string]: boolean };

type RecordOfBooleans = Record<string, boolean>;

type InputState = { [Key in "valid" | "edited" | "focused"]: boolean };
// { valid: boolean
// ; edited: boolean
// ; focused: boolean
// }

export { FromStringToBooleans, RecordOfBooleans, InputState };
