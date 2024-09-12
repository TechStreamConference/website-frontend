export function typeWorkaround(node: HTMLElement, type: string): { destroy?: () => void } {
    node.setAttribute('type', type);

    return {
        destroy() {
            node.removeAttribute('type');
        }
    };
}
