/**
 * F1 Showdown — point d’entrée UI (sélecteurs, duel, graphique, modale)
 */
import { cars } from "./data/cars.js";
import { circuits } from "./data/circuits.js";
import { getLapTime } from "./api/lapTimes.js";

let radarChartInstance = null;

function init() {
    const sc = document.getElementById("select-circuit");
    sc.innerHTML = "";
    for (const key in circuits) {
        const opt = document.createElement("option");
        opt.value = key;
        opt.text = circuits[key].name;
        sc.appendChild(opt);
    }
    const years = [...new Set(Object.values(cars).map((c) => c.year))]
        .filter(Boolean)
        .sort((a, b) => b - a);
    for (let i = 1; i <= 3; i++) {
        const ys = document.getElementById("select-year" + i);
        ys.innerHTML = '<option value="all">Toutes les années</option>';
        years.forEach((y) => {
            ys.innerHTML += `<option value="${y}">${y}</option>`;
        });
        filterCarsBySlot(i);
    }
}

function filterCarsBySlot(id) {
    const year = document.getElementById("select-year" + id).value;
    const sc = document.getElementById("select" + id);
    const current = sc.value;
    sc.innerHTML = '<option value="none">— Choisir un modèle —</option>';
    for (const key in cars) {
        if (key !== "none" && (year === "all" || cars[key].year === year))
            sc.innerHTML += `<option value="${key}">${cars[key].name} (${cars[key].year})</option>`;
    }
    sc.value = [...sc.options].some((o) => o.value === current) ? current : "none";
    updatePreview(id);
}

function updatePreview(id) {
    const key = document.getElementById("select" + id).value;
    const img = document.querySelector(`#preview${id} img`);
    img.src = "images/" + (cars[key]?.image || "f1-logo.png");
    img.onerror = () => {
        img.src = "images/f1-logo.png";
    };
}

function formatTime(s) {
    const m = Math.floor(s / 60);
    return `${m}:${(s % 60).toFixed(3).padStart(6, "0")}`;
}

function preparerComparaison() {
    const keys = [1, 2, 3]
        .map((i) => document.getElementById("select" + i).value)
        .filter((v) => v !== "none");
    if (keys.length < 2) return alert("⚠️ Sélectionne au moins 2 monoplaces !");
    if (new Set(keys).size !== keys.length) return alert("⚠️ Deux fois la même voiture !");

    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    loader.querySelector("h2").textContent = "CONNEXION API F1...";
    lancerDuel(keys);
}

async function lancerDuel(keys) {
    const circuit = document.getElementById("select-circuit").value;
    const grid = document.getElementById("comparison-grid");
    grid.innerHTML = "";
    document.getElementById("winner-zone").innerHTML = "";

    try {
        const lapData = await Promise.all(keys.map((k) => getLapTime(k, circuit)));
        document.getElementById("loader").style.display = "none";

        const results = keys
            .map((k, i) => ({ ...cars[k], key: k, ...lapData[i] }))
            .sort((a, b) => a.time - b.time);

        const gap =
            results.length > 1
                ? `+${(results[1].time - results[0].time).toFixed(3)}s sur ${results[1].name}`
                : "";
        document.getElementById("winner-zone").innerHTML = `
            <div class="winner-banner">
                🏆 VAINQUEUR : ${results[0].name} (${formatTime(results[0].time)})
                ${gap ? `<span class="winner-gap">${gap}</span>` : ""}
            </div>`;
        document.body.className = "theme-" + results[0].key;

        results.forEach((c, i) => {
            const badge =
                c.source === "api"
                    ? `<span class="real-time-badge" title="Temps réel via API Jolpica F1">🌐 API</span>`
                    : c.isReal
                      ? `<span class="real-time-badge" title="Temps de qualification réel vérifié">🎯 RÉEL</span>`
                      : `<span class="est-time-badge" title="Estimation technologique">📐 ESTIMÉ</span>`;

            grid.insertAdjacentHTML(
                "beforeend",
                `
                <div class="car-card podium-${i + 1}" onclick="showDetails('${c.key}')">
                    <div class="overall-rank">${["🥇", "🥈", "🥉"][i] || "#" + (i + 1)}</div>
                    <div class="lap-time">${formatTime(c.time)} ${badge}</div>
                    <div class="car-card-img"><img src="images/${c.image || "f1-logo.png"}" onerror="this.src='images/f1-logo.png'"></div>
                    <h3>${c.name}</h3>
                    <p class="card-sub">${c.team} · ${c.year}</p>
                    <div class="dynamic-stat-group">
                        <div class="dynamic-stat-label">Vmax <span>${c.speed} km/h</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${(c.speed / 370) * 100}%"></div></div>
                        <div class="dynamic-stat-label">Ligne droite <span>${c.line_droite}/100</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${c.line_droite}%"></div></div>
                        <div class="dynamic-stat-label">Virage rapide <span>${c.virage_rapide}/100</span></div>
                        <div class="dynamic-stat-bar"><div class="dynamic-stat-fill" style="width:${c.virage_rapide}%"></div></div>
                    </div>
                    ${c.notes ? `<div class="car-note">ℹ️ ${c.notes}</div>` : ""}
                    <div class="card-hint">Clique pour la fiche technique</div>
                </div>`,
            );
        });

        updateRadar(results);
        window.scrollTo({
            top: document.getElementById("winner-zone").offsetTop - 20,
            behavior: "smooth",
        });
    } catch (err) {
        document.getElementById("loader").style.display = "none";
        console.error(err);
        alert("Erreur lors du chargement. Vérifiez votre connexion internet.");
    }
}

function updateRadar(data) {
    document.getElementById("chart-zone").style.display = "block";
    const ctx = document.getElementById("radarChart").getContext("2d");
    if (radarChartInstance) radarChartInstance.destroy();
    radarChartInstance = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Ligne Droite", "Virage Lent", "Virage Rapide", "Vitesse Max", "Légèreté"],
            datasets: data.map((c) => {
                const safeColor = c.color === "#ffffff" || c.color === "#000000" ? "#aaaaaa" : c.color;
                return {
                    label: `${c.name} (${c.year})`,
                    data: [
                        c.line_droite,
                        c.virage_lent,
                        c.virage_rapide,
                        Math.round((c.speed / 370) * 100),
                        Math.round((1 - (c.weight - 500) / 400) * 100),
                    ],
                    borderColor: safeColor,
                    backgroundColor: safeColor + "33",
                    pointBackgroundColor: safeColor,
                    borderWidth: 2,
                    pointRadius: 4,
                };
            }),
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    min: 60,
                    max: 100,
                    grid: { color: "#333" },
                    angleLines: { color: "#444" },
                    pointLabels: { color: "#fff", font: { family: "Rajdhani", size: 13, weight: "bold" } },
                    ticks: { display: false },
                },
            },
            plugins: {
                legend: { labels: { color: "#ddd", font: { family: "Rajdhani", size: 13 }, boxWidth: 14 } },
            },
        },
    });
}

function showDetails(key) {
    const c = cars[key];
    const color = c.color === "#ffffff" || c.color === "#000000" ? "#ff003c" : c.color;
    document.getElementById("modal-body").innerHTML = `
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
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function resetAll() {
    document.getElementById("winner-zone").innerHTML = "";
    document.getElementById("comparison-grid").innerHTML = "";
    document.getElementById("chart-zone").style.display = "none";
    document.body.className = "";
    if (radarChartInstance) {
        radarChartInstance.destroy();
        radarChartInstance = null;
    }
    for (let i = 1; i <= 3; i++) {
        document.getElementById("select" + i).value = "none";
        document.getElementById("select-year" + i).value = "all";
        filterCarsBySlot(i);
    }
    document.getElementById("select-circuit").selectedIndex = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

Object.assign(window, {
    filterCarsBySlot,
    updatePreview,
    preparerComparaison,
    resetAll,
    closeModal,
    showDetails,
});

init();
