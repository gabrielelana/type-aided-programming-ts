type SomethingAboutGabriele = `Gabriele ${string}`

// @ts-expect-error
const r01: SomethingAboutGabriele = "Gabriele"
// @ts-expect-error
const r02: SomethingAboutGabriele = "Luca is a nice fellow"

const r03: SomethingAboutGabriele = "Gabriele is a nice fellow"
const r04: SomethingAboutGabriele = "Gabriele " // ok, because an empty string is a string

export { r01, r02, r03, r04 };
