export enum SaveMessageType {
    None,
    Error,
    Save
}

export function isSaveType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save;
}

export function combineSaveType(lhs: SaveMessageType, rhs: SaveMessageType): SaveMessageType {
    const check: Function = (lhs: SaveMessageType, rhs: SaveMessageType, reference: SaveMessageType): boolean => {
        return lhs === reference || rhs === reference;
    }

    if (check(lhs, rhs, SaveMessageType.Error)) {
        return SaveMessageType.Error;
    }

    if (check(lhs, rhs, SaveMessageType.None)) {
        return SaveMessageType.None;
    }

    return SaveMessageType.Save;
}
