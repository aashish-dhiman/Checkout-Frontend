/**
 * An object representing possible transaction paths.
 * The keys represent the transaction status codes, and the values represent the corresponding paths.
 */
export const possibleTransaction: { [key: number]: string } = {
    1: "/success",
    2: "/pending",
    3: "/failed",
};
