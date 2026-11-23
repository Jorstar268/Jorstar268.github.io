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

let money = 5000;
let highestUnlockedDifficulty = 1;

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
        stats: { ammo: 1, reloadTime: 0.4, fireRate: 1.5, dmgClose: 18, dmgMid: 14, dmgFar: 6 },
        step: { ammo: 0, reloadTime: -0.04, fireRate: 0.15, dmgClose: 6, dmgMid: 5, dmgFar: 2 }
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
        stats: { ammo: 15, reloadTime: 1.3, fireRate: 4.5, dmgClose: 28, dmgMid: 22, dmgFar: 14 },
        step: { ammo: 2, reloadTime: -0.1, fireRate: 0.3, dmgClose: 7, dmgMid: 6, dmgFar: 4 }
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
        stats: { ammo: 6, reloadTime: 1.7, fireRate: 2.4, dmgClose: 55, dmgMid: 46, dmgFar: 34 },
        step: { ammo: 1, reloadTime: -0.12, fireRate: 0.2, dmgClose: 12, dmgMid: 10, dmgFar: 8 }
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
        stats: { ammo: 8, reloadTime: 2.1, fireRate: 1.3, dmgClose: 95, dmgMid: 52, dmgFar: 18 },
        step: { ammo: 2, reloadTime: -0.15, fireRate: 0.15, dmgClose: 18, dmgMid: 10, dmgFar: 5 }
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
        stats: { ammo: 30, reloadTime: 1.6, fireRate: 10.5, dmgClose: 24, dmgMid: 18, dmgFar: 10 },
        step: { ammo: 5, reloadTime: -0.1, fireRate: 0.6, dmgClose: 5, dmgMid: 4, dmgFar: 2 }
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
        stats: { ammo: 32, reloadTime: 1.9, fireRate: 8.2, dmgClose: 38, dmgMid: 34, dmgFar: 26 },
        step: { ammo: 4, reloadTime: -0.12, fireRate: 0.4, dmgClose: 8, dmgMid: 7, dmgFar: 6 }
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
        stats: { ammo: 5, reloadTime: 2.4, fireRate: 1.1, dmgClose: 110, dmgMid: 135, dmgFar: 165 },
        step: { ammo: 1, reloadTime: -0.15, fireRate: 0.1, dmgClose: 20, dmgMid: 25, dmgFar: 32 }
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
        stats: { ammo: 100, reloadTime: 3.4, fireRate: 11.5, dmgClose: 44, dmgMid: 39, dmgFar: 29 },
        step: { ammo: 15, reloadTime: -0.2, fireRate: 0.5, dmgClose: 9, dmgMid: 8, dmgFar: 6 }
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
        stats: { ammo: 1, reloadTime: 3.2, fireRate: 0.7, dmgClose: 190, dmgMid: 210, dmgFar: 220 },
        step: { ammo: 0, reloadTime: -0.2, fireRate: 0.08, dmgClose: 35, dmgMid: 40, dmgFar: 45 }
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
        stats: { ammo: 3, reloadTime: 1.5, fireRate: 1.2, dmgClose: 140, dmgMid: 95, dmgFar: 30 },
        step: { ammo: 1, reloadTime: -0.1, fireRate: 0.1, dmgClose: 28, dmgMid: 20, dmgFar: 8 }
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

function renderDifficultyCases() {
    const grid = document.getElementById("difficulty-grid");
    grid.innerHTML = "";

    difficulties.forEach(diff => {
        const isUnlocked = diff.level <= highestUnlockedDifficulty;
        const box = document.createElement("div");
        box.className = `diff-card ${isUnlocked ? "" : "locked"}`;
        box.innerHTML = `
            <span class="diff-level">Niveau ${diff.level}</span>
            <span class="diff-name">${diff.name}</span>
            <span class="diff-mult">${isUnlocked ? diff.rewardMult : "🔒 Terminez le niveau précédent"}</span>
        `;

        if (isUnlocked) {
            box.addEventListener("click", () => {
                difficultyScreen.classList.add("hidden");
                startCombatWithRectangles(diff);
            });
        }

        grid.appendChild(box);
    });
}

document.getElementById("btn-play").addEventListener("click", () => {
    panelShop.classList.add("hidden");
    panelUpgrade.classList.add("hidden");

    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    const s = getStatsAtLevel(equipped, equipped.level);
    document.getElementById("equipped-weapon-info").textContent =
        `Arme équipée : ${equipped.name} (Niv. ${equipped.level} • Dégâts proche : ${s.dmgClose})`;

    renderDifficultyCases();
    difficultyScreen.classList.remove("hidden");
});

document.getElementById("btn-close-diff").addEventListener("click", () => {
    difficultyScreen.classList.add("hidden");
});

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
const deathScreen = document.getElementById("death-screen");
const zombieTargetBtn = document.getElementById("zombie-target");
const zombieHpFill = document.getElementById("zombie-hp-fill");
const zombieTypeBadgeEl = document.getElementById("zombie-type-badge");
const lowHpBlurEl = document.getElementById("low-hp-blur");
const btnDeathReplay = document.getElementById("btn-death-replay");
const btnDeathQuit = document.getElementById("btn-death-quit");
const victoryScreen = document.getElementById("victory-screen");
const victorySummaryEl = document.getElementById("victory-summary");
const btnVictoryReplay = document.getElementById("btn-victory-replay");
const btnVictoryMenu = document.getElementById("btn-victory-menu");

let isVictory = false;
let inCombat = false;
let isPaused = false;
let isDead = false;
let isReloading = false;
let isHoldingFire = false;
let autoFireInterval = null;
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

const moveKeysPressed = { z: false, q: false, s: false, d: false };
let moveLoopInterval = null;
let playerPosX = 0;
let playerPosZ = 0;
let walkBobPhase = 0;

const spawnPoints = [
    { x: -1.35, yOffset: -8 },
    { x: -1.35, yOffset: 10 },
    { x: 0, yOffset: -6 },
    { x: 0, yOffset: 6 },
    { x: 1.35, yOffset: -8 },
    { x: 1.35, yOffset: 10 }
];
let zombieStartSpawn = spawnPoints[2];

const zombieTypes = {
    walker: { id: "walker", label: "Rôdeur 2D", hpMult: 1.0, dmgMult: 1.0, chargeSpeed: 0.014, rewardMult: 0.34 },
    runner: { id: "runner", label: "Coureur 2D", hpMult: 0.72, dmgMult: 0.85, chargeSpeed: 0.025, rewardMult: 0.38 },
    tank:   { id: "tank",   label: "Tank 2D",   hpMult: 1.85, dmgMult: 1.45, chargeSpeed: 0.009, rewardMult: 0.50 },
    boss:   { id: "boss",   label: "BOSS 2D",   hpMult: 2.60, dmgMult: 1.75, chargeSpeed: 0.012, rewardMult: 0.80 }
};

const zombieConfig = {
    baseHp: 50,
    hpPerWave: 18,
    baseDamage: 7,
    damagePerWave: 2.5,
    bossWave: 5,
    baseKillReward: 5
};

let waveQueue = [];
let currentZombieType = zombieTypes.walker;
let zombieChargeLoop = null;
let zombieChargeProgress = 0;
let zombieLaneX = 0;
let isBossWave = false;

function getDifficultyDamageMultiplier() {
    if (!activeDifficulty) return 1;
    const multByLevel = { 1: 1.0, 2: 1.25, 3: 1.55, 4: 1.9, 5: 2.35 };
    return multByLevel[activeDifficulty.level] || 1;
}

function getDifficultyRewardMultiplier() {
    if (!activeDifficulty) return 1 / 3;
    const multByLevel = { 1: 0.33, 2: 0.43, 3: 0.57, 4: 0.73, 5: 1.0 };
    return multByLevel[activeDifficulty.level] || 0.33;
}

function getDifficultySpeedMultiplier() {
    if (!activeDifficulty) return 0.75;
    const speedByLevel = { 1: 0.55, 2: 0.65, 3: 0.75, 4: 0.88, 5: 1.0 };
    return speedByLevel[activeDifficulty.level] || 0.75;
}

function buildWaveQueue(waveNum, diffLevel) {
    const extraPerHigherWave = Math.max(0, waveNum - 1) * 5;

    if (waveNum >= zombieConfig.bossWave) {
        const addsCount = Math.min(25, 2 + Math.floor(diffLevel / 2) + extraPerHigherWave);
        const queue = [];
        for (let i = 0; i < addsCount; i++) {
            queue.push(i % 2 === 0 ? zombieTypes.runner : zombieTypes.tank);
        }
        queue.push(zombieTypes.boss);
        return queue;
    }

    const baseInWave = 2 + waveNum + Math.floor((diffLevel - 1) * 0.8);
    const totalInWave = baseInWave + extraPerHigherWave;
    const queue = [];

    for (let i = 0; i < totalInWave; i++) {
        if (waveNum >= 3 && i === totalInWave - 1) {
            queue.push(zombieTypes.tank);
        } else if (waveNum >= 2 && i % 2 === 1) {
            queue.push(zombieTypes.runner);
        } else {
            queue.push(zombieTypes.walker);
        }
    }
    return queue;
}

function updateZombieBadgeUI() {
    if (!zombieTypeBadgeEl) return;
    const remainingIncludingCurrent = waveQueue.length + 1;
    zombieTypeBadgeEl.textContent = `${currentZombieType.label} • Reste : ${remainingIncludingCurrent}`;
}

function updateZombieHpUI() {
    const pct = Math.max(0, Math.min(100, (zombieHp / zombieMaxHp) * 100));
    zombieHpFill.style.width = `${pct}%`;
}

function renderZombie2DTransform() {
    if (!zombieTargetBtn) return;
    const scale = 0.58 + zombieChargeProgress * 0.82;
    const baseTop = 44 + zombieStartSpawn.yOffset * (1 - zombieChargeProgress * 0.75);
    const topPct = baseTop + zombieChargeProgress * 12;

    const startX = zombieStartSpawn.x * 260;
    const targetX = -playerPosX * 8;
    const currentX = startX + (targetX - startX) * zombieChargeProgress;

    zombieTargetBtn.style.top = `${topPct.toFixed(1)}%`;
    zombieTargetBtn.style.left = `calc(50% + ${currentX.toFixed(1)}px)`;
    zombieTargetBtn.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
}

function stopZombieChargeLoop() {
    clearInterval(zombieChargeLoop);
    zombieChargeLoop = null;
}

function updatePlayerHpUI() {
    const clamped = Math.max(0, Math.min(playerMaxHp, playerHp));
    const ratio = playerMaxHp > 0 ? clamped / playerMaxHp : 0;

    playerHpTextEl.textContent = `${clamped} / ${playerMaxHp}`;
    playerHpFillEl.style.width = `${(ratio * 100).toFixed(1)}%`;

    if (ratio > 0.55) {
        playerHpFillEl.style.background = "linear-gradient(90deg, #19a968, #5cf2a6)";
    } else if (ratio > 0.28) {
        playerHpFillEl.style.background = "linear-gradient(90deg, #e67e22, #ff4d4d)";
    } else {
        playerHpFillEl.style.background = "linear-gradient(90deg, #990000, #ff1a1a)";
    }

    if (lowHpBlurEl) {
        const shouldBlur = inCombat && !isPaused && !isDead && clamped > 0 && ratio <= 0.35;
        lowHpBlurEl.classList.toggle("hidden", !shouldBlur);
    }
}

function showDeathScreen() {
    isDead = true;
    inCombat = false;
    isPaused = false;
    stopZombieChargeLoop();
    stopContinuousFire();
    stopMoveLoop();
    updatePlayerHpUI();

    if (pauseOverlay) pauseOverlay.classList.add("hidden");
    if (!deathScreen) return;

    deathScreen.classList.remove("hidden");
    deathScreen.classList.remove("revealed");

    setTimeout(() => {
        if (isDead && deathScreen) {
            deathScreen.classList.add("revealed");
        }
    }, 350);
}

function startZombieChargeLoop() {
    stopZombieChargeLoop();

    zombieChargeLoop = setInterval(() => {
        if (!inCombat || isPaused || isDead || zombieHp <= 0) return;

        const waveFactor = 1 + (currentWave - 1) * 0.08;
        zombieChargeProgress += currentZombieType.chargeSpeed * waveFactor * getDifficultySpeedMultiplier();

        zombieLaneX *= 0.96;
        renderZombie2DTransform();

        if (zombieChargeProgress >= 1) {
            zombieChargeProgress = 0.25;
            zombieLaneX = (Math.random() - 0.5) * 1.2;

            const rawDmg = zombieConfig.baseDamage + (currentWave - 1) * zombieConfig.damagePerWave;
            const dmg = Math.max(1, Math.round(rawDmg * currentZombieType.dmgMult * getDifficultyDamageMultiplier()));

            playerHp = Math.max(0, playerHp - dmg);
            updatePlayerHpUI();

            zombieTargetBtn.classList.add("attacking");
            setTimeout(() => zombieTargetBtn.classList.remove("attacking"), 180);

            combatStatusBadge.textContent = `${currentZombieType.label} vous percute (-${dmg} PV) !`;

            if (playerHp <= 0) {
                showDeathScreen();
            }
        }
    }, 35);
}

function spawnNextZombieInWave() {
    stopZombieChargeLoop();

    if (waveQueue.length === 0) {
        waveQueue = buildWaveQueue(currentWave, activeDifficulty ? activeDifficulty.level : 1);
    }

    currentZombieType = waveQueue.shift();
    isBossWave = currentZombieType.id === "boss";

    const rawWaveHp = zombieConfig.baseHp + (currentWave - 1) * zombieConfig.hpPerWave;
    const diffScale = 0.85 + getDifficultyDamageMultiplier() * 0.15;
    zombieMaxHp = Math.max(20, Math.round(rawWaveHp * currentZombieType.hpMult * diffScale));
    zombieHp = zombieMaxHp;

    zombieChargeProgress = 0.02;
    zombieStartSpawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

    zombieTargetBtn.classList.remove("type-walker", "type-runner", "type-tank", "type-boss", "boss-zombie");
    zombieTargetBtn.classList.add(`type-${currentZombieType.id}`);
    if (isBossWave) {
        zombieTargetBtn.classList.add("boss-zombie");
    }

    updateZombieBadgeUI();
    updateZombieHpUI();
    renderZombie2DTransform();
    startZombieChargeLoop();
}

function resetZombieForWave() {
    waveQueue = buildWaveQueue(currentWave, activeDifficulty ? activeDifficulty.level : 1);
    spawnNextZombieInWave();
}

function onZombieKilled() {
    stopZombieChargeLoop();

    const diffLevel = activeDifficulty ? activeDifficulty.level : 1;
    const rawReward =
        diffLevel *
        zombieConfig.baseKillReward *
        currentZombieType.rewardMult *
        getDifficultyRewardMultiplier();
    const killReward = Math.max(1, Math.round(rawReward));

    earnedInMatch += killReward;
    combatEarnedMoneyEl.textContent = earnedInMatch;

    if (waveQueue.length > 0) {
        updateZombieBadgeUI();
        combatStatusBadge.textContent =
            `${currentZombieType.label} éliminé (+${killReward} $) — ${waveQueue.length} zombie(s) restant(s)`;
        spawnNextZombieInWave();
        return;
    }

    if (currentWave < totalWaves) {
        currentWave++;
        renderWaveSegments(currentWave);
        combatStatusBadge.textContent =
            `Vague terminée (+${killReward} $) — Vague ${currentWave}/${totalWaves}`;
        resetZombieForWave();
    } else {
        if (
            activeDifficulty &&
            activeDifficulty.level >= highestUnlockedDifficulty &&
            activeDifficulty.level < difficulties.length
        ) {
            highestUnlockedDifficulty = activeDifficulty.level + 1;
        }

        const totalMatchGain = earnedInMatch;
        money += earnedInMatch;
        earnedInMatch = 0;
        combatEarnedMoneyEl.textContent = 0;
        updateMoneyUI();

        showVictoryScreen(totalMatchGain);
    }
}
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

function applyGaragePerspective() {
    const anyMoving = Object.values(moveKeysPressed).some(Boolean);
    if (anyMoving && !isPaused && !isDead && inCombat) {
        walkBobPhase += 0.18;
    }

    const walkBobY = anyMoving ? Math.abs(Math.sin(walkBobPhase)) * 0.45 : 0;

    const zNorm = Math.max(0, Math.min(1, (playerPosZ + 4) / 20));
    const zoom = 1.05 + zNorm * 0.55;

    const xNorm = Math.max(-1, Math.min(1, playerPosX / 15));
    const originXPercent = 50 + xNorm * 20;
    bgBlood.style.transformOrigin = `${originXPercent.toFixed(1)}% center`;

    const maxShiftX = Math.max(0, ((zoom - 1) / (2 * zoom)) * 100);
    const maxShiftY = Math.max(0, ((zoom - 1) / (2 * zoom)) * 100);

    const rawShiftX = -xNorm * maxShiftX;
    const rawShiftY = walkBobY;

    const shiftX = Math.max(-maxShiftX, Math.min(maxShiftX, rawShiftX));
    const shiftY = Math.max(-maxShiftY, Math.min(maxShiftY, rawShiftY));

    bgBlood.style.transform = `translate(${shiftX.toFixed(2)}%, ${shiftY.toFixed(2)}%) scale(${zoom.toFixed(3)})`;
    renderZombie2DTransform();
}

function updateViewLook() {
    lookYaw = 0;
    lookPitch = 0;
    applyGaragePerspective();
    if (window.fps3D) {
        window.fps3D.setLook(0, 0);
    }
}

function startCombatWithRectangles(diff) {
    sideMenu.classList.add("hidden");
    panelShop.classList.add("hidden");
    panelUpgrade.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    if (deathScreen) deathScreen.classList.add("hidden");

    activeDifficulty = diff;
    earnedInMatch = 0;
    healCharges = 3;
    walkBobPhase = 0;
    playerMaxHp = 100;
    playerHp = 100;
    currentWave = 1;
    lookYaw = 0;
    lookPitch = 0;
    playerPosX = 0;
    playerPosZ = 0;
    isPaused = false;
    isDead = false;
    isReloading = false;
    stopContinuousFire();
    stopZombieChargeLoop();

    initMatchAmmo();
    combatEarnedMoneyEl.textContent = earnedInMatch;
    healChargesEl.textContent = healCharges;
    updatePlayerHpUI();
    renderWaveSegments(currentWave);
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
                    resetZombieForWave();
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
function triggerShootAction(hitZombie = false) {
    if (!inCombat || isPaused || isDead || isVictory || isReloading) return;

    const isDirectZombieHit = hitZombie === true;
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

    if (isDirectZombieHit && zombieHp > 0) {
        zombieTargetBtn.classList.add("hit-flash");
        zombieHp -= s.dmgClose;
        zombieChargeProgress = Math.max(0.02, zombieChargeProgress - 0.04);
        renderZombie2DTransform();
        updateZombieHpUI();
        combatStatusBadge.textContent = `Touché (-${s.dmgClose} PV)`;
        setTimeout(() => zombieTargetBtn.classList.remove("hit-flash"), 120);

        if (zombieHp <= 0) {
            onZombieKilled();
        }
    } else {
        combatStatusBadge.textContent = `Tir dans le vide (${equipped.name}) — ${ammoByWeaponId[equipped.id]} munition(s) restante(s)`;
    }
}

function triggerReloadAction() {
    if (!inCombat || isPaused || isDead || isReloading) return;
    stopContinuousFire();
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
        if (inCombat && !isPaused && !isDead) {
            combatStatusBadge.textContent = `Chargeur rechargé — Vague ${currentWave}/${totalWaves}`;
        }
    }, 650);
}

function triggerSwitchWeaponAction() {
    if (!inCombat || isPaused || isDead) return;
    const wasHolding = isHoldingFire;
    stopContinuousFire();
    const owned = weapons.filter(w => w.owned);
    if (owned.length > 1) {
        const idx = owned.findIndex(w => w.id === equippedWeaponId);
        const nextWeapon = owned[(idx + 1) % owned.length];
        equippedWeaponId = nextWeapon.id;
        syncCombatWeaponView();
        combatStatusBadge.textContent = `Arme sélectionnée : ${nextWeapon.name}`;
        if (wasHolding) {
            startContinuousFire(false);
        }
    } else {
        combatStatusBadge.textContent = "Aucune autre arme possédée pour l'instant";
    }
}

function triggerHealAction() {
    if (!inCombat || isPaused || isDead) return;
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

function updatePlayerMovementStep() {
    if (!inCombat || isPaused || isDead) return;

    const speed = 0.32;
    let dx = 0;
    let dz = 0;

    if (moveKeysPressed.z) dz += speed;
    if (moveKeysPressed.s) dz -= speed;
    if (moveKeysPressed.q) dx -= speed;
    if (moveKeysPressed.d) dx += speed;

    if (dx === 0 && dz === 0) return;

    if (dx !== 0 && dz !== 0) {
        const inv = 1 / Math.SQRT2;
        dx *= inv;
        dz *= inv;
    }

    playerPosX = Math.max(-15, Math.min(15, playerPosX + dx));
    playerPosZ = Math.max(-4, Math.min(16, playerPosZ + dz));

    applyGaragePerspective();

    if (window.fps3D && typeof window.fps3D.setMoveOffset === "function") {
        window.fps3D.setMoveOffset(playerPosX, playerPosZ);
    }
}

function startMoveLoop() {
    if (moveLoopInterval) return;
    moveLoopInterval = setInterval(updatePlayerMovementStep, 30);
}

function stopMoveLoop() {
    clearInterval(moveLoopInterval);
    moveLoopInterval = null;
    applyGaragePerspective();
}

function triggerMoveDirection(dir, pressed) {
    if (!["z", "q", "s", "d"].includes(dir)) return;

    if (!inCombat || isPaused || isDead) {
        moveKeysPressed[dir] = false;
        const btn = document.querySelector(`.move-key[data-move="${dir}"]`);
        if (btn) btn.classList.remove("pressed");
        return;
    }

    moveKeysPressed[dir] = Boolean(pressed);

    const btn = document.querySelector(`.move-key[data-move="${dir}"]`);
    if (btn) {
        btn.classList.toggle("pressed", moveKeysPressed[dir]);
    }

    const anyMoving = Object.values(moveKeysPressed).some(Boolean);
    if (window.fps3D) {
        window.fps3D.setMoving(anyMoving);
    }

    if (anyMoving) {
        startMoveLoop();
    } else {
        stopMoveLoop();
    }

    if (pressed) {
        const labels = { z: "Avance (Z)", s: "Recule (S)", q: "Gauche (Q)", d: "Droite (D)" };
        combatStatusBadge.textContent = `Déplacement : ${labels[dir]} (X: ${playerPosX.toFixed(1)}, Z: ${playerPosZ.toFixed(1)})`;
    }
}

function getFireIntervalMs(weapon) {
    const s = getStatsAtLevel(weapon, weapon.level);
    const rate = Math.max(0.2, Number(s.fireRate) || 1);
    return 1000 / rate;
}
function startContinuousFire(hitZombie = false) {
    if (!inCombat || isPaused || isDead || isVictory || isReloading) return;

    const lockedHitTarget = hitZombie === true;
    isHoldingFire = true;

    const equipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
    const delayMs = getFireIntervalMs(equipped);

    triggerShootAction(lockedHitTarget);

    clearInterval(autoFireInterval);
    autoFireInterval = setInterval(() => {
        if (!inCombat || isPaused || isDead || isVictory || isReloading || !isHoldingFire) {
            stopContinuousFire();
            return;
        }
        const currentEquipped = weapons.find(w => w.id === equippedWeaponId) || weapons[0];
        if (getCurrentWeaponAmmo(currentEquipped) <= 0) {
            stopContinuousFire();
            combatStatusBadge.textContent = "Chargeur vide ! Appuyez sur RELOAD ou clic droit.";
            return;
        }
        triggerShootAction(lockedHitTarget);
    }, delayMs);
}

function stopContinuousFire() {
    isHoldingFire = false;
    clearInterval(autoFireInterval);
    autoFireInterval = null;
}

function togglePauseGame(forcePause = null) {
    stopMoveLoop();
    moveKeysPressed.z = moveKeysPressed.q = moveKeysPressed.s = moveKeysPressed.d = false;
    stopContinuousFire();
    if (!inCombat || isDead) return;
    const nextState = forcePause !== null ? forcePause : !isPaused;
    isPaused = nextState;
    updatePlayerHpUI();
    pauseOverlay.classList.toggle("hidden", !isPaused);
    if (isPaused) {
        stopZombieChargeLoop();
        combatStatusBadge.textContent = "Partie en pause";
    } else {
        startZombieChargeLoop();
        combatStatusBadge.textContent = `Reprise — Vague ${currentWave}/${totalWaves}`;
    }
}

function quitCombatSession() {
    stopContinuousFire();
    stopZombieChargeLoop();
    if (!inCombat && !isDead && combatScreen.classList.contains("hidden")) return;
    playerPosX = 0;
    playerPosZ = 0;
    walkBobPhase = 0;
    zombieChargeProgress = 0;
    bgBlood.style.transform = "translate(0%, 0%) scale(1)";
    inCombat = false;
    isPaused = false;
    isDead = false;
    isReloading = false;
    updatePlayerHpUI();
    pauseOverlay.classList.add("hidden");
    if (deathScreen) {
        deathScreen.classList.add("hidden");
        deathScreen.classList.remove("revealed");
    }
    combatScreen.classList.add("hidden");

    money += earnedInMatch;
    earnedInMatch = 0;
    combatEarnedMoneyEl.textContent = 0;
    updateMoneyUI();
    renderDifficultyCases();

    sideMenu.classList.remove("hidden");
}

function replayAfterDeath() {
    const diffToReplay = activeDifficulty || difficulties[0];
    if (deathScreen) {
        deathScreen.classList.add("hidden");
        deathScreen.classList.remove("revealed");
    }
    money += earnedInMatch;
    earnedInMatch = 0;
    combatEarnedMoneyEl.textContent = 0;
    updateMoneyUI();
    startCombatWithRectangles(diffToReplay);
}

if (btnDeathReplay) {
    btnDeathReplay.addEventListener("click", replayAfterDeath);
}
if (btnDeathQuit) {
    btnDeathQuit.addEventListener("click", quitCombatSession);
}

document.getElementById("btn-stop-game").addEventListener("click", () => togglePauseGame(true));
document.getElementById("btn-resume-game").addEventListener("click", () => togglePauseGame(false));
document.getElementById("btn-quit-game").addEventListener("click", quitCombatSession);

const shootBtnEl = document.getElementById("btn-combat-shoot");
shootBtnEl.addEventListener("mousedown", e => {
    if (e.button === 0) startContinuousFire(false);
});
shootBtnEl.addEventListener("touchstart", e => {
    e.preventDefault();
    startContinuousFire(false);
});

document.getElementById("btn-combat-reload").addEventListener("click", triggerReloadAction);
document.getElementById("btn-combat-switch").addEventListener("click", triggerSwitchWeaponAction);
document.getElementById("btn-combat-heal").addEventListener("click", triggerHealAction);

zombieTargetBtn.addEventListener("mousedown", e => {
    e.stopPropagation();
    if (e.button === 0) {
        startContinuousFire(true);
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

combatViewLayer.addEventListener("mousedown", e => {
    if (!inCombat || isPaused || isDead) return;
    if (e.button === 0) {
        startContinuousFire(false);
    } else if (e.button === 2) {
        triggerReloadAction();
    }
});

combatViewLayer.addEventListener("contextmenu", e => {
    if (inCombat) e.preventDefault();
});

document.addEventListener("keydown", e => {
    if (!inCombat || isDead) return;
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

window.addEventListener("mouseup", e => {
    if (e.button === 0) {
        stopContinuousFire();
        ["z", "q", "s", "d"].forEach(dir => triggerMoveDirection(dir, false));
    }
});

window.addEventListener("touchend", () => {
    stopContinuousFire();
    ["z", "q", "s", "d"].forEach(dir => triggerMoveDirection(dir, false));
});

window.addEventListener("blur", () => {
    stopContinuousFire();
    stopMoveLoop();
    ["z", "q", "s", "d"].forEach(dir => triggerMoveDirection(dir, false));
});
function showVictoryScreen(finalEarnedAmount) {
    isVictory = true;
    inCombat = false;
    isPaused = false;
    stopZombieChargeLoop();
    stopContinuousFire();
    stopMoveLoop();

    if (lowHpBlurEl) lowHpBlurEl.classList.add("hidden");
    if (pauseOverlay) pauseOverlay.classList.add("hidden");
    if (deathScreen) deathScreen.classList.add("hidden");

    const diffLabel = activeDifficulty ? `Niveau ${activeDifficulty.level} (${activeDifficulty.name})` : "Partie";
    if (victorySummaryEl) {
        victorySummaryEl.textContent =
            `${diffLabel} terminé ! Vous avez gagné +${finalEarnedAmount} $.`;
    }
    if (victoryScreen) {
        victoryScreen.classList.remove("hidden");
    }
}

function replayAfterVictory() {
    const diffToReplay = activeDifficulty || difficulties[0];
    if (victoryScreen) {
        victoryScreen.classList.add("hidden");
    }
    isVictory = false;
    startCombatWithRectangles(diffToReplay);
}

function returnToMenuFromVictory() {
    if (victoryScreen) {
        victoryScreen.classList.add("hidden");
    }
    isVictory = false;
    combatScreen.classList.add("hidden");
    renderDifficultyCases();
    sideMenu.classList.remove("hidden");
}

if (btnVictoryReplay) {
    btnVictoryReplay.addEventListener("click", replayAfterVictory);
}
if (btnVictoryMenu) {
    btnVictoryMenu.addEventListener("click", returnToMenuFromVictory);
}