
export function scrollToTop(): void {
    scrollToHash('top');
}


export function scrollToHash(hash: string): void {
    window.location.hash = ""; // this is needed to get a reaction if the hash was alredy applied
    window.location.hash = hash;
}
