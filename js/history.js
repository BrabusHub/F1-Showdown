const STORAGE_KEY = "f1showdown_duel_history_v1";
const MAX_ENTRIES = 40;

/**
 * @returns {Array<{ id: number, at: number, circuitKey: string, circuitName: string, winner: object, rows: object[] }>}
 */
export function getHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/**
 * @param {{ circuitKey: string, circuitName: string, winner: object, rows: object[] }} duel
 */
export function pushDuel(duel) {
    const list = getHistory();
    const now = Date.now();
    list.unshift({
        ...duel,
        id: now,
        at: now,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}

export function formatHistoryDate(ts) {
    try {
        return new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
        }).format(new Date(ts));
    } catch {
        return "";
    }
}
