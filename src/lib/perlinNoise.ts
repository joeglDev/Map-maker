/*
interface Vector2D {
    x: number;
    y: number;
}

/// new
const gradients = {};
const memory = {};

const rand_vect = (): Vector2D => {
    let theta = Math.random() * 2 * Math.PI;
    return {x: Math.cos(theta), y: Math.sin(theta)};
};

const dotProductGrid = (x: number, y: number, vx: number, vy: number): number => {
    let g_vect;
    let d_vect = {x: x - vx, y: y - vy};
    if (gradients[[vx,vy]]){
        g_vect = gradients[[vx,vy]];
    } else {
        g_vect = rand_vect();
        gradients[[vx, vy]] = g_vect;
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
};

const smootherStep = (x: number):number => 6*x**5 - 15*x**4 + 10*x**3;

const interpret = (x: number, a: number, b: number) => a + smootherStep(x) * (b-a);

export const getPerlinNoise = (x: number, y: number) => {
    if (memory.hasOwnProperty([x,y])) return memory[[x,y]];

    const xf = Math.floor(x);
    const yf = Math.floor(y);

    //interpretolate
    const tl = dotProductGrid(x, y, xf,   yf);
    const tr = dotProductGrid(x, y, xf+1, yf);
    const  bl = dotProductGrid(x, y, xf,   yf+1);
    const  br = dotProductGrid(x, y, xf+1, yf+1);
    const  xt = interpret(x-xf, tl, tr);
    const xb = interpret(x-xf, bl, br);
    const v = interpret(y-yf, xt, xb);

    memory[[x,y]] = v;

    return v;
}



*/