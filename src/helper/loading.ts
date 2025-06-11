export function call_when_existing<T>(component_func: () => T, func: (T) => {}): void {
    const component = component_func();
    console.log(component);

    if (component) {
        func(component);
        return;
    }

    setTimeout(() => {
        call_when_existing(component_func, func)
    }, 1);
}
