
const colors: string[] = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#33FFF6",
    "#FFC300", "#DAF7A6", "#581845", "#C70039", "#900C3F",
    "#FFC0CB", "#FF1493", "#FF7F50", "#FFD700", "#2E8B57",
    "#40E0D0", "#191970", "#8B008B", "#A52A2A", "#7FFF00",
    "#DC143C", "#BDB76B", "#FA8072", "#D8BFD8", "#87CEFA",
    "#9ACD32", "#BC8F8F", "#708090", "#556B2F", "#8B4513",
    "#8FBC8F", "#228B22", "#ADFF2F", "#F08080", "#FFA07A",
    "#B0E0E6", "#FFB6C1", "#F5DEB3", "#663399", "#CD5C5C",
    "#DB7093", "#4169E1", "#008B8B", "#FF8C00", "#B8860B",
    "#6B8E23", "#FFFAF0", "#191919", "#FFFACD", "#BA55D3",
    "#FFDAB9", "#FF00FF", "#E6E6FA", "#6495ED", "#DAA520",
    "#008080", "#708090", "#FF6347", "#3CB371", "#FFFFE0",
];

function hex_to_rgb(hex: string): { r: number; g: number; b: number } {
    // Remove the leading '#' if present
    const cleanHex = hex.replace(/^#/, "");

    // Parse r, g, b
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function key_from_index(index: number): number {
    return ((index - 1) % Object.keys(colors).length);
}

export function tag_color_lookup(key: number): string {
    return colors[key_from_index(key)];
}

export function tag_text_color_lookup(key: number): string {
    const color = colors[key_from_index(key)];
    const { r, g, b } = hex_to_rgb(color);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128 ? "#000" : "#fff";
}
