export interface Color {
    red: number;
    green: number;
    blue: number;
}

export const white: Color = {
    red: 255,
    green: 255,
    blue: 255,
};

export const black: Color = {
    red: 0,
    green: 0,
    blue: 0,
};

export const orange: Color = {
    red: 255,
    green: 165,
    blue: 0,
};

export function lerpColor(start: Color, end: Color, factor: number): Color {
    return {
        red: start.red + factor * (end.red - start.red),
        green: start.green + factor * (end.green - start.green),
        blue: start.blue + factor * (end.blue - start.blue),
    };
}

export function lerpTextCountColor(count: number, limit: number): Color {
    let factor = 1 - (count / limit);
    if (factor > 0.5) {
        factor = 1;
    } else {
        factor *= 2;
    }

    return lerpColor(orange, white, factor);
}
