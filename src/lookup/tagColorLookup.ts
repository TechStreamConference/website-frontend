import {isDark} from "stores/theme";

// @formatter:off
const colorsDark: string[] = [
    // this additional information was once extracted from a seeding file within the backend.
    // this is not mend to be updated.
    // keep that in mind

    // background color: #282828FF
    // main tag, sub tag  // ID | subtag-count | color  | info      | tag
    "#00ff00", "#006400", // 1  | 2            |        | weak      | Didaktik
    "#00ffff", "#00c8c8", // 3  | 10           |        | important | Spieleentwicklung
    "#0000ff", "#000096", // 5  | 1            |        | weak      | Hacking
    "#00ff00", "#006400", // 7  | 1            |        | weak      | Kommunikation
    "#000000", "#323232", // 9  | 4            |        |           | Künstliche Intelligenz (KI)
    "#0000ff", "#000096", // 11 | 2            |        | weak      | Maker
    "#ffff38", "#969600", // 13 | 0            |        | weak      | Musik
    "#000000", "#323232", // 15 | 26           |        | important | Programmierung
    "#00ff00", "#006400", // 17 | 10           |        | important | Projektmanagement
    "#c80000", "#960000", // 19 | 1            |        | weak      | Security
    "#c800c8", "#960096", // 21 | 0            |        | weak      | Streaming
    "#c80000", "#960000", // 23 | 19           |        | important | Web-Entwicklung
];
const colorsLight: string[] = [
    // background color: #FFFFFFFF
    "#00ff00", "#006400",
    "#d50808", "#e80000",
    "#0000ff", "#000096",
    "#00ff00", "#006400",
    "#000000", "#323232",
    "#0000ff", "#000096",
    "#ffff38", "#969600",
    "#000000", "#323232",
    "#00ff00", "#006400",
    "#c80000", "#960000",
    "#c800c8", "#960096",
    "#c80000", "#960000",
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
