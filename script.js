const title = document.getElementById("main-title");
const blackScreen = document.getElementById("black-screen");
const bgBlood = document.getElementById("bg-blood");

// 1. Découpe automatiquement le texte du titre en lettres individuelles
const text = title.textContent;
title.textContent = "";

const letters = [];
for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i] === " " ? "\u00A0" : text[i]; // Gère les espaces s'il y en a
    span.classList.add("letter");
    
    // La première moitié des lettres part à gauche, la seconde à droite
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
    title.classList.add("animating"); // Désactive les éclairs du survol

    // ÉTAPE 1 : Passage au fond noir (le titre reste visible par-dessus)
    blackScreen.style.opacity = "1";

    // ÉTAPE 2 : Après 600ms, l'image du garage ensanglanté apparaît derrière le noir
    setTimeout(() => {
        bgBlood.style.opacity = "1";
        blackScreen.style.opacity = "0"; // Le noir s'efface pour révéler le garage avec le sang
    }, 600);

    // ÉTAPE 3 : Une fois le décor révélé (1300ms), les lettres fusent en ligne droite de chaque côté
    setTimeout(() => {
        letters.forEach((letter, index) => {
            if (index < letters.length / 2) {
                letter.classList.add("shoot-left");
            } else {
                letter.classList.add("shoot-right");
            }
        });
    }, 1300);
});