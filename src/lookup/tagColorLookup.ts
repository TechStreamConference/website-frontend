// @formatter:off
const colors: string[] = [
    "#00ff00", "#006400", // 1 green
    "#00ffff", "#00c8c8", // 3 cyan !important
    "#0000ff", "#000096", // 5 blue
    "#00ff00", "#006400", // 7 green
    "#000000", "#323232", // 9 black
    "#0000ff", "#000096", // 11 blue
    "#ffff38", "#969600", // 13 yellow
    "#000000", "#323232", // 15 black !important
    "#00ff00", "#006400", // 17 green !important
    "#c80000", "#960000", // 19 red
    "#c800c8", "#960096", // 21 magenta
    "#c80000", "#960000", // 23 red !important
];
// @formatter:on,

function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number
} {
    // Remove leading '#' if present
    const cleanHex = hex.replace(/^#/, '');

    // Parse r, g, b
    const bigint = parseInt(cleanHex, 16);
    const r      = (bigint >> 16) & 255;
    const g      = (bigint >> 8) & 255;
    const b      = bigint & 255;

    return {
        r,
        g,
        b,
    };
}

function keyFromIndex(index: number): number {
    return ((index - 1) % Object.keys(colors).length);
}

export function tagColorLookup(key: number): string {
    return colors[keyFromIndex(key)];
}

export function tagTextColorLookup(key: number): string {
    const color     = colors[keyFromIndex(key)];
    const {
              r,
              g,
              b,
          }         = hexToRgb(color);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128 ? '#000' : '#fff';
}
