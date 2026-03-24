
let pos = 0;
let syne = 0;

let PageWidth = Math.floor(innerWidth / 18);
let PageHeight = Math.floor(innerHeight / 32);

function Update(){

    Glitchy.innerHTML = wordCycle(["Staller", "Irreplaceable", "Eternal", "Uncontainable", "Near Perfect", "Fundamental", "Celestial", "Unbound"]) + " Glitchyfishys";
    // GlitchyInfo.innerHTML = wordCycle(["Celestial of Perfection", "Creativity Unbound", "Redefined Master Mind", "Stallar Enhancement"]);
    PGL.innerHTML = wordCycle(["HTML", "Java Script", "CSS", "Vue", "Unity C#", "TMod Loader C#", "Roblox Luau", "Scratch"]);

    PageWidth = Math.floor(innerWidth);

    if (arr[0].innerText.length == PageWidth) return;

    pos += 2;
    syne += 1;

    if (syne >= 360) syne -= 360;
    if (pos >= 18) pos -= 18;

    arr.forEach((s, v) => {
        if (v % 2 == 0) {
            s.style.left = `${pos}px`;
            if (pos == 0 || s.innerText.length > PageWidth / 18 + 2) s.innerText = s.innerText.slice(0, -1);
            if (s.innerText.length < PageWidth / 18) s.innerText = (Math.random() > 0.5 ? "1" :  "0") + s.innerText;
        }
        else {
            s.style.right = `${pos}px`;
            if (pos == 0 || s.innerText.length > PageWidth / 18 + 2) s.innerText = s.innerText.slice(1, 1e20);
            if (s.innerText.length < PageWidth / 18) s.innerText = s.innerText + (Math.random() > 0.5 ? "1" :  "0");
            if (s.innerText.length > PageWidth / 18) s.innerText.slice(1, 1e20);
        }
    });

    AISTR.forEach((x, i) => {
        x.style.transform = `translate(${(i - AISTR.length / 2) * 5}px, ${Math.cos(syne / (Math.PI * 5) - x.sel) * 5}px)`;
    })
}

for (let i = -1; i < PageHeight+1; i++) {
    const c = document.createElement("div");
    BinaryBackground.appendChild(c);
    c.style.top = `${i * 32}px`;
    c.classList.add("binary");
    if (i % 2 == 0) {
        c.style.transform = "translateX(64px)";
        c.style.textAlign = "left";
    }
    else {
        c.style.transform = "translateX(-64px)";
        c.style.textAlign = "right";
    }

}

const arr = Array.from(BinaryBackground.children);

arr.forEach((s, v) => {
    if (v % 2 == 0) {
        s.style.left = `${pos}px`;
        if (pos == 0) s.innerText = s.innerText.slice(0, -1);
        if (s.innerText.length > PageWidth / 18) s.innerText.slice(0, -1);
        if (s.innerText.length < PageWidth / 18) s.innerText = (Math.random() > 0.5 ? "1" :  "0") + s.innerText;
    }
    else {
        s.style.right = `${pos}px`;
        if (pos == 0) s.innerText = s.innerText.slice(1, 1e20);
        if (s.innerText.length > PageWidth / 18) s.innerText.slice(1, 1e20);
        if (s.innerText.length < PageWidth / 18) s.innerText = s.innerText + (Math.random() > 0.5 ? "1" :  "0");
    }
});

const AISTR = "NO  ARTIFICIAL  INTELLIGENCE  CAN  OVERPOWER  MY  CREATIVITY".split("");

let co = 0;

NullAI.innerHTML = "";

AISTR.forEach((x, i) => {
    k = NullAI.appendChild(document.createElement("span"));
    k.innerText = x;
    k.classList.add("Wavey");
    k.sel = co
    AISTR[i] = k;
    if (x != " ") co++;
})

Update()

setInterval(Update, 33);
