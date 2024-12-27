export function scrollToTop(): void {
    scrollToAnchor('top');
}

export function scrollToAnchor(hash: string): void {
    window.location.hash = ''; // this is needed to get a reaction if the hash was already applied
    window.location.hash = hash;
}
