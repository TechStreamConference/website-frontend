type TagColorDict = {
    [key: string]: string;
};

const lookupTagColor: TagColorDict = {
    "1": "#ffeb3b",
    "2": "#cddc39",
    "3": "#607d8b",
    "4": "#483562",
    "5": "#000",
    "6": "#ffb74d",
}

const lookupTextColor: TagColorDict = {
    "1": "#000",
    "2": "#000",
    "3": "#fff",
    "4": "#fff",
    "5": "#fff",
    "6": "#000",
}

export function tagColorLookup(key: string): string {
    if (key in lookupTagColor) {
        return lookupTagColor[key];
    }

    return key;
}

export function tagTextColorLookup(key: string): string {
    if (key in lookupTextColor) {
        return lookupTextColor[key];
    }

    return key;
}
