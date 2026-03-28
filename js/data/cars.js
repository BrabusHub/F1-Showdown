// F1 Showdown — catalogue monoplaces
// jolpicaId / jolpicaYear = API Jolpica (Ergast)
export const cars = {
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
