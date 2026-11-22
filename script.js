const title = document.getElementById("main-title");
const blackScreen = document.getElementById("black-screen");
const bgBlood = document.getElementById("bg-blood");

// 1. Découpe automatiquement le texte du titre en lettres individuelles
const text = title.textContent;
title.textContent = "";

const letters = [];
for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i] === " " ? "\u00A0" : text[i];
    span.classList.add("letter");

    if (i < text.length / 2) {
        span.classList.add("go-left");
    } else {
        span.classList.add("go-right");
    }

    title.appendChild(span);
    letters.push(span);
}

// 2. Déclenchement de la séquence au clic sur le titre
let isTriggered = false;

title.addEventListener("click", () => {
    if (isTriggered) return;
    isTriggered = true;

    title.classList.add("animating");

    letters.forEach((letter, index) => {
        if (index < letters.length / 2) {
            letter.classList.add("shoot-left");
        } else {
            letter.classList.add("shoot-right");
        }
    });

    setTimeout(() => {
        title.classList.add("finished");
        blackScreen.style.opacity = "1";
    }, 700);

    setTimeout(() => {
        bgBlood.style.opacity = "1";
        blackScreen.style.opacity = "0";

        setTimeout(() => {
            document.getElementById("side-menu").classList.remove("hidden");
        }, 400);
    }, 1300);
});

// =========================================================
// --- LOGIQUE : MAGASIN, AMÉLIORATIONS & 5 DIFFICULTÉS ---
// =========================================================

let money = 500;

const weapons = [
    {
        id: "barre_fer",
        name: "Barre de fer",
        image: "image_c93845.png",
        price: 0,
        owned: true,
        level: 1,
        maxLevel: 5,
        upgradeCost: 80,
        stats: {
            ammo: 1,
            reloadTime: 0.4,
            fireRate: 1.5,
            dmgClose: 18,
            dmgMid: 14,
            dmgFar: 6
        },
        step: {
            ammo: 0,
            reloadTime: -0.04,
            fireRate: 0.15,
            dmgClose: 6,
            dmgMid: 5,
            dmgFar: 2
        }
    },
    {
        id: "pistolet_9mm",
        name: "Pistolet 9mm",
        image: "image_c938c2.png",
        price: 200,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 120,
        stats: {
            ammo: 15,
            reloadTime: 1.3,
            fireRate: 4.5,
            dmgClose: 28,
            dmgMid: 22,
            dmgFar: 14
        },
        step: {
            ammo: 2,
            reloadTime: -0.1,
            fireRate: 0.3,
            dmgClose: 7,
            dmgMid: 6,
            dmgFar: 4
        }
    },
    {
        id: "revolver_357",
        name: "Revolver .357",
        image: "image_c93bc8.png",
        price: 350,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 160,
        stats: {
            ammo: 6,
            reloadTime: 1.7,
            fireRate: 2.4,
            dmgClose: 55,
            dmgMid: 46,
            dmgFar: 34
        },
        step: {
            ammo: 1,
            reloadTime: -0.12,
            fireRate: 0.2,
            dmgClose: 12,
            dmgMid: 10,
            dmgFar: 8
        }
    },
    {
        id: "fusil_pompe",
        name: "Fusil à pompe",
        image: "image_c93c2b.png",
        price: 450,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 200,
        stats: {
            ammo: 8,
            reloadTime: 2.1,
            fireRate: 1.3,
            dmgClose: 95,
            dmgMid: 52,
            dmgFar: 18
        },
        step: {
            ammo: 2,
            reloadTime: -0.15,
            fireRate: 0.15,
            dmgClose: 18,
            dmgMid: 10,
            dmgFar: 5
        }
    },
    {
        id: "pistolet_mitrailleur",
        name: "Pistolet-mitrailleur",
        image: "image_c93fad.jpg",
        price: 600,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 240,
        stats: {
            ammo: 30,
            reloadTime: 1.6,
            fireRate: 10.5,
            dmgClose: 24,
            dmgMid: 18,
            dmgFar: 10
        },
        step: {
            ammo: 5,
            reloadTime: -0.1,
            fireRate: 0.6,
            dmgClose: 5,
            dmgMid: 4,
            dmgFar: 2
        }
    },
    {
        id: "fusil_assaut",
        name: "Fusil d'assaut",
        image: "image_c99201.jpg",
        price: 780,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 280,
        stats: {
            ammo: 32,
            reloadTime: 1.9,
            fireRate: 8.2,
            dmgClose: 38,
            dmgMid: 34,
            dmgFar: 26
        },
        step: {
            ammo: 4,
            reloadTime: -0.12,
            fireRate: 0.4,
            dmgClose: 8,
            dmgMid: 7,
            dmgFar: 6
        }
    },
    {
        id: "fusil_precision",
        name: "Fusil de précision",
        image: "image_c99ddc.jpg",
        price: 950,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 320,
        stats: {
            ammo: 5,
            reloadTime: 2.4,
            fireRate: 1.1,
            dmgClose: 110,
            dmgMid: 135,
            dmgFar: 165
        },
        step: {
            ammo: 1,
            reloadTime: -0.15,
            fireRate: 0.1,
            dmgClose: 20,
            dmgMid: 25,
            dmgFar: 32
        }
    },
    {
        id: "mitrailleuse_lourde",
        name: "Mitrailleuse lourde",
        image: "image_c9a941.jpg",
        price: 1150,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 360,
        stats: {
            ammo: 100,
            reloadTime: 3.4,
            fireRate: 11.5,
            dmgClose: 44,
            dmgMid: 39,
            dmgFar: 29
        },
        step: {
            ammo: 15,
            reloadTime: -0.2,
            fireRate: 0.5,
            dmgClose: 9,
            dmgMid: 8,
            dmgFar: 6
        }
    },
    {
        id: "lance_roquettes",
        name: "Lance-roquettes",
        image: "image_c9b084.jpg",
        price: 1400,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 420,
        stats: {
            ammo: 1,
            reloadTime: 3.2,
            fireRate: 0.7,
            dmgClose: 190,
            dmgMid: 210,
            dmgFar: 220
        },
        step: {
            ammo: 0,
            reloadTime: -0.2,
            fireRate: 0.08,
            dmgClose: 35,
            dmgMid: 40,
            dmgFar: 45
        }
    },
    {
        id: "grenade",
        name: "Grenade M-26",
        image: "image_c9b3af.jpg",
        price: 300,
        owned: false,
        level: 1,
        maxLevel: 5,
        upgradeCost: 140,
        stats: {
            ammo: 3,
            reloadTime: 1.5,
            fireRate: 1.2,
            dmgClose: 140,
            dmgMid: 95,
            dmgFar: 30
        },
        step: {
            ammo: 1,
            reloadTime: -0.1,
            fireRate: 0.1,
            dmgClose: 28,
            dmgMid: 20,
            dmgFar: 8
        }
    }
];

const difficulties = [
    { level: 1, name: "Débutant", rewardMult: "Récompense x1.0" },
    { level: 2, name: "Survivant", rewardMult: "Récompense x1.3" },
    { level: 3, name: "Vétéran", rewardMult: "Récompense x1.7" },
    { level: 4, name: "Cauchemar", rewardMult: "Récompense x2.2" },
    { level: 5, name: "Enfer Absolu", rewardMult: "Récompense x3.0" }
];

let equippedWeaponId = "barre_fer";
let selectedUpgradeWeaponId = "barre_fer";

const sideMenu = document.getElementById("side-menu");
const moneyDisplay = document.getElementById("player-money");
const shopMoneyDisplay = document.getElementById("shop-money");
const upgradeMoneyDisplay = document.getElementById("upgrade-money");
const panelShop = document.getElementById("panel-shop");
const panelUpgrade = document.getElementById("panel-upgrade");
const difficultyScreen = document.getElementById("difficulty-screen");

function updateMoneyUI() {
    moneyDisplay.textContent = money;
    shopMoneyDisplay.textContent = money;
    upgradeMoneyDisplay.textContent = money;
}

function getStatsAtLevel(weapon, level) {
    const diff = level - 1;
    const reloadTime = Math.max(0.15, +(weapon.stats.reloadTime + diff * weapon.step.reloadTime).toFixed(2));
    const fireRate = +(weapon.stats.fireRate + diff * weapon.step.fireRate).toFixed(2);
    return {
        ammo: Math.round(weapon.stats.ammo + diff * weapon.step.ammo),
        reloadTime,
        fireRate,
        dmgClose: Math.round(weapon.stats.dmgClose + diff * weapon.step.dmgClose),
        dmgMid: Math.round(weapon.stats.dmgMid + diff * weapon.step.dmgMid),
        dmgFar: Math.round(weapon.stats.dmgFar + diff * weapon.step.dmgFar)
    };
}

function formatRangeDamage(s) {
    return `Proche ${s.dmgClose} / Moy. ${s.dmgMid} / Loin ${s.dmgFar}`;
}

function renderStatsRows(s) {
    return `
        <div class="stat-row"><span class="stat-label">Munitions</span><span class="stat-val">${s.ammo}</span></div>
        <div class="stat-row"><span class="stat-label">Temps rechargement</span><span class="stat-val">${s.reloadTime} s</span></div>
        <div class="stat-row"><span class="stat-label">Vitesse de tir</span><span class="stat-val">${s.fireRate} /s</span></div>
        <div class="stat-row"><span class="stat-label">Dégâts / distance</span><span class="stat-val">${formatRangeDamage(s)}</span></div>
    `;
}

document.getElementById("btn-shop").addEventListener("click", () => {
    panelUpgrade.classList.add("hidden");
    panelShop.classList.toggle("hidden");
    updateMoneyUI();
    renderShop();
});

document.getElementById("btn-upgrade").addEventListener("click", () => {
    panelShop.classList.add("hidden");
    panelUpgrade.classList.toggle("hidden");
    updateMoneyUI();
    renderUpgrades();
});

document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.close).classList.add("hidden");
    });
});

function renderShop() {
    updateMoneyUI();
    const shopList = document.getElementById("shop-list");
    shopList.innerHTML = "";

    weapons.forEach(w => {
        const s = getStatsAtLevel(w, w.level);
        const card = document.createElement("div");
        card.className = "weapon-box-card";

        let actionHtml = "";
        if (w.owned) {
            const isEquipped = equippedWeaponId === w.id;
            actionHtml = `
                <button class="action-btn" onclick="equipWeapon('${w.id}')" ${isEquipped ? "disabled" : ""}>
                    ${isEquipped ? "ÉQUIPÉE" : "ÉQUIPER"}
                </button>
            `;
        } else {
            const canAfford = money >= w.price;
            actionHtml = `
                <button class="action-btn" onclick="buyWeapon('${w.id}')" ${!canAfford ? "disabled" : ""}>
                    Acheter
                </button>
            `;
        }

        const priceText = w.owned ? `Possédée (Niv. ${w.level})` : `Prix : ${w.price} $`;

        card.innerHTML = `
            <div class="weapon-left-box">
                <h3 class="weapon-name">${w.name}</h3>
                <div class="weapon-img-wrap">
                    <img src="${w.image}" alt="${w.name}">
                </div>
                <div class="weapon-bottom-footer">
                    <span class="weapon-price-tag">${priceText}</span>
                    ${actionHtml}
                </div>
            </div>
            <div class="weapon-right-stats">
                ${renderStatsRows(s)}
            </div>
        `;
        shopList.appendChild(card);
    });
}

window.buyWeapon = function(id) {
    const weapon = weapons.find(w => w.id === id);
    if (weapon && !weapon.owned && money >= weapon.price) {
        money -= weapon.price;
        weapon.owned = true;
        equippedWeaponId = weapon.id;
        updateMoneyUI();
        renderShop();
    }
};

window.equipWeapon = function(id) {
    const weapon = weapons.find(w => w.id === id);
    if (weapon && weapon.owned) {
        equippedWeaponId = weapon.id;
        renderShop();
    }
};

function renderUpgrades() {
    updateMoneyUI();
    const upgradeList = document.getElementById("upgrade-list");
    const placeholder = document.getElementById("compare-placeholder");
    const compareBoxes = document.getElementById("compare-boxes");

    upgradeList.innerHTML = "";
    const ownedWeapons = weapons.filter(w => w.owned);

    if (ownedWeapons.length === 0) {
        upgradeList.innerHTML = `<p class="empty-msg">Vous ne possédez aucune arme à améliorer.</p>`;
        compareBoxes.classList.add("hidden");
        placeholder.classList.remove("hidden");
        return;
    }

    if (!ownedWeapons.some(w => w.id === selectedUpgradeWeaponId)) {
        selectedUpgradeWeaponId = ownedWeapons[0].id;
    }

    ownedWeapons.forEach(w => {
        const s = getStatsAtLevel(w, w.level);
        const isSelected = w.id === selectedUpgradeWeaponId;

        const card = document.createElement("div");
        card.className = `weapon-box-card selectable ${isSelected ? "selected" : ""}`;
        card.innerHTML = `
            <div class="weapon-left-box">
                <h3 class="weapon-name">${w.name} (Niv. ${w.level}/${w.maxLevel})</h3>
                <div class="weapon-img-wrap">
                    <img src="${w.image}" alt="${w.name}">
                </div>
            </div>
            <div class="weapon-right-stats">
                ${renderStatsRows(s)}
            </div>
        `;
        card.addEventListener("click", () => {
            selectedUpgradeWeaponId = w.id;
            renderUpgrades();
        });
        upgradeList.appendChild(card);
    });

    renderUpgradeComparison(selectedUpgradeWeaponId);
}

function renderUpgradeComparison(id) {
    const placeholder = document.getElementById("compare-placeholder");
    const compareBoxes = document.getElementById("compare-boxes");
    const weapon = weapons.find(w => w.id === id && w.owned);

    if (!weapon) {
        compareBoxes.classList.add("hidden");
        placeholder.classList.remove("hidden");
        return;
    }

    placeholder.classList.add("hidden");
    compareBoxes.classList.remove("hidden");

    const currentStats = getStatsAtLevel(weapon, weapon.level);
    const isMax = weapon.level >= weapon.maxLevel;
    const nextLevel = isMax ? weapon.maxLevel : weapon.level + 1;
    const nextStats = getStatsAtLevel(weapon, nextLevel);

    document.getElementById("compare-current-name").textContent = `${weapon.name} — Niv. ${weapon.level}`;
    document.getElementById("compare-current-stats").innerHTML = `
        <div class="compare-stat-item"><span>Munitions</span><strong>${currentStats.ammo}</strong></div>
        <div class="compare-stat-item"><span>Temps de rechargement</span><strong>${currentStats.reloadTime} s</strong></div>
        <div class="compare-stat-item"><span>Vitesse de tir</span><strong>${currentStats.fireRate} /s</strong></div>
        <div class="compare-stat-item"><span>Dégâts par distance</span><strong>${formatRangeDamage(currentStats)}</strong></div>
    `;

    document.getElementById("compare-next-name").textContent = isMax
        ? `${weapon.name} — NIVEAU MAX`
        : `${weapon.name} — Niv. ${nextLevel}`;

    document.getElementById("compare-next-stats").innerHTML = `
        <div class="compare-stat-item"><span>Munitions</span><strong>${nextStats.ammo}</strong></div>
        <div class="compare-stat-item"><span>Temps de rechargement</span><strong>${nextStats.reloadTime} s</strong></div>
        <div class="compare-stat-item"><span>Vitesse de tir</span><strong>${nextStats.fireRate} /s</strong></div>
        <div class="compare-stat-item"><span>Dégâts par distance</span><strong>${formatRangeDamage(nextStats)}</strong></div>
    `;

    const canUpgrade = !isMax && money >= weapon.upgradeCost;
    document.getElementById("compare-action-area").innerHTML = `
        <button class="action-btn" onclick="upgradeWeapon('${weapon.id}')" ${!canUpgrade ? "disabled" : ""}>
            ${isMax ? "NIVEAU MAX" : `Améliorer (${weapon.upgradeCost} $)`}
        </button>
    `;
}

window.upgradeWeapon = function(id) {
    const weapon = weapons.find(w => w.id === id);
    if (weapon && weapon.owned && weapon.level < weapon.maxLevel && money >= weapon.upgradeCost) {
        money -= weapon.upgradeCost;
        weapon.level++;
        weapon.upgradeCost = Math.round(weapon.upgradeCost * 1.5);
        updateMoneyUI();
        renderUpgrades();
    }
};

document.getElementById("btn-play").addEventListener("click", () => {
    panelShop.classList.add("hidden");
    panelUpgrade.classList.add("hidden");

    const equipped = weapons.find(w => w.id === equippedWeaponId);
    const s = getStatsAtLevel(equipped, equipped.level);
    document.getElementById("equipped-weapon-info").textContent =
        `Arme équipée : ${equipped.name} (Niv. ${equipped.level} • Dégâts proche : ${s.dmgClose})`;

    renderDifficultyCases();
    difficultyScreen.classList.remove("hidden");
});

document.getElementById("btn-close-diff").addEventListener("click", () => {
    difficultyScreen.classList.add("hidden");
});

function renderDifficultyCases() {
    const grid = document.getElementById("difficulty-grid");
    grid.innerHTML = "";

    difficulties.forEach(diff => {
        const box = document.createElement("div");
        box.className = "diff-card";
        box.innerHTML = `
            <span class="diff-level">Niveau ${diff.level}</span>
            <span class="diff-name">${diff.name}</span>
            <span class="diff-mult">${diff.rewardMult}</span>
        `;
        box.addEventListener("click", () => {
            difficultyScreen.classList.add("hidden");
            startCombatWithRectangles(diff);
        });
        grid.appendChild(box);
    });
}

// =========================================================
// --- TRANSITION 20 RECTANGLES, COMBAT & PAUSE / ZOMBIES ---
// =========================================================

const transitionGrid = document.getElementById("transition-grid");
const combatScreen = document.getElementById("combat-screen");
const combatViewLayer = document.getElementById("combat-view-layer");
const combatWeaponLabel = document.getElementById("combat-weapon-label");
const combatAmmoCounter = document.getElementById("combat-ammo-counter");
const combatStatusBadge = document.getElementById("combat-status-badge");
const combatEarnedMoneyEl = document.getElementById("combat-earned-money");
const healChargesEl = document.getElementById("heal-charges");
const playerHpTextEl = document.getElementById("player-hp-text");
const playerHpFillEl = document.getElementById("player-hp-fill");
const pauseOverlay = document.getElementById("pause-overlay");
const zombieTargetBtn = document.getElementById("zombie-target");
const zombieHpFill = document.getElementById("zombie-hp-fill");

let inCombat = false;
let isPaused = false;
let isReloading = false;
let earnedInMatch = 0;
let healCharges = 3;
let playerMaxHp = 100;
let playerHp = 100;
let currentWave = 1;
const totalWaves = 5;
let lookYaw = 0;
let lookPitch = 0;
let activeDifficulty = null;

let ammoByWeaponId = {};
let zombieMaxHp = 60;
let zombieHp = 60;

function initMatchAmmo() {
    ammoByWeaponId = {};
    weapons.forEach(w => {
        const s = getStatsAtLevel(w, w.level);
        ammoByWeaponId[w.id] = s.ammo;
    });
}

function getCurrentWeaponMaxAmmo(weapon) {
    return getStatsAtLevel(weapon, weapon.level).ammo;
}

function getCurrentWeaponAmmo(weapon) {
    if (typeof ammoByWeaponId[weapon.id] !== "number") {
        ammoByWeaponId[weapon.id] = getCurrentWeaponMaxAmmo(weapon);
    }
    return ammoByWeaponId[weapon.id];
}

function updateAmmoUI() {
    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    const cur = getCurrentWeaponAmmo(equipped);
    const max = getCurrentWeaponMaxAmmo(equipped);
    combatAmmoCounter.textContent = `Munitions : ${cur} / ${max}`;
    combatAmmoCounter.classList.toggle("empty-ammo", cur <= 0);
}

function updatePlayerHpUI() {
    const clamped = Math.max(0, Math.min(playerMaxHp, playerHp));
    playerHpTextEl.textContent = `${clamped} / ${playerMaxHp}`;
    playerHpFillEl.style.width = `${(clamped / playerMaxHp) * 100}%`;
}

function build20Rectangles() {
    transitionGrid.innerHTML = "";
    const rects = [];
    for (let i = 0; i < 20; i++) {
        const rect = document.createElement("div");
        rect.className = `transition-rect ${i % 2 === 0 ? "rect-red" : "rect-green"}`;
        transitionGrid.appendChild(rect);
        rects.push(rect);
    }
    return rects;
}

function resetZombieForWave() {
    zombieMaxHp = 50 + currentWave * 20;
    zombieHp = zombieMaxHp;
    updateZombieHpUI();
}

function updateZombieHpUI() {
    const pct = Math.max(0, Math.min(100, (zombieHp / zombieMaxHp) * 100));
    zombieHpFill.style.width = `${pct}%`;
}

function startCombatWithRectangles(diff) {
    sideMenu.classList.add("hidden");
    panelShop.classList.add("hidden");
    panelUpgrade.classList.add("hidden");
    pauseOverlay.classList.add("hidden");

    activeDifficulty = diff;
    earnedInMatch = 0;
    healCharges = 3;
    playerMaxHp = 100;
    playerHp = 100;
    currentWave = 1;
    lookYaw = 0;
    lookPitch = 0;
    isPaused = false;
    isReloading = false;

    initMatchAmmo();
    combatEarnedMoneyEl.textContent = earnedInMatch;
    healChargesEl.textContent = healCharges;
    updatePlayerHpUI();
    renderWaveSegments(currentWave);
    resetZombieForWave();
    updateViewLook();

    const rects = build20Rectangles();
    transitionGrid.classList.remove("hidden");

    rects.forEach((rect, index) => {
        setTimeout(() => {
            rect.classList.add("rect-hidden");
            if (index === rects.length - 1) {
                setTimeout(() => {
                    transitionGrid.classList.add("hidden");
                    transitionGrid.innerHTML = "";
                    combatScreen.classList.remove("hidden");
                    inCombat = true;
                    syncCombatWeaponView();
                    combatStatusBadge.textContent =
                        `Difficulté ${diff.level} (${diff.name}) — Vague ${currentWave}/${totalWaves}`;
                }, 220);
            }
        }, index * 55);
    });
}

function renderWaveSegments(waveNum) {
    const container = document.getElementById("wave-segments");
    container.innerHTML = "";
    for (let i = 1; i <= totalWaves; i++) {
        const seg = document.createElement("div");
        seg.className = `wave-seg ${i <= waveNum ? "active" : ""}`;
        container.appendChild(seg);
    }
}

function syncCombatWeaponView() {
    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    combatWeaponLabel.textContent = `${equipped.name} (Niv. ${equipped.level})`;
    updateAmmoUI();
    if (window.fps3D) {
        window.fps3D.setWeapon(equipped.id);
    }
}

function updateViewLook() {
    combatViewLayer.style.backgroundPosition = `${50 + lookYaw * 0.25}% ${50 + lookPitch * 0.25}%`;
    if (window.fps3D) {
        window.fps3D.setLook(lookYaw, lookPitch);
    }
}

function onZombieKilled() {
    const killReward = (activeDifficulty ? activeDifficulty.level : 1) * 15;
    earnedInMatch += killReward;
    combatEarnedMoneyEl.textContent = earnedInMatch;

    if (currentWave < totalWaves) {
        currentWave++;
        renderWaveSegments(currentWave);
        combatStatusBadge.textContent = `Zombie éliminé (+${killReward} $) — Vague ${currentWave}/${totalWaves}`;
    } else {
        combatStatusBadge.textContent = `Zombie éliminé (+${killReward} $) — Vague Boss atteinte !`;
    }
    resetZombieForWave();
}

function triggerShootAction(hitZombie = false) {
    if (!inCombat || isPaused || isReloading) return;

    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    const currentAmmo = getCurrentWeaponAmmo(equipped);

    if (currentAmmo <= 0) {
        combatStatusBadge.textContent = "Chargeur vide ! Appuyez sur RELOAD ou clic droit.";
        return;
    }

    ammoByWeaponId[equipped.id] = currentAmmo - 1;
    updateAmmoUI();

    const s = getStatsAtLevel(equipped, equipped.level);
    if (window.fps3D) {
        window.fps3D.triggerFire();
    }

    if (hitZombie) {
        zombieTargetBtn.classList.add("hit-flash");
        zombieHp -= s.dmgClose;
        updateZombieHpUI();
        combatStatusBadge.textContent = `Touché (-${s.dmgClose} PV)`;
        setTimeout(() => zombieTargetBtn.classList.remove("hit-flash"), 120);

        if (zombieHp <= 0) {
            onZombieKilled();
        }
    } else {
        combatStatusBadge.textContent = `Tir (${equipped.name}) — ${ammoByWeaponId[equipped.id]} munition(s) restante(s)`;
    }
}

function triggerReloadAction() {
    if (!inCombat || isPaused || isReloading) return;
    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    const maxAmmo = getCurrentWeaponMaxAmmo(equipped);
    const curAmmo = getCurrentWeaponAmmo(equipped);

    if (curAmmo >= maxAmmo) {
        combatStatusBadge.textContent = "Chargeur déjà plein.";
        return;
    }

    isReloading = true;
    if (window.fps3D) {
        window.fps3D.setReloading(true);
    }
    combatStatusBadge.textContent = "Rechargement en cours...";

    setTimeout(() => {
        ammoByWeaponId[equipped.id] = maxAmmo;
        updateAmmoUI();
        isReloading = false;
        if (window.fps3D) {
            window.fps3D.setReloading(false);
        }
        if (inCombat && !isPaused) {
            combatStatusBadge.textContent = `Chargeur rechargé — Vague ${currentWave}/${totalWaves}`;
        }
    }, 650);
}

function triggerSwitchWeaponAction() {
    if (!inCombat || isPaused) return;
    const owned = weapons.filter(w => w.owned);
    if (owned.length > 1) {
        const idx = owned.findIndex(w => w.id === equippedWeaponId);
        const nextWeapon = owned[(idx + 1) % owned.length];
        equippedWeaponId = nextWeapon.id;
        syncCombatWeaponView();
        combatStatusBadge.textContent = `Arme sélectionnée : ${nextWeapon.name}`;
    } else {
        combatStatusBadge.textContent = "Aucune autre arme possédée pour l'instant";
    }
}

function triggerHealAction() {
    if (!inCombat || isPaused) return;
    if (healCharges > 0 && playerHp < playerMaxHp) {
        healCharges--;
        playerHp = Math.min(playerMaxHp, playerHp + 35);
        healChargesEl.textContent = healCharges;
        updatePlayerHpUI();
        combatStatusBadge.textContent = `Soins (+35 PV) — ${healCharges} soin(s) restant(s)`;
    } else if (healCharges <= 0) {
        combatStatusBadge.textContent = "Plus de soins disponibles";
    } else {
        combatStatusBadge.textContent = "Vie déjà au maximum";
    }
}

function triggerMoveDirection(dir, pressed) {
    if (!inCombat || isPaused) return;
    const btn = document.querySelector(`.move-key[data-move="${dir}"]`);
    if (btn) {
        btn.classList.toggle("pressed", pressed);
    }
    if (window.fps3D) {
        window.fps3D.setMoving(pressed);
    }
    if (pressed) {
        const labels = { z: "Avance (Z)", s: "Recule (S)", q: "Gauche (Q)", d: "Droite (D)" };
        combatStatusBadge.textContent = `Déplacement : ${labels[dir] || dir}`;
    }
}

function togglePauseGame(forcePause = null) {
    if (!inCombat) return;
    const nextState = forcePause !== null ? forcePause : !isPaused;
    isPaused = nextState;
    pauseOverlay.classList.toggle("hidden", !isPaused);
    if (isPaused) {
        combatStatusBadge.textContent = "Partie en pause";
    } else {
        combatStatusBadge.textContent = `Reprise — Vague ${currentWave}/${totalWaves}`;
    }
}

function quitCombatSession() {
    if (!inCombat && combatScreen.classList.contains("hidden")) return;
    inCombat = false;
    isPaused = false;
    isReloading = false;
    pauseOverlay.classList.add("hidden");
    combatScreen.classList.add("hidden");

    money += earnedInMatch;
    earnedInMatch = 0;
    combatEarnedMoneyEl.textContent = 0;
    updateMoneyUI();

    sideMenu.classList.remove("hidden");
}

// Boutons HUD de combat & pause
document.getElementById("btn-stop-game").addEventListener("click", () => togglePauseGame(true));
document.getElementById("btn-resume-game").addEventListener("click", () => togglePauseGame(false));
document.getElementById("btn-quit-game").addEventListener("click", quitCombatSession);

document.getElementById("btn-combat-shoot").addEventListener("click", () => triggerShootAction(false));
document.getElementById("btn-combat-reload").addEventListener("click", triggerReloadAction);
document.getElementById("btn-combat-switch").addEventListener("click", triggerSwitchWeaponAction);
document.getElementById("btn-combat-heal").addEventListener("click", triggerHealAction);

zombieTargetBtn.addEventListener("mousedown", e => {
    e.stopPropagation();
    if (e.button === 0) {
        triggerShootAction(true);
    }
});

document.querySelectorAll(".move-key").forEach(btn => {
    const dir = btn.dataset.move;
    btn.addEventListener("mousedown", () => triggerMoveDirection(dir, true));
    btn.addEventListener("mouseup", () => triggerMoveDirection(dir, false));
    btn.addEventListener("mouseleave", () => triggerMoveDirection(dir, false));
    btn.addEventListener("touchstart", e => {
        e.preventDefault();
        triggerMoveDirection(dir, true);
    });
    btn.addEventListener("touchend", () => triggerMoveDirection(dir, false));
});

// Souris & clics en combat : mouvement de visée, clic gauche = tirer, clic droit = recharger
combatViewLayer.addEventListener("mousemove", e => {
    if (!inCombat || isPaused) return;
    lookYaw += e.movementX * 0.18;
    lookPitch = Math.max(-60, Math.min(60, lookPitch + e.movementY * 0.18));
    updateViewLook();
});

combatViewLayer.addEventListener("mousedown", e => {
    if (!inCombat || isPaused) return;
    if (e.button === 0) {
        triggerShootAction(false);
    } else if (e.button === 2) {
        triggerReloadAction();
    }
});

combatViewLayer.addEventListener("contextmenu", e => {
    if (inCombat) e.preventDefault();
});

// Clavier Z / Q / S / D, R et Échap
document.addEventListener("keydown", e => {
    if (!inCombat) return;
    const key = e.key.toLowerCase();
    if (key === "escape") {
        togglePauseGame();
    } else if (!isPaused && key === "r") {
        triggerReloadAction();
    } else if (!isPaused && ["z", "q", "s", "d"].includes(key)) {
        triggerMoveDirection(key, true);
    }
});

document.addEventListener("keyup", e => {
    if (!inCombat) return;
    const key = e.key.toLowerCase();
    if (["z", "q", "s", "d"].includes(key)) {
        triggerMoveDirection(key, false);
    }
});