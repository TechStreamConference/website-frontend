export enum SaveMessageType {
    None,
    Error,
    Approved,
    Save
}

export function isSaveType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save || type === SaveMessageType.Approved;
}

export function combineSaveType(lhs: SaveMessageType, rhs: SaveMessageType): SaveMessageType {
    if (lhs === SaveMessageType.Error || rhs === SaveMessageType.Error) {
        return SaveMessageType.Error;
    }

    if (lhs === SaveMessageType.None || rhs === SaveMessageType.None) {
        return SaveMessageType.None;
    }

    if (lhs === SaveMessageType.Approved || rhs === SaveMessageType.Approved) {
        return SaveMessageType.Approved;
    }

    return SaveMessageType.Save;
}
