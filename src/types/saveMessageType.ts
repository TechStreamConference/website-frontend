export enum SaveMessageType {
    None,
    DeleteError,
    Error,
    Delete,
    Save
}

export function isSaveType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save || type === SaveMessageType.Delete;
}

export function combineSaveType(lhs: SaveMessageType, rhs: SaveMessageType): SaveMessageType {
    if (lhs === SaveMessageType.Error || rhs === SaveMessageType.Error) {
        return SaveMessageType.Error;
    }
    if (lhs === SaveMessageType.DeleteError || rhs === SaveMessageType.DeleteError) {
        return SaveMessageType.DeleteError;
    }

    if (lhs === SaveMessageType.None || rhs === SaveMessageType.None) {
        return SaveMessageType.None;
    }

    if (lhs === SaveMessageType.Delete || rhs === SaveMessageType.Delete) {
        return SaveMessageType.Delete;
    }

    return SaveMessageType.Save;
}
