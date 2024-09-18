export function isSameStringRaw(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export function isSameString(lhs: string, rhs: string): boolean {
    return isSameStringRaw(lhs.trim(), rhs.trim());
}
