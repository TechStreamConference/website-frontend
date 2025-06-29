import {isDark} from "stores/theme";

// @formatter:off
const colorsDark: string[] = [
    // this additional information was once extracted from a seeding file within the backend.
    // this is not mend to be updated.
    // keep that in mind

    // background color: #282828FF
    // main tag, sub tag  // ID | subtag-count | color  | info      | tag
    "#66CDAA", "#377c6a", // 1  | 2            |        | weak      | Didaktik
    "#7956b7", "#6A5ACD", // 3  | 10           |        | important | Spieleentwicklung
    "#20B2AA", "#007272", // 5  | 1            |        | weak      | Hacking
    "#8FBC8F", "#5F9F6F", // 7  | 1            |        | weak      | Kommunikation
    "#DDA0DD", "#9932CC", // 9  | 4            |        |           | Künstliche Intelligenz (KI)
    "#90EE90", "#3CB371", // 11 | 2            |        | weak      | Maker
    "#7FFFD4", "#48D1CC", // 13 | 0            |        | weak      | Musik
    "#000000", "#464646", // 15 | 26           |        | important | Programmierung
    "#00FA9A", "#1fc065", // 17 | 10           |        | important | Projektmanagement
    "#98FB98", "#549B54", // 19 | 1            |        | weak      | Security
    "#BA55D3", "#9400D3", // 21 | 0            |        | weak      | Streaming
    "#3918fc", "#2210a2", // 23 | 19           |        | important | Web-Entwicklung
];
const colorsLight: string[] = [
    // background color: #FFFFFFFF
    "#2F8B76", "#1D5B4D",
    "#6A45C9", "#4A2F8F",
    "#167F7F", "#0A4D4D",
    "#548B54", "#325C32",
    "#8B3A8B", "#662966",
    "#3CB371", "#266B44",
    "#3EBFB4", "#267B73",
    "#595959", "#131313",
    "#00995C", "#006B41",
    "#549B54", "#326B32",
    "#943AAD", "#682C7A",
    "#1c0c9a", "#0d045d",
];
// @formatter:on,

function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number
} {
    // Remove the leading '#' if present
    const cleanHex = hex.replace(/^#/, '');

    // Parse r, g, b
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return {
        r,
        g,
        b,
    };
}

function currentLookUp(): string[] {
    return isDark() ? colorsDark : colorsLight;
}

function keyFromIndex(index: number): number {
    return ((index - 1) % Object.keys(currentLookUp()).length);
}

export function tagColorLookup(key: number): string {
    return currentLookUp()[keyFromIndex(key)];
}

export function tagTextColorLookup(key: number): string {
    const color = currentLookUp()[keyFromIndex(key)];
    const {
        r,
        g,
        b,
    } = hexToRgb(color);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128 ? '#000' : '#fff';
}
