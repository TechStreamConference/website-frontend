export enum SaveMessageType {
    None,
    DeleteError,
    Error,
    Approved,
    Delete,
    Save
}

export function isSuccessType(type: SaveMessageType): boolean {
    return type === SaveMessageType.Save || type === SaveMessageType.Delete || type == SaveMessageType.Approved;
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

    if (lhs == SaveMessageType.Approved || rhs == SaveMessageType.Approved) {
        return SaveMessageType.Approved;
    }

    if (lhs === SaveMessageType.Delete || rhs === SaveMessageType.Delete) {
        return SaveMessageType.Delete;
    }

    return SaveMessageType.Save;
}
