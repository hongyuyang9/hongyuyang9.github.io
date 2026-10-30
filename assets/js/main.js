/* ==========================================================
   Site settings
   ========================================================== */
const SITE = {
  // GoatCounter site code for private visitor stats (see README).
  // e.g. "hongyuyang9" if your dashboard is https://hongyuyang9.goatcounter.com
  // Leave empty to turn analytics off.
  goatcounter: "",

  // Like counter (free Abacus counter API; no account needed).
  likeNamespace: "hongyuyang9-github-io",
  likeKey: "likes",
};

const TABS = ["home", "publications", "cv", "hobbies"];

/* ==========================================================
   Tabs (hash routing: #home, #publications, ...)
   ========================================================== */
function currentTab() {
  const t = location.hash.slice(1);
  return TABS.includes(t) ? t : "home";
}

function showTab(scroll) {
  const tab = currentTab();
  document.querySelectorAll(".panel").forEach((p) => { p.hidden = p.id !== tab; });
  document.querySelectorAll(".tabs a").forEach((a) => {
    if (a.dataset.tab === tab) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  const label = document.querySelector(`.tabs a[data-tab="${tab}"]`).textContent;
  document.title = tab === "home" ? "Hongyu Yang" : `${label} · Hongyu Yang`;
  if (scroll) window.scrollTo({ top: 0 });
  layoutGalleries();
  trackPage(tab);
}

window.addEventListener("hashchange", () => showTab(true));

/* ==========================================================
   Photo galleries: masonry in reading order
   ========================================================== */
function layoutGalleries() {
  document.querySelectorAll(".gallery").forEach((g) => {
    const style = getComputedStyle(g);
    const row = parseFloat(style.gridAutoRows);
    const gap = parseFloat(style.rowGap);
    g.querySelectorAll(".photo").forEach((fig) => {
      const img = fig.querySelector("img");
      const w = fig.clientWidth;
      if (!w || !img.width) return; // hidden tab: done again when shown
      const h = (w * img.getAttribute("height")) / img.getAttribute("width");
      fig.style.gridRowEnd = `span ${Math.ceil((h + gap) / (row + gap))}`;
    });
  });
}
window.addEventListener("resize", layoutGalleries);

/* ==========================================================
   Light / dark toggle
   ========================================================== */
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
});

/* ==========================================================
   BibTeX toggles
   ========================================================== */
document.querySelectorAll(".bib-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const bib = btn.closest(".pub").querySelector(".bib");
    bib.hidden = !bib.hidden;
    btn.setAttribute("aria-expanded", String(!bib.hidden));
  });
});

/* ==========================================================
   "What to eat today?" picker
   Dishes come from the <li> items in index.html.
   ========================================================== */
const foodItems = [...document.querySelectorAll(".food-list li")];
const foodResult = document.querySelector(".food-result");
const foodBtn = document.querySelector(".food-btn");
let foodQueue = [];
let lastFood = -1;

function nextFood() {
  // Go through every dish once in random order before repeating
  if (!foodQueue.length) {
    foodQueue = foodItems.map((_, i) => i).sort(() => Math.random() - 0.5);
    if (foodQueue.length > 1 && foodQueue[0] === lastFood) foodQueue.push(foodQueue.shift());
  }
  lastFood = foodQueue.shift();
  return lastFood;
}

foodBtn.addEventListener("click", () => {
  if (!foodItems.length) return;
  const pick = nextFood();
  foodItems.forEach((li, i) => li.classList.toggle("on", i === pick));
  const name = document.createElement("span");
  name.className = "food-name";
  name.textContent = foodItems[pick].textContent;
  foodResult.replaceChildren(name);
});

/* ==========================================================
   Like button
   ========================================================== */
const likeBtn = document.querySelector(".like-btn");
const likeCount = likeBtn.querySelector(".like-count");
const likeIcon = likeBtn.querySelector("i");
const likeApi = (action) =>
  `https://abacus.jasoncameron.dev/${action}/${SITE.likeNamespace}/${SITE.likeKey}`;

function hasLiked() {
  try { return localStorage.getItem("liked") === "1"; } catch (e) { return false; }
}

function renderLiked(liked) {
  likeBtn.setAttribute("aria-pressed", String(liked));
  likeBtn.setAttribute("aria-label", liked ? "You liked this page" : "Like this page");
  likeIcon.className = liked ? "fa-solid fa-heart" : "fa-regular fa-heart";
}

async function loadLikes() {
  renderLiked(hasLiked());
  try {
    const res = await fetch(likeApi("get"));
    const data = await res.json();
    likeCount.textContent = typeof data.value === "number" ? data.value : 0;
  } catch (e) {
    likeCount.textContent = "0";
  }
}

likeBtn.addEventListener("click", async () => {
  if (hasLiked()) return;
  renderLiked(true);
  likeBtn.classList.remove("pop");
  void likeBtn.offsetWidth;
  likeBtn.classList.add("pop");
  try { localStorage.setItem("liked", "1"); } catch (e) { /* storage blocked */ }
  try {
    const res = await fetch(likeApi("hit"));
    const data = await res.json();
    if (typeof data.value === "number") likeCount.textContent = data.value;
  } catch (e) {
    likeCount.textContent = String((parseInt(likeCount.textContent, 10) || 0) + 1);
  }
});

/* ==========================================================
   Private visitor analytics (GoatCounter)
   Only you can see the dashboard; nothing is shown on the page.
   ========================================================== */
let gcReady = false;
let gcQueue = [];

function trackPage(tab) {
  if (!SITE.goatcounter) return;
  const path = tab === "home" ? "/" : `/${tab}`;
  if (gcReady) window.goatcounter.count({ path });
  else gcQueue.push(path);
}

function loadAnalytics() {
  if (!SITE.goatcounter) return;
  // Don't count local previews
  if (["localhost", "127.0.0.1", ""].includes(location.hostname)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${SITE.goatcounter}.goatcounter.com/count`;
  s.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
  s.onload = () => {
    gcReady = true;
    gcQueue.forEach((path) => window.goatcounter.count({ path }));
    gcQueue = [];
  };
  document.head.appendChild(s);
}

/* ==========================================================
   Init
   ========================================================== */
document.querySelectorAll(".year").forEach((el) => { el.textContent = new Date().getFullYear(); });
loadAnalytics();
showTab(false);
loadLikes();
