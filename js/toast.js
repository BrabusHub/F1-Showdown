/**
 * Notifications type « telemetry » — cohérentes avec le thème du site
 */
const DEFAULT_MS = 4500;

export function showToast(message, type = "error", durationMs = DEFAULT_MS) {
    const stack = document.getElementById("toast-stack");
    if (!stack || !message) return;

    const el = document.createElement("div");
    el.className = `toast toast--${type}`;
    el.setAttribute("role", "alert");

    const icon = document.createElement("span");
    icon.className = "toast__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = type === "error" ? "\u26A0" : "\u2139";

    const text = document.createElement("p");
    text.className = "toast__text";
    text.textContent = message;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast__dismiss";
    btn.setAttribute("aria-label", "Fermer la notification");
    btn.textContent = "\u00D7";

    el.appendChild(icon);
    el.appendChild(text);
    el.appendChild(btn);

    let hideTimer;

    const dismiss = () => {
        clearTimeout(hideTimer);
        el.classList.remove("toast--visible");
        window.setTimeout(() => el.remove(), 320);
    };

    btn.addEventListener("click", dismiss);

    stack.appendChild(el);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add("toast--visible"));
    });

    hideTimer = window.setTimeout(dismiss, durationMs);
}
