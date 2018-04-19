declare global {
    interface Math {
        /**
         * Returns the Greatest Common Divisor of given numbers.
         * @param {number} n
         * @param {number} m
         * @returns {number} Greatest Common Divisor
         */
        gcd(n: number, m: number): number;
    }
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "json!*" {
    const value: any;
    export default value;
}

export {};
