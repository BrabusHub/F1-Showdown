// ============================================================
//  F1 SHOWDOWN — script.js
//  Mode HYBRIDE : API Jolpica (données réelles) + fallback statique
//  API : https://api.jolpi.ca/ergast/f1/{year}/circuits/{id}/qualifying.json
// ============================================================

// ─────────────────────────────────────────────────────────────
//  CONFIGURATION API
// ─────────────────────────────────────────────────────────────
const API_BASE = "https://api.jolpi.ca/ergast/f1";

// Mapping circuit interne → circuitId Jolpica
const CIRCUIT_ID_MAP = {
    "monza":       "monza",
    "monaco":      "monaco",
    "silverstone": "silverstone",
    "spa":         "spa",
    "suzuka":      "suzuka"
};

// Cache pour éviter les requêtes dupliquées : "circuitId_year" → Map constructorId→time
const apiCache = {};

// ─────────────────────────────────────────────────────────────
//  BASE DE DONNÉES — VOITURES
//  jolpicaId  = constructorId dans l'API Jolpica/Ergast
//  jolpicaYear = année à requêter
// ─────────────────────────────────────────────────────────────
const cars = {
    "none": {
        name: "Sélectionner...", speed: 0, weight: 0, year: "", team: "",
        engine: "", drivers: "", line_droite: 0, virage_lent: 0, virage_rapide: 0, color: "#fff"
    },

    // ── 2026 ──────────────────────────────────────────────────
    "rb21": {
        name: "Red Bull RB21", team: "Red Bull", year: "2026",
        speed: 348, weight: 800, engine: "Honda RBPTH003",
        drivers: "M. Verstappen / L. Lawson",
        line_droite: 94, virage_lent: 88, virage_rapide: 95,
        color: "#001c3d", image: "f1-logo.png",
        notes: "Saison en cours — temps estimés."
    },
    "sf26": {
        name: "Ferrari SF-26", team: "Ferrari", year: "2026",
        speed: 350, weight: 800, engine: "Ferrari 067",
        drivers: "C. Leclerc / L. Hamilton",
        line_droite: 97, virage_lent: 85, virage_rapide: 90,
        color: "#ff0000", image: "f1-logo.png",
        notes: "Saison en cours — temps estimés."
    },
    "mcl39": {
        name: "McLaren MCL39", team: "McLaren", year: "2025",
        speed: 347, weight: 800, engine: "Mercedes M16",
        drivers: "L. Norris / O. Piastri",
        line_droite: 93, virage_lent: 97, virage_rapide: 96,
        color: "#ff8700", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2025,
        notes: "Saison en cours."
    },

    // ── 2024 ──────────────────────────────────────────────────
    "rb20": {
        name: "Red Bull RB20", team: "Red Bull", year: "2024",
        speed: 345, weight: 798, engine: "Honda RBPTH002",
        drivers: "M. Verstappen / S. Pérez",
        line_droite: 92, virage_lent: 85, virage_rapide: 99,
        color: "#001c3d", image: "rb20.jpg",
        jolpicaId: "red_bull", jolpicaYear: 2024
    },
    "sf24": {
        name: "Ferrari SF-24", team: "Ferrari", year: "2024",
        speed: 348, weight: 802, engine: "Ferrari 066/12",
        drivers: "C. Leclerc / C. Sainz",
        line_droite: 98, virage_lent: 82, virage_rapide: 88,
        color: "#ff0000", image: "sf24.jpg",
        jolpicaId: "ferrari", jolpicaYear: 2024
    },
    "mcl38": {
        name: "McLaren MCL38", team: "McLaren", year: "2024",
        speed: 346, weight: 799, engine: "Mercedes M15",
        drivers: "L. Norris / O. Piastri",
        line_droite: 94, virage_lent: 96, virage_rapide: 95,
        color: "#ff8700", image: "mcl38.jpg",
        jolpicaId: "mclaren", jolpicaYear: 2024
    },
    "w15": {
        name: "Mercedes W15", team: "Mercedes", year: "2024",
        speed: 342, weight: 795, engine: "Mercedes M15",
        drivers: "L. Hamilton / G. Russell",
        line_droite: 88, virage_lent: 88, virage_rapide: 92,
        color: "#00d2be", image: "w15.jpg",
        jolpicaId: "mercedes", jolpicaYear: 2024
    },

    // ── 2023 ──────────────────────────────────────────────────
    "rb19": {
        name: "Red Bull RB19", team: "Red Bull", year: "2023",
        speed: 347, weight: 798, engine: "Honda RBPTH001",
        drivers: "M. Verstappen / S. Pérez",
        line_droite: 95, virage_lent: 88, virage_rapide: 100,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2023,
        notes: "Voiture la plus dominante de l'ère turbo-hybride — 21 victoires."
    },
    "sf23": {
        name: "Ferrari SF-23", team: "Ferrari", year: "2023",
        speed: 345, weight: 800, engine: "Ferrari 066/11",
        drivers: "C. Leclerc / C. Sainz",
        line_droite: 96, virage_lent: 80, virage_rapide: 85,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2023
    },
    "mcl60": {
        name: "McLaren MCL60", team: "McLaren", year: "2023",
        speed: 343, weight: 800, engine: "Mercedes M14",
        drivers: "L. Norris / O. Piastri",
        line_droite: 88, virage_lent: 90, virage_rapide: 90,
        color: "#ff8700", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2023
    },

    // ── 2022 ──────────────────────────────────────────────────
    "rb18": {
        name: "Red Bull RB18", team: "Red Bull", year: "2022",
        speed: 344, weight: 798, engine: "Honda RBPTH001",
        drivers: "M. Verstappen / S. Pérez",
        line_droite: 93, virage_lent: 87, virage_rapide: 97,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2022
    },
    "f1-75": {
        name: "Ferrari F1-75", team: "Ferrari", year: "2022",
        speed: 346, weight: 800, engine: "Ferrari 066/10",
        drivers: "C. Leclerc / C. Sainz",
        line_droite: 97, virage_lent: 83, virage_rapide: 88,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2022
    },
    "w13": {
        name: "Mercedes W13", team: "Mercedes", year: "2022",
        speed: 340, weight: 800, engine: "Mercedes M13",
        drivers: "L. Hamilton / G. Russell",
        line_droite: 86, virage_lent: 80, virage_rapide: 84,
        color: "#00d2be", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2022,
        notes: "Saison difficile — problème de marsouinage sévère."
    },

    // ── 2021 ──────────────────────────────────────────────────
    "rb16b": {
        name: "Red Bull RB16B", team: "Red Bull", year: "2021",
        speed: 343, weight: 749, engine: "Honda RA621H",
        drivers: "M. Verstappen / S. Pérez",
        line_droite: 91, virage_lent: 88, virage_rapide: 97,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2021
    },
    "w12": {
        name: "Mercedes W12", team: "Mercedes", year: "2021",
        speed: 341, weight: 749, engine: "Mercedes M12",
        drivers: "L. Hamilton / V. Bottas",
        line_droite: 93, virage_lent: 91, virage_rapide: 95,
        color: "#00d2be", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2021
    },

    // ── 2020 ──────────────────────────────────────────────────
    "w11": {
        name: "Mercedes W11", team: "Mercedes", year: "2020",
        speed: 340, weight: 746, engine: "Mercedes M11 EQ Performance",
        drivers: "L. Hamilton / V. Bottas",
        line_droite: 94, virage_lent: 99, virage_rapide: 100,
        color: "#000000", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2020,
        notes: "Considérée comme la meilleure F1 de l'histoire moderne."
    },
    "rb16": {
        name: "Red Bull RB16", team: "Red Bull", year: "2020",
        speed: 338, weight: 746, engine: "Honda RA620H",
        drivers: "M. Verstappen / A. Albon",
        line_droite: 88, virage_lent: 85, virage_rapide: 91,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2020
    },

    // ── 2019 ──────────────────────────────────────────────────
    "sf90": {
        name: "Ferrari SF90", team: "Ferrari", year: "2019",
        speed: 352, weight: 743, engine: "Ferrari 064",
        drivers: "S. Vettel / C. Leclerc",
        line_droite: 100, virage_lent: 84, virage_rapide: 85,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2019,
        notes: "Voiture la plus rapide en ligne droite de l'ère hybride."
    },
    "w10": {
        name: "Mercedes W10", team: "Mercedes", year: "2019",
        speed: 340, weight: 743, engine: "Mercedes M10 EQ Power+",
        drivers: "L. Hamilton / V. Bottas",
        line_droite: 90, virage_lent: 95, virage_rapide: 97,
        color: "#00d2be", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2019
    },
    "rb15": {
        name: "Red Bull RB15", team: "Red Bull", year: "2019",
        speed: 336, weight: 743, engine: "Honda RA619H",
        drivers: "M. Verstappen / P. Gasly",
        line_droite: 84, virage_lent: 88, virage_rapide: 91,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2019
    },

    // ── 2018 ──────────────────────────────────────────────────
    "sf71h": {
        name: "Ferrari SF71H", team: "Ferrari", year: "2018",
        speed: 345, weight: 734, engine: "Ferrari 062",
        drivers: "S. Vettel / K. Räikkönen",
        line_droite: 96, virage_lent: 88, virage_rapide: 89,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2018
    },
    "w09": {
        name: "Mercedes W09", team: "Mercedes", year: "2018",
        speed: 338, weight: 733, engine: "Mercedes M09 EQ Power+",
        drivers: "L. Hamilton / V. Bottas",
        line_droite: 88, virage_lent: 92, virage_rapide: 95,
        color: "#00d2be", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2018
    },

    // ── 2016 ──────────────────────────────────────────────────
    "w07": {
        name: "Mercedes W07", team: "Mercedes", year: "2016",
        speed: 336, weight: 702, engine: "Mercedes PU106C",
        drivers: "L. Hamilton / N. Rosberg",
        line_droite: 91, virage_lent: 93, virage_rapide: 96,
        color: "#00d2be", image: "f1-logo.png",
        jolpicaId: "mercedes", jolpicaYear: 2016
    },
    "sf16h": {
        name: "Ferrari SF16-H", team: "Ferrari", year: "2016",
        speed: 340, weight: 702, engine: "Ferrari 061",
        drivers: "S. Vettel / K. Räikkönen",
        line_droite: 94, virage_lent: 82, virage_rapide: 84,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2016
    },

    // ── 2013 ──────────────────────────────────────────────────
    "rb9": {
        name: "Red Bull RB9", team: "Red Bull", year: "2013",
        speed: 330, weight: 642, engine: "Renault RS27-2013 V8",
        drivers: "S. Vettel / M. Webber",
        line_droite: 89, virage_lent: 95, virage_rapide: 99,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2013,
        notes: "9 victoires consécutives en fin de saison avec Vettel."
    },
    "f138": {
        name: "Ferrari F138", team: "Ferrari", year: "2013",
        speed: 332, weight: 642, engine: "Ferrari 056 V8",
        drivers: "F. Alonso / F. Massa",
        line_droite: 91, virage_lent: 85, virage_rapide: 87,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2013
    },
    "mp428": {
        name: "McLaren MP4-28", team: "McLaren", year: "2013",
        speed: 328, weight: 642, engine: "Mercedes FO108Z V8",
        drivers: "J. Button / S. Pérez",
        line_droite: 87, virage_lent: 80, virage_rapide: 82,
        color: "#c0c0c0", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2013
    },

    // ── 2011 ──────────────────────────────────────────────────
    "rb7": {
        name: "Red Bull RB7", team: "Red Bull", year: "2011",
        speed: 328, weight: 640, engine: "Renault RS27-2011 V8",
        drivers: "S. Vettel / M. Webber",
        line_droite: 87, virage_lent: 96, virage_rapide: 98,
        color: "#001c3d", image: "f1-logo.png",
        jolpicaId: "red_bull", jolpicaYear: 2011,
        notes: "15 victoires sur 19 courses — dominance absolue."
    },
    "mp426": {
        name: "McLaren MP4-26", team: "McLaren", year: "2011",
        speed: 325, weight: 640, engine: "Mercedes FO108W V8",
        drivers: "L. Hamilton / J. Button",
        line_droite: 90, virage_lent: 87, virage_rapide: 89,
        color: "#c0c0c0", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2011
    },

    // ── 2009 ──────────────────────────────────────────────────
    "brawn_bgp01": {
        name: "Brawn BGP001", team: "Brawn GP", year: "2009",
        speed: 315, weight: 605, engine: "Mercedes FO108W V8",
        drivers: "J. Button / R. Barrichello",
        line_droite: 85, virage_lent: 94, virage_rapide: 91,
        color: "#b8ff00", image: "f1-logo.png",
        jolpicaId: "brawn", jolpicaYear: 2009,
        notes: "Révolution du double diffuseur — 8 victoires en début de saison."
    },

    // ── 2008 ──────────────────────────────────────────────────
    "f2008": {
        name: "Ferrari F2008", team: "Ferrari", year: "2008",
        speed: 330, weight: 605, engine: "Ferrari 056 V8",
        drivers: "K. Räikkönen / F. Massa",
        line_droite: 92, virage_lent: 88, virage_rapide: 89,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2008,
        notes: "Massa à 1 point du titre à Abu Dhabi."
    },
    "mp423": {
        name: "McLaren MP4-23", team: "McLaren", year: "2008",
        speed: 328, weight: 605, engine: "Mercedes FO108V V8",
        drivers: "L. Hamilton / H. Kovalainen",
        line_droite: 90, virage_lent: 86, virage_rapide: 88,
        color: "#c0c0c0", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2008,
        notes: "Hamilton champion au dernier virage du dernier GP."
    },

    // ── 2004 ──────────────────────────────────────────────────
    "f2004": {
        name: "Ferrari F2004", team: "Ferrari", year: "2004",
        speed: 360, weight: 605, engine: "Ferrari V10 Tipo 053",
        drivers: "M. Schumacher / R. Barrichello",
        line_droite: 98, virage_lent: 90, virage_rapide: 98,
        color: "#e3001b", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2004,
        notes: "13 victoires sur 18 — la plus grande domination V10 de l'histoire."
    },
    "fw26": {
        name: "Williams FW26", team: "Williams", year: "2004",
        speed: 345, weight: 604, engine: "BMW P84/5 V10",
        drivers: "R. Schumacher / J-P. Montoya",
        line_droite: 95, virage_lent: 76, virage_rapide: 79,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 2004
    },

    // ── 2002 ──────────────────────────────────────────────────
    "f2002": {
        name: "Ferrari F2002", team: "Ferrari", year: "2002",
        speed: 355, weight: 600, engine: "Ferrari V10 Tipo 051",
        drivers: "M. Schumacher / R. Barrichello",
        line_droite: 97, virage_lent: 88, virage_rapide: 96,
        color: "#e3001b", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2002,
        notes: "Schumacher champion dès le 11e GP de la saison."
    },

    // ── 2000 ──────────────────────────────────────────────────
    "f1_2000": {
        name: "Ferrari F1-2000", team: "Ferrari", year: "2000",
        speed: 353, weight: 600, engine: "Ferrari V10 Tipo 049",
        drivers: "M. Schumacher / R. Barrichello",
        line_droite: 96, virage_lent: 87, virage_rapide: 93,
        color: "#e3001b", image: "f1-logo.png",
        jolpicaId: "ferrari", jolpicaYear: 2000,
        notes: "Premier titre mondial de Schumacher chez Ferrari."
    },
    "mp415": {
        name: "McLaren MP4-15", team: "McLaren", year: "2000",
        speed: 349, weight: 600, engine: "Mercedes FO110J V10",
        drivers: "M. Häkkinen / D. Coulthard",
        line_droite: 93, virage_lent: 85, virage_rapide: 91,
        color: "#c0c0c0", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 2000
    },

    // ── 1998 ──────────────────────────────────────────────────
    "mp413": {
        name: "McLaren MP4-13", team: "McLaren", year: "1998",
        speed: 332, weight: 600, engine: "Mercedes FO110G V10",
        drivers: "M. Häkkinen / D. Coulthard",
        line_droite: 90, virage_lent: 92, virage_rapide: 94,
        color: "#c0c0c0", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 1998,
        notes: "Häkkinen champion."
    },

    // ── 1996 ──────────────────────────────────────────────────
    "fw18": {
        name: "Williams FW18", team: "Williams", year: "1996",
        speed: 326, weight: 595, engine: "Renault RS8 V10",
        drivers: "D. Hill / J. Villeneuve",
        line_droite: 92, virage_lent: 88, virage_rapide: 90,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1996
    },

    // ── 1994 ──────────────────────────────────────────────────
    "fw16": {
        name: "Williams FW16", team: "Williams", year: "1994",
        speed: 318, weight: 515, engine: "Renault RS6 V10",
        drivers: "A. Senna / D. Hill",
        line_droite: 91, virage_lent: 88, virage_rapide: 89,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1994,
        notes: "Voiture de Senna lors de l'accident fatal à Imola."
    },
    "b194": {
        name: "Benetton B194", team: "Benetton", year: "1994",
        speed: 316, weight: 515, engine: "Ford Zetec-R V8",
        drivers: "M. Schumacher / J.J. Lehto",
        line_droite: 89, virage_lent: 86, virage_rapide: 88,
        color: "#006400", image: "f1-logo.png",
        jolpicaId: "benetton", jolpicaYear: 1994,
        notes: "Schumacher champion controversé — suspendu 2 GP."
    },

    // ── 1992 ──────────────────────────────────────────────────
    "fw14b": {
        name: "Williams FW14B", team: "Williams", year: "1992",
        speed: 322, weight: 505, engine: "Renault RS4 V10",
        drivers: "N. Mansell / R. Patrese",
        line_droite: 94, virage_lent: 97, virage_rapide: 96,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1992,
        notes: "Suspension active + contrôle de traction = révolution. Mansell champion."
    },
    "mp47": {
        name: "McLaren MP4/7A", team: "McLaren", year: "1992",
        speed: 318, weight: 505, engine: "Honda RA122E/B V12",
        drivers: "A. Senna / G. Berger",
        line_droite: 91, virage_lent: 88, virage_rapide: 87,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 1992
    },

    // ── 1989 ──────────────────────────────────────────────────
    "mp45": {
        name: "McLaren MP4/5", team: "McLaren", year: "1989",
        speed: 316, weight: 540, engine: "Honda RA109E V10",
        drivers: "A. Senna / A. Prost",
        line_droite: 88, virage_lent: 91, virage_rapide: 90,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 1989,
        notes: "Duel Senna-Prost — collision à Suzuka."
    },
    "fw12c": {
        name: "Williams FW12C", team: "Williams", year: "1989",
        speed: 314, weight: 540, engine: "Renault RS1 V10",
        drivers: "T. Boutsen / R. Patrese",
        line_droite: 87, virage_lent: 83, virage_rapide: 85,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1989
    },

    // ── 1988 ──────────────────────────────────────────────────
    "mp4_4": {
        name: "McLaren MP4/4", team: "McLaren", year: "1988",
        speed: 333, weight: 540, engine: "Honda RA168E V6 Turbo",
        drivers: "A. Senna / A. Prost",
        line_droite: 95, virage_lent: 94, virage_rapide: 92,
        color: "#ff0000", image: "mp4_4.jpg",
        jolpicaId: "mclaren", jolpicaYear: 1988,
        notes: "15 victoires sur 16 GP — record absolu toutes époques."
    },
    "fw11b": {
        name: "Williams FW11B", team: "Williams", year: "1987",
        speed: 327, weight: 540, engine: "Honda RA167E V6 Turbo",
        drivers: "N. Piquet / N. Mansell",
        line_droite: 93, virage_lent: 85, virage_rapide: 84,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1987,
        notes: "Piquet champion — Mansell fractures vertèbres à Suzuka."
    },

    // ── 1984 ──────────────────────────────────────────────────
    "mp4_2": {
        name: "McLaren MP4/2", team: "McLaren", year: "1984",
        speed: 322, weight: 540, engine: "TAG-Porsche TTE PO1 V6 Turbo",
        drivers: "N. Lauda / A. Prost",
        line_droite: 90, virage_lent: 88, virage_rapide: 89,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 1984,
        notes: "12 victoires sur 16 GP. Lauda bat Prost d'un demi-point."
    },

    // ── 1980 ──────────────────────────────────────────────────
    "fw07b": {
        name: "Williams FW07B", team: "Williams", year: "1980",
        speed: 297, weight: 585, engine: "Ford Cosworth DFV V8",
        drivers: "A. Jones / C. Reutemann",
        line_droite: 82, virage_lent: 88, virage_rapide: 90,
        color: "#005aff", image: "f1-logo.png",
        jolpicaId: "williams", jolpicaYear: 1980,
        notes: "Effet de sol — Jones champion."
    },
    "m29": {
        name: "McLaren M29", team: "McLaren", year: "1980",
        speed: 293, weight: 585, engine: "Ford Cosworth DFV V8",
        drivers: "J. Watson / A. Prost",
        line_droite: 80, virage_lent: 79, virage_rapide: 78,
        color: "#ff0000", image: "f1-logo.png",
        jolpicaId: "mclaren", jolpicaYear: 1980
    }
};

// ─────────────────────────────────────────────────────────────
//  FALLBACK STATIQUE — pour les données manquantes dans l'API
// ─────────────────────────────────────────────────────────────
const staticLapTimes = {
    "monza": {
        "rb20": 80.022, "sf24": 79.461, "mcl38": 79.327, "w15": 79.440,
        "rb19": 80.294, "sf23": 80.294, "mcl60": 80.527,
        "rb18": 80.631, "f1-75": 80.247, "w13": 81.2,
        "rb16b": 80.872, "w12": 80.983,
        "w11": 78.887, "rb16": 79.851,
        "sf90": 79.307, "w10": 79.599, "rb15": 80.153,
        "sf71h": 79.551, "w09": 79.977,
        "w07": 81.187, "sf16h": 81.396,
        "rb9": 83.060, "f138": 83.303, "mp428": 83.521,
        "rb7": 84.015, "mp426": 84.338,
        "mp423": 85.566, "f2008": 85.919,
        "f2004": 80.089, "fw26": 81.450,
        "f2002": 81.046, "f1_2000": 82.123, "mp415": 82.481,
        "mp413": 84.234, "fw18": 86.112,
        "fw16": 86.411, "b194": 86.718,
        "fw14b": 82.221, "mp47": 83.054,
        "mp45": 87.050, "fw12c": 87.6,
        "mp4_4": 85.988, "fw11b": 86.9,
        "mp4_2": 89.341, "fw07b": 97.620, "m29": 98.1,
    },
    "monaco": {
        "rb20": 70.567, "sf24": 70.270, "mcl38": 70.424, "w15": 70.699,
        "rb19": 70.391, "sf23": 70.690, "mcl60": 71.234,
        "rb18": 71.128, "f1-75": 71.376, "w13": 72.1,
        "rb16b": 70.882, "w12": 71.133,
        "w11": 70.557, "rb16": 71.399,
        "sf90": 70.935, "w10": 70.976, "rb15": 71.453,
        "sf71h": 70.810, "w09": 71.210,
        "w07": 72.338, "sf16h": 72.710,
        "rb9": 73.746, "f138": 74.099, "mp428": 74.521,
        "rb7": 74.208, "mp426": 74.812,
        "mp423": 74.749, "f2008": 74.811,
        "f2004": 73.983, "fw26": 74.553,
        "f2002": 74.230, "f1_2000": 74.479, "mp415": 75.112,
        "mp413": 76.258, "fw18": 78.123,
        "fw16": 79.451, "b194": 79.233,
        "fw14b": 79.451, "mp47": 80.291,
        "mp45": 80.965, "fw12c": 82.1,
        "mp4_4": 83.998, "fw11b": 86.1,
        "mp4_2": 91.256, "fw07b": 99.812, "m29": 100.5,
    },
    "silverstone": {
        "rb20": 86.732, "sf24": 86.509, "mcl38": 86.030, "w15": 85.819,
        "rb19": 85.703, "sf23": 85.888, "mcl60": 86.024,
        "rb18": 86.013, "f1-75": 86.358, "w13": 87.014,
        "rb16b": 85.990, "w12": 86.270,
        "w11": 85.988, "rb16": 87.032,
        "sf90": 85.172, "w10": 85.303, "rb15": 86.012,
        "sf71h": 85.995, "w09": 86.126,
        "w07": 87.060, "sf16h": 87.441,
        "rb9": 88.466, "f138": 88.812, "mp428": 88.923,
        "rb7": 88.548, "mp426": 89.102,
        "mp423": 87.227, "f2008": 87.560,
        "f2004": 78.233, "fw26": 78.891,
        "f2002": 79.011, "f1_2000": 80.123, "mp415": 80.601,
        "mp413": 82.576, "fw18": 83.991,
        "fw16": 84.889, "b194": 85.220,
        "fw14b": 80.511, "mp47": 81.233,
        "mp45": 88.712, "fw12c": 89.1,
        "mp4_4": 82.000, "fw11b": 81.989,
        "mp4_2": 87.650, "fw07b": 111.14, "m29": 112.0,
    },
    "spa": {
        "rb20": 103.912, "sf24": 103.691, "mcl38": 103.840, "w15": 104.102,
        "rb19": 103.358, "sf23": 103.758,
        "rb18": 104.007, "f1-75": 103.633, "w13": 104.782,
        "rb16b": 104.230, "w12": 103.841,
        "w11": 103.377, "rb16": 104.212,
        "sf90": 105.010, "w10": 105.212,
        "f2004": 96.179, "fw26": 97.102,
        "fw14b": 106.082, "mp47": 107.320,
        "mp4_4": 113.329, "fw11b": 115.118,
    },
    "suzuka": {
        "rb20": 88.197, "sf24": 88.521, "mcl38": 88.680, "w15": 89.012,
        "rb19": 87.814, "sf90": 89.457, "w10": 89.650,
        "f2004": 86.176, "fw14b": 93.905, "mp4_4": 95.083,
    }
};

// ─────────────────────────────────────────────────────────────
//  CIRCUITS
// ─────────────────────────────────────────────────────────────
const circuits = {
    "monza":       { name: "🇮🇹 Monza",            baseTime: 79.327, lap_km: 5.793 },
    "monaco":      { name: "🇲🇨 Monaco",            baseTime: 70.270, lap_km: 3.337 },
    "silverstone": { name: "🇬🇧 Silverstone",       baseTime: 85.819, lap_km: 5.891 },
    "spa":         { name: "🇧🇪 Spa-Francorchamps", baseTime: 103.691, lap_km: 7.004 },
    "suzuka":      { name: "🇯🇵 Suzuka",            baseTime: 88.197, lap_km: 5.807 }
};

let radarChartInstance = null;

// ─────────────────────────────────────────────────────────────
//  API JOLPICA — Récupère les qualifs d'un circuit pour une année
//  Retourne un objet { constructorId: timeInSeconds }
// ─────────────────────────────────────────────────────────────
async function fetchQualifyingFromAPI(circuitId, year) {
    const cacheKey = `${circuitId}_${year}`;
    if (apiCache[cacheKey] !== undefined) return apiCache[cacheKey];

    const jolpicaCircuit = CIRCUIT_ID_MAP[circuitId];
    if (!jolpicaCircuit) { apiCache[cacheKey] = null; return null; }

    const url = `${API_BASE}/${year}/circuits/${jolpicaCircuit}/qualifying.json?limit=5`;

    try {
        const res = await fetch(url);
        if (!res.ok) { apiCache[cacheKey] = null; return null; }
        const data = await res.json();

        const races = data?.MRData?.RaceTable?.Races;
        if (!races || races.length === 0) { apiCache[cacheKey] = null; return null; }

        const qualResults = races[0].QualifyingResults || [];
        const timeMap = {};

        qualResults.forEach(result => {
            const ctor = result.Constructor?.constructorId;
            const times = [result.Q1, result.Q2, result.Q3]
                .filter(Boolean)
                .map(parseQualTime)
                .filter(t => t > 0);
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

// "1:22.221" → 82.221
function parseQualTime(t) {
    if (!t) return 0;
    const p = t.split(':');
    return p.length === 2 ? parseInt(p[0]) * 60 + parseFloat(p[1]) : parseFloat(t) || 0;
}

// ─────────────────────────────────────────────────────────────
//  RÉSOLUTION DU TEMPS
//  1. API Jolpica  →  2. Statique vérifié  →  3. Estimation
// ─────────────────────────────────────────────────────────────
async function getLapTime(carKey, circuitKey) {
    const car = cars[carKey];

    // 1. API
    if (car.jolpicaId && car.jolpicaYear) {
        const data = await fetchQualifyingFromAPI(circuitKey, car.jolpicaYear);
        if (data && data[car.jolpicaId]) {
            return { time: data[car.jolpicaId], isReal: true, source: 'api' };
        }
    }

    // 2. Statique
    const t = staticLapTimes[circuitKey]?.[carKey];
    if (t) return { time: t, isReal: true, source: 'static' };

    // 3. Estimation
    const base = circuits[circuitKey].baseTime;
    const delta = (2024 - (parseInt(car.year) || 2024)) * 0.4;
    return { time: base + delta, isReal: false, source: 'estimate' };
}

// ─────────────────────────────────────────────────────────────
//  INITIALISATION
// ─────────────────────────────────────────────────────────────
function init() {
    const sc = document.getElementById('select-circuit');
    sc.innerHTML = "";
    for (let key in circuits) {
        const opt = document.createElement('option');
        opt.value = key; opt.text = circuits[key].name;
        sc.appendChild(opt);
    }
    const years = [...new Set(Object.values(cars).map(c => c.year))].filter(y => y).sort((a, b) => b - a);
    for (let i = 1; i <= 3; i++) {
        const ys = document.getElementById('select-year' + i);
        ys.innerHTML = '<option value="all">Toutes les années</option>';
        years.forEach(y => ys.innerHTML += `<option value="${y}">${y}</option>`);
        filterCarsBySlot(i);
    }
}

function filterCarsBySlot(id) {
    const year = document.getElementById('select-year' + id).value;
    const sc = document.getElementById('select' + id);
    const current = sc.value;
    sc.innerHTML = '<option value="none">— Choisir un modèle —</option>';
    for (let key in cars) {
        if (key !== "none" && (year === "all" || cars[key].year === year))
            sc.innerHTML += `<option value="${key}">${cars[key].name} (${cars[key].year})</option>`;
    }
    sc.value = [...sc.options].some(o => o.value === current) ? current : "none";
    updatePreview(id);
}

function updatePreview(id) {
    const key = document.getElementById('select' + id).value;
    const img = document.querySelector(`#preview${id} img`);
    img.src = "images/" + (cars[key]?.image || "f1-logo.png");
    img.onerror = () => { img.src = "images/f1-logo.png"; };
}

function formatTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${(s % 60).toFixed(3).padStart(6, '0')}`;
}

// ─────────────────────────────────────────────────────────────
//  DÉCLENCHEMENT
// ─────────────────────────────────────────────────────────────
function preparerComparaison() {
    const keys = [1, 2, 3].map(i => document.getElementById('select' + i).value).filter(v => v !== "none");
    if (keys.length < 2) return alert("⚠️ Sélectionne au moins 2 monoplaces !");
    if (new Set(keys).size !== keys.length) return alert("⚠️ Deux fois la même voiture !");

    const loader = document.getElementById('loader');
    loader.style.display = "flex";
    loader.querySelector('h2').textContent = "CONNEXION API F1...";
    lancerDuel(keys);
}

// ─────────────────────────────────────────────────────────────
//  DUEL (async)
// ─────────────────────────────────────────────────────────────
async function lancerDuel(keys) {
    const circuit = document.getElementById('select-circuit').value;
    const grid = document.getElementById('comparison-grid');
    grid.innerHTML = "";
    document.getElementById('winner-zone').innerHTML = "";

    try {
        const lapData = await Promise.all(keys.map(k => getLapTime(k, circuit)));
        document.getElementById('loader').style.display = "none";

        const results = keys.map((k, i) => ({ ...cars[k], key: k, ...lapData[i] }))
                            .sort((a, b) => a.time - b.time);

        const gap = results.length > 1 ? `+${(results[1].time - results[0].time).toFixed(3)}s sur ${results[1].name}` : "";
        document.getElementById('winner-zone').innerHTML = `
            <div class="winner-banner">
                🏆 VAINQUEUR : ${results[0].name} (${formatTime(results[0].time)})
                ${gap ? `<span class="winner-gap">${gap}</span>` : ""}
            </div>`;
        document.body.className = "theme-" + results[0].key;

        results.forEach((c, i) => {
            const badge = c.source === 'api'
                ? `<span class="real-time-badge" title="Temps réel via API Jolpica F1">🌐 API</span>`
                : c.isReal
                    ? `<span class="real-time-badge" title="Temps de qualification réel vérifié">🎯 RÉEL</span>`
                    : `<span class="est-time-badge" title="Estimation technologique">📐 ESTIMÉ</span>`;

            grid.insertAdjacentHTML('beforeend', `
                <div class="car-card podium-${i + 1}" onclick="showDetails('${c.key}')">
                    <div class="overall-rank">${["🥇","🥈","🥉"][i] || "#"+(i+1)}</div>
                    <div class="lap-time">${formatTime(c.time)} ${badge}</div>
                    <div class="car-card-img"><img src="images/${c.image||'f1-logo.png'}" onerror="this.src='images/f1-logo.png'"></div>
                    <h3>${c.name}</h3>
                    <p class="card-sub">${c.team} · ${c.year}</p>
                    <div class="dynamic-stat-group">
                        <div class="dynamic-stat-label">Vmax <span>${c.speed} km/h</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${(c.speed/370)*100}%"></div></div>
                        <div class="dynamic-stat-label">Ligne droite <span>${c.line_droite}/100</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${c.line_droite}%"></div></div>
                        <div class="dynamic-stat-label">Virage rapide <span>${c.virage_rapide}/100</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${c.virage_rapide}%"></div></div>
                    </div>
                    ${c.notes ? `<div class="car-note">ℹ️ ${c.notes}</div>` : ""}
                    <div class="card-hint">Clique pour la fiche technique</div>
                </div>`);
        });

        updateRadar(results);
        window.scrollTo({ top: document.getElementById('winner-zone').offsetTop - 20, behavior: 'smooth' });

    } catch (err) {
        document.getElementById('loader').style.display = "none";
        console.error(err);
        alert("Erreur lors du chargement. Vérifiez votre connexion internet.");
    }
}

// ─────────────────────────────────────────────────────────────
//  RADAR CHART
// ─────────────────────────────────────────────────────────────
function updateRadar(data) {
    document.getElementById('chart-zone').style.display = "block";
    const ctx = document.getElementById('radarChart').getContext('2d');
    if (radarChartInstance) radarChartInstance.destroy();
    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Ligne Droite', 'Virage Lent', 'Virage Rapide', 'Vitesse Max', 'Légèreté'],
            datasets: data.map(c => {
                const safeColor = (c.color === "#ffffff" || c.color === "#000000") ? "#aaaaaa" : c.color;
                return {
                    label: `${c.name} (${c.year})`,
                    data: [c.line_droite, c.virage_lent, c.virage_rapide,
                           Math.round((c.speed/370)*100),
                           Math.round((1-(c.weight-500)/400)*100)],
                    borderColor: safeColor,
                    backgroundColor: safeColor + '33',
                    pointBackgroundColor: safeColor,
                    borderWidth: 2, pointRadius: 4
                };
            })
        },
        options: {
            responsive: true,
            scales: { r: {
                min: 60, max: 100,
                grid: { color: '#333' }, angleLines: { color: '#444' },
                pointLabels: { color: '#fff', font: { family: 'Rajdhani', size: 13, weight: 'bold' } },
                ticks: { display: false }
            }},
            plugins: { legend: { labels: { color: '#ddd', font: { family: 'Rajdhani', size: 13 }, boxWidth: 14 } } }
        }
    });
}

// ─────────────────────────────────────────────────────────────
//  MODALE — FICHE TECHNIQUE
// ─────────────────────────────────────────────────────────────
function showDetails(key) {
    const c = cars[key];
    const color = (c.color === "#ffffff" || c.color === "#000000") ? "#ff003c" : c.color;
    document.getElementById('modal-body').innerHTML = `
        <h2 style="color:${color}">${c.name}</h2>
        <p class="modal-sub">${c.team} · Saison ${c.year}</p>
        <div class="tech-specs">
            <div><span>ÉCURIE</span>${c.team}</div>
            <div><span>SAISON</span>${c.year}</div>
            <div><span>MOTEUR</span>${c.engine}</div>
            <div><span>PILOTES</span>${c.drivers}</div>
            <div><span>POIDS</span>${c.weight} kg</div>
            <div><span>VITESSE MAX</span>${c.speed} km/h</div>
            <div><span>LIGNE DROITE</span>${c.line_droite}/100</div>
            <div><span>VIRAGE LENT</span>${c.virage_lent}/100</div>
            <div><span>VIRAGE RAPIDE</span>${c.virage_rapide}/100</div>
        </div>
        ${c.notes ? `<div class="modal-note">📖 ${c.notes}</div>` : ""}`;
    document.getElementById('modal').style.display = "block";
}

function closeModal() { document.getElementById('modal').style.display = "none"; }

function resetAll() {
    document.getElementById('winner-zone').innerHTML = "";
    document.getElementById('comparison-grid').innerHTML = "";
    document.getElementById('chart-zone').style.display = "none";
    document.body.className = "";
    if (radarChartInstance) { radarChartInstance.destroy(); radarChartInstance = null; }
    for (let i = 1; i <= 3; i++) {
        document.getElementById('select' + i).value = "none";
        document.getElementById('select-year' + i).value = "all";
        filterCarsBySlot(i);
    }
    document.getElementById('select-circuit').selectedIndex = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

init();