import { API_BASE, CIRCUIT_ID_MAP } from "../config.js";
import { cars } from "../data/cars.js";
import { staticLapTimes } from "../data/staticLapTimes.js";
import { circuits } from "../data/circuits.js";

const apiCache = {};

/**
 * Qualifs d’un circuit pour une année → { constructorId: temps en secondes }
 */
export async function fetchQualifyingFromAPI(circuitId, year) {
    const cacheKey = `${circuitId}_${year}`;
    if (apiCache[cacheKey] !== undefined) return apiCache[cacheKey];

    const jolpicaCircuit = CIRCUIT_ID_MAP[circuitId];
    if (!jolpicaCircuit) {
        apiCache[cacheKey] = null;
        return null;
    }

    const url = `${API_BASE}/${year}/circuits/${jolpicaCircuit}/qualifying.json?limit=5`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            apiCache[cacheKey] = null;
            return null;
        }
        const data = await res.json();

        const races = data?.MRData?.RaceTable?.Races;
        if (!races || races.length === 0) {
            apiCache[cacheKey] = null;
            return null;
        }

        const qualResults = races[0].QualifyingResults || [];
        const timeMap = {};

        qualResults.forEach((result) => {
            const ctor = result.Constructor?.constructorId;
            const times = [result.Q1, result.Q2, result.Q3]
                .filter(Boolean)
                .map(parseQualTime)
                .filter((t) => t > 0);
            if (times.length && ctor) {
                const best = Math.min(...times);
                if (!timeMap[ctor] || best < timeMap[ctor]) timeMap[ctor] = best;
            }
        });

        apiCache[cacheKey] = timeMap;
        return timeMap;
    } catch (err) {
        console.warn(`[F1 API] Erreur ${circuitId} ${year}:`, err.message);
        apiCache[cacheKey] = null;
        return null;
    }
}

/** "1:22.221" → 82.221 */
export function parseQualTime(t) {
    if (!t) return 0;
    const p = t.split(":");
    return p.length === 2 ? parseInt(p[0], 10) * 60 + parseFloat(p[1]) : parseFloat(t) || 0;
}

/**
 * Résolution du temps : 1) API Jolpica 2) données statiques 3) estimation
 */
export async function getLapTime(carKey, circuitKey) {
    const car = cars[carKey];

    if (car.jolpicaId && car.jolpicaYear) {
        const data = await fetchQualifyingFromAPI(circuitKey, car.jolpicaYear);
        if (data && data[car.jolpicaId]) {
            return { time: data[car.jolpicaId], isReal: true, source: "api" };
        }
    }

    const t = staticLapTimes[circuitKey]?.[carKey];
    if (t) return { time: t, isReal: true, source: "static" };

    const base = circuits[circuitKey].baseTime;
    const delta = (2024 - (parseInt(car.year, 10) || 2024)) * 0.4;
    return { time: base + delta, isReal: false, source: "estimate" };
}
