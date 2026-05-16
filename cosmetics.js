
let pos = 0;
let TickCount = 0;

let PageWidth = Math.floor(innerWidth / 18);
let PageHeight = Math.floor(innerHeight / 32);

const Config = {
    mainWidth: 75,
    shiftingBackground: false,
    ajustBackground: false,
    interchagingText: false,
    showBinary: true,
    wavyText: true,
    pulsingText: true,
}

function changeConfig() {

    Config.mainWidth = Number.parseInt(mainWidth.value);
    Config.ajustBackground = mainBackgroundAjusting.checked;
    Config.shiftingBackground = mainBackgroundShifting.checked;
    Config.interchagingText = changingText.checked;
    Config.wavyText = wavyText.checked;
    Config.pulsingText = pulsingText.checked;
    Config.showBinary = showBinary.checked;

    localStorage.setItem("MainPage-Cosmetics", JSON.stringify(Config));
    updateConfig();
}

function updateConfig() {

    mainWidth.value = Config.mainWidth;
    mainWidthValue.innerText = `${Config.mainWidth}%`;
    center.style.width = `${Config.mainWidth}%`;
    center.style.marginLeft = `calc(${50 - Config.mainWidth / 2}% - 5px)`;

    mainBackgroundAjusting.checked = Config.ajustBackground;
    mainBackgroundAjustingValue.innerHTML = Config.ajustBackground ? "On&#160" : "Off";

    mainBackgroundShifting.checked = Config.shiftingBackground;
    mainBackgroundShiftingValue.innerHTML = Config.shiftingBackground ? "On&#160" : "Off";

    changingText.checked = Config.interchagingText;
    changingTextValue.innerHTML = Config.interchagingText ? "On&#160" : "Off";

    showBinary.checked = Config.showBinary;
    showBinaryValue.innerHTML = Config.showBinary ? "On&#160" : "Off";

    wavyText.checked = Config.wavyText;
    wavyTextValue.innerHTML = Config.wavyText ? "On&#160" : "Off";

    pulsingText.checked = Config.pulsingText;
    pulsingTextValue.innerHTML = Config.pulsingText ? "On&#160" : "Off";
}


const info = JSON.parse(localStorage.getItem("MainPage-Cosmetics")) ?? {};

const K = Object.keys(Config);
const K2 = Object.keys(info);


K.forEach((v, i) =>{
    if (v == K2[i]) {
        Config[v] = info[v];
    }
});

updateConfig();

configButton.onclick = () => {
    if (configMenu.classList.length > 1) configMenu.classList.remove("hidden");
    else configMenu.classList.add("hidden");
}

const BTM = [];

for (let i = -1; i < PageHeight+1; i++) {
    const c = document.createElement("div");
    BinaryBackground.appendChild(c);
    BTM.push("");
    c.style.top = `${i * 32}px`;
    c.classList.add("binary");
    if (i % 2 == 0) {
        c.style.transform = "translateX(64px)";
        c.style.textAlign = "left";
        c.style.right = "0";
    }
    else {
        c.style.transform = "translateX(-64px)";
        c.style.textAlign = "right";
        c.style.left = "0";
    }

}

const arr = Array.from(BinaryBackground.children);


var RF = false;

function Update(){

    if (Config.interchagingText) {
        Glitchy.innerHTML = wordCycle(["Steller", "Irreplaceable", "Eternal", "Uncontainable", "Near Perfect", "Fundamental", "Celestial", "Unbound", "Quintessence", "Catalyst", "Ultimate", "Profound", "Superior", "Prime", "Transcendent", "Ethereal"]) + " Glitchyfishys";
        // GlitchyInfo.innerHTML = wordCycle(["Celestial of Perfection", "Creativity Unbound", "Redefined Master Mind", "Stallar Enhancement"]);
        PGL.innerHTML = wordCycle(["HTML", "Java Script", "CSS", "Vue", "Unity C#", "TMod Loader C#", "Roblox Luau", "Scratch"]);
    } else {
        Glitchy.innerHTML = "Glitchyfishys";
        PGL.innerHTML = "HTML, Java Script, CSS, Vue, Unity C#, TMod Loader C#, Roblox Luau, and even Scratch";
    }

    PageWidth = Math.floor(innerWidth + 18);

    if (arr[0].innerText.length == PageWidth) return;

    TickCount += 1;

    if (Config.wavyText) {
        AISTR.forEach((x, i) => {
            x.style.transform = `translate(${(i - AISTR.length / 2) * 10}px, ${Math.cos(TickCount / (Math.PI * 3) - x.sel) * 5}px)`;
        });


    } else {
        AISTR.forEach((x, i) => {
            x.style.transform = `translate(${(i - AISTR.length / 2) * 10}px, 0px)`;
        });


    }

    if (Config.pulsingText) {
        BOUNDLESS.forEach((x, i) => {
            x.style.transform = `translate(${(i - BOUNDLESS.length / 2) * ( 8 + Math.abs(2 * Math.sin(TickCount / (Math.PI * 5) ))) }px, 0px)`;
        });


    } else {
        BOUNDLESS.forEach((x, i) => {
            x.style.transform = `translate(${(i - BOUNDLESS.length / 2) * 10}px, 0px)`;
        });


    }
    
    if (!Config.showBinary) {
        if (arr[0].innerText.length > 0) arr.forEach(x => x.innerText = "");
        return;
    }

    // ARCHBOUND.forEach((x, i) => {
    //     x.style.transform = `translate(${(i - ARCHBOUND.length / 2) * ( 5 + Math.abs(5 * Math.sin(TickCount / (Math.PI * 5) ))) }px, ${Math.cos(TickCount / (Math.PI * 5) - x.sel) * 5}px)`;
    // })

    if (Config.ajustBackground && !Config.shiftingBackground) {
        pos = pos + (RF ? -1 : 1);
        if (RF && pos <= 0) {
            RF = false;
        } else if (!RF && pos >= 16) {
            RF = true;
        }
    } else pos += 1;

    if (pos >= 18) pos -= 18;

    BTM.forEach((s, v) => {
        if (v % 2 == 0) {
            if (Config.ajustBackground) arr[v].style.left = `${pos}px`;
            if (Config.shiftingBackground && (pos == 0 || BTM[v].length > PageWidth / 19 + 2)) BTM[v] = BTM[v].slice(0, -1);
            if (BTM[v].length < PageWidth / 19) BTM[v] = (Math.random() > 0.5 ? "1" :  "0") + BTM[v];
        }
        else {
            if (Config.ajustBackground) arr[v].style.right = `${pos}px`;
            if (Config.shiftingBackground && (pos == 0 || BTM[v].length > PageWidth / 19 + 2)) BTM[v] = BTM[v].slice(1, 1e20);
            if (BTM[v].length < PageWidth / 19) BTM[v] = BTM[v] + (Math.random() > 0.5 ? "1" :  "0");
            if (BTM[v].length > PageWidth / 19 ) BTM[v].slice(1, 1e20);
        }
        arr[v].innerText = BTM[v];
    });

    
    
}

const AISTR = "NO ARTIFICIAL INTELLIGENCE CAN OVERPOWER MY CREATIVITY".split("");
const BOUNDLESS = "MY CREATIVITY... IT HAS NO LIMITS... I JUST NEED TIME...".split("");
// const ARCHBOUND = "CHAOS CHAOS".split("");

let co = 0;

NullAI.innerHTML = "";
Boundless.innerHTML = "";
// ArchBound.innerHTML = "";

AISTR.forEach((x, i) => {
    k = NullAI.appendChild(document.createElement("span"));
    k.innerText = x;
    k.classList.add("Wavey");
    k.sel = co
    AISTR[i] = k;
    if (x != " ") co++;
})

BOUNDLESS.forEach((x, i) => {
    k = Boundless.appendChild(document.createElement("span"));
    k.innerText = x;
    k.classList.add("HorizontalPulse");
    BOUNDLESS[i] = k;
})

// co = 0;

// ARCHBOUND.forEach((x, i) => {
//     k = ArchBound.appendChild(document.createElement("span"));
//     k.innerText = x;
//     k.classList.add("ArchBound");
//     k.sel = co
//     ARCHBOUND[i] = k;
//     if (x != " ") co++;
// })


Update()

setInterval(Update, 33);



