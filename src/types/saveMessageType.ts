export enum SaveMessageType {
    None,
    Error,
    Save
}

export function isSaveType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save;
}
