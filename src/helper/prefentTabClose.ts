import { writable, get } from "svelte/store";

export default function (eventName = "input", message = "Are you sure?") {
    const store = writable(false);
    // the action
    function action(node: any, params: any) {
        function markUnsaved(e: any) {
            store.set(true);
        }
        function checkNavigation(e: any) {
            if (get(store)) {
                if (!confirm(message)) {
                    e.preventDefault();
                    if (e.type === "beforeunload") {
                        e.returnValue = "";
                    }
                }
            }
        }
        for (let a of document.querySelectorAll("a[href]")) {
            a.addEventListener("click", checkNavigation);
        }
        window.addEventListener("beforeunload", checkNavigation);
        node.addEventListener(eventName, markUnsaved);
        return {
            destory() {
                node.removeEventListener("input", markUnsaved);
                for (let a of document.querySelectorAll("a[href]")) {
                    a.removeEventListener("click", checkNavigation);
                }
                window.removeEventListener("beforeunload", checkNavigation);
            },
        };
    }
    return { store, action };
}
