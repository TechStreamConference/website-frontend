export enum SaveMessageType {
    None,
    Error,
    Save
}

export function isSaveType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save;
}

export function combineSaveType(lhs: SaveMessageType, rhs: SaveMessageType): SaveMessageType {
    if (lhs === SaveMessageType.Error || rhs === SaveMessageType.Error) {
        return SaveMessageType.Error;
    }

    if (lhs === SaveMessageType.None || rhs === SaveMessageType.None) {
        return SaveMessageType.None;
    }

    return SaveMessageType.Save;
}
