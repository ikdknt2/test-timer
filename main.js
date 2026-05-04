let data = {};
let sections = [];
let current = 0;
let timeLeft = 0;
let timerId;

// ===== JSON読み込み =====
fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    initUI();
  });

// ===== UI初期化 =====
function initUI() {
  const examSelect = document.getElementById("exam");
  const levelSelect = document.getElementById("level");

  for (let exam in data) {
    examSelect.innerHTML += `<option>${exam}</option>`;
  }

  examSelect.onchange = () => updateLevels();
  updateLevels();

  function updateLevels() {
    levelSelect.innerHTML = "";
    for (let lv in data[examSelect.value]) {
      levelSelect.innerHTML += `<option>${lv}</option>`;
    }
  }
}

// ===== タイマー =====
function start() {
  const exam = document.getElementById("exam").value;
  const level = document.getElementById("level").value;

  sections = data[exam][level];
  current = 0;
  next();
}

function next() {
  if (current >= sections.length) {
    document.getElementById("section").textContent = "終了";
    document.getElementById("timer").textContent = "00:00";
    clearInterval(timerId);
    return;
  }

  let s = sections[current];
  document.getElementById("section").textContent = s.name;

  timeLeft = s.time * 60;

  clearInterval(timerId);
  timerId = setInterval(tick, 1000);
}

function tick() {
  timeLeft--;

  let m = Math.floor(timeLeft / 60);
  let s = timeLeft % 60;

  document.getElementById("timer").textContent =
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");

  if (timeLeft <= 0) {
    current++;
    next();
  }
}

