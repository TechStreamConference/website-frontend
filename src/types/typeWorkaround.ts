export function type_workaround(node: HTMLElement, type: string): {
    destroy?: () => void
} {
    node.setAttribute('type', type);

    return {
        destroy() {
            node.removeAttribute('type');
        },
    };
}
