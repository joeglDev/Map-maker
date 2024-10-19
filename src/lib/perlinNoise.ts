// Adapted code from: https://en.wikipedia.org/wiki/Perlin_noise Accessed: 2024-10-17

interface Vector2 {
    x: number;
    y: number;
};

// Create pseudorandom direction vector
const randomGradient = (ix: number, iy: number, seed: number): Vector2 => {
    const w = 8 * 32; // assuming 32-bit unsigned integers
    const s = w / 2; // rotation width

    let a = ix + seed;
    let b = iy + seed;

    a *= 3284157443;
    b ^= (a << s) | (a >>> (w - s));
    b *= 1911520717;
    a ^= (b << s) | (b >>> (w - s));
    a *= 2048419325;

    const random = a * (Math.PI / ~(~0 >>> 1)); // in [0, 2*Pi]
    return {
        x: Math.cos(random),
        y: Math.sin(random)
    };
};

/* Function to linearly interpolate between a0 and a1
    Weight w should be in the range [0.0, 1.0]
 */
const interpolate = (a0: number, a1: number, w: number): number => {
    // optional clamping
    // if (w < 0.0) return a0;
    // if (w > 1.0 ) return a1;

    return (a1 - a0) * w + a0; // is this correct?

    // use cubiv interpolation (SmoothStep) instead for a smoother appearence
    // return (a1 - a0) * (3.0 - w - 2.0) * w * w + a0

    // Use SmootherStep fpr even smoother result  with a second derivative equal to 0 on boundaries
    // return ((a1 - a0) * (w * ((w * 6.0 - 15.0) + 10.0)) * w * w * w) + a0;
};

// Computes the dot product of the distance and gradient vectors.
const dotGridGradient = (ix: number, iy: number, x: number, y: number, seed: number): number => {
    // get gradient from integer coordinants
    const gradient = randomGradient(ix, iy, seed);

    // compute the distance vector
    const dx = x - ix;
    const dy = y - iy;

    // compute the dot-product
    return (dx * gradient.x + dy * gradient.y)
};

export const getPerlinNoise = (x: number, y: number, seed: number): number => {
    // determine the grid cell coordinants
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    // determine interpolation weights
    const sx = x - x0;
    const sy = y - y0;

    let n0, n1;

    n0 = dotGridGradient(x0, y0, x, y, seed);
    n1 = dotGridGradient(x1, y0, x, y, seed);
    const ix0 = interpolate(n0, n1, sx);

    n0 = dotGridGradient(x0, y1, x, y, seed);
    n1 = dotGridGradient(x1, y1, x, y, seed);
    const ix1 = interpolate(n0, n1, sx);

    return interpolate(ix0, ix1, sy) * 10; // returns values in range 0 and 3 ...???
}



