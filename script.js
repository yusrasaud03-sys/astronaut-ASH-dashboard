// --- بيانات 
let chart;
let alertsLog = [];
let dataLog = [];
let isDangerMode = false;
let currentAstronaut = "Yusra";

const astronauts = {
  Ashwag: { role: "Cyber Security", status: "In Mission: Data Encryption", health: "Optimal" },
  Yusra: { role: "Cyber Security", status: "In Mission: Monitoring", health: "Optimal" },
  Entdhar: { role: "Engineer", status: "idle: resting", health: "Stable" },
  Areen: { role: "Cyber Security", status: "In Mission: System Maintenance", health: "Stable" }
};

// ------- الصفحات 
function showPage(page) {
  const content = document.getElementById("content");

  if (page === "home") {

    content.innerHTML = homePage();
    initChart();

  } else if (page === "sensors") {

    content.innerHTML = `
    <h2 style="color:cyan;">Suit Sensor Network</h2>

    <div class="dashboard" style="flex-wrap:wrap;">

      <div class="card" style="min-width:250px; text-align:left; border-left:4px solid #ff4d4d;">
        <h3><i class="fa-solid fa-heart-pulse"></i> Heart Rate Sensor</h3>
        <p><strong>Location:</strong> Chest Unit</p>
        <p><strong>Function:</strong> Cardiovascular monitoring</p>
        <p id="heartValue" style="font-size:28px; color:#ff4d4d;">-- BPM</p>
        <small style="color:#aaa;">Detects abnormal stress and pulse fluctuations.</small>
      </div>

      <div class="card" style="min-width:250px; text-align:left; border-left:4px solid #00ffcc;">
        <h3><i class="fa-solid fa-lungs"></i>Oxygen Sensor</h3>
        <p><strong>Location:</strong> Helmet Intake</p>
        <p><strong>Function:</strong> Oxygen regulation</p>
        <p id="oxygenValue" style="font-size:28px; color:#00ffcc;">-- %</p>
        <small style="color:#aaa;">Monitors oxygen concentration inside suit.</small>
      </div>

      <div class="card" style="min-width:250px; text-align:left; border-left:4px solid #ffcc00;">
        <h3><i class="fa-solid fa-temperature-half"></i>Thermal Sensor</h3>
        <p><strong>Location:</strong> Suit Layers</p>
        <p><strong>Function:</strong> Temperature balancing</p>
        <p id="tempStatus" style="font-size:24px; color:#ffcc00;">Stable</p>
        <small style="color:#aaa;">Protects astronaut from thermal exposure.</small>
      </div>

      <div class="card" style="min-width:250px; text-align:left; border-left:4px solid cyan;">
        <h3><i class="fa-solid fa-gauge-high"></i>Pressure Sensor</h3>
        <p><strong>Location:</strong> Upper Torso</p>
        <p><strong>Function:</strong> Cabin pressure stability</p>
        <p style="font-size:24px; color:cyan;">101.3 Pa</p>
        <small style="color:#aaa;">Maintains internal pressure equilibrium.</small>
      </div>

      <div class="card" style="min-width:250px; text-align:left; border-left:4px solid #bc13fe;">
        <h3><i class="fa-solid fa-radiation"></i>Radiation Sensor</h3>
        <p><strong>Location:</strong> External Shielding</p>
        <p><strong>Function:</strong> Cosmic Ray Detection</p>
        <p id="radValue" style="font-size:24px; color:#bc13fe;">0.02 mSv</p>
        <small style="color:#aaa;">Monitors ionizing radiation levels.</small>
      </div>
    
    </div>
    `;

  

  } else if (page === "ai") {

    content.innerHTML = `
    <h2 style="color:cyan;">Astronaut AI Assistant</h2>

    <div class="card" style="padding:20px;">

      <div id="aiChat"
      style="
      height:350px;
      overflow-y:auto;
      background:#0f1525;
      border-radius:10px;
      padding:15px;
      margin-bottom:15px;
      text-align:left;
      border:1px solid #1b2445;
      ">

      <div style="margin-bottom:15px;">
        <div style="color:#00ffcc;">
          <i class="fa-solid fa-robot"></i> AI:
        </div>

        <div style="
        background:#11182d;
        padding:10px;
        border-radius:10px;
        margin-top:5px;
        ">
          Welcome ${currentAstronaut}. Ask me about astronaut vitals, oxygen systems, suit stability, radiation, or deep space conditions.
        </div>
      </div>

      </div>

      <div style="display:flex; gap:10px;">
        <input
        id="aiInput"
        placeholder="Ask about space, oxygen, pressure..."
        style="
        flex:1;
        padding:12px;
        border:none;
        border-radius:8px;
        background:#11182d;
        color:white;
        ">
        <button onclick="askAI()">ASK AI</button>
      </div>

      <div style="margin-top:15px; color:#aaa; font-size:12px;">
        Suggested:
        "How dangerous is low oxygen?"
        • "What does high BPM mean?"
        • "How does a space suit work?"
      </div>

    </div>
    `;

  } else if (page === "alerts") {

    content.innerHTML = `
    <h2 style="color:#ff4d4d;">Critical Mission Alerts</h2>

    <div class="card" style="
    max-height:500px;
    overflow-y:auto;
    text-align:left;
    padding:15px;
    "> 

<div id="alertsBox"></div>

    </div>
    `;

    renderAlerts();

  } else if (page === "profile") {

    content.innerHTML = `
    <h2>Astronaut Profiles</h2>

    <div class="profiles">

      <div class="profileCard" onclick="selectAstronaut('Ashwag')">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png">
        <h3>Ashwag</h3>
        <p>Cyber Security</p>
        <small style="color:#00ffcc;">${astronauts.Ashwag.status}</small>
      </div>

      <div class="profileCard" onclick="selectAstronaut('Yusra')">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140049.png">
        <h3>Yusra</h3>
        <p>Cyber Security</p>
        <small style="color:#00ffcc;">${astronauts.Yusra.status}</small>
      </div>

      <div class="profileCard" onclick="selectAstronaut('Areen')">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140043.png">
        <h3>Areen</h3>
        <p>Cyber Security</p>
        <small style="color:#00ffcc;">${astronauts.Areen.status}</small>
      </div>

<div class="profileCard" onclick="selectAstronaut('Entdhar')">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png">
        <h3>Entdhar</h3>
        <p>Engineer</p>
        <small style="color:#00ffcc;">${astronauts.Entdhar.status}</small>
      </div>
    </div>
    `;

  } else if (page === "data") {

    content.innerHTML = `
    <h2 style="color:cyan;">Mission Data Center</h2>

    <div class="dashboard">

      <div class="card">
        <h3>${currentAstronaut}</h3>
        <p>Role: ${astronauts[currentAstronaut].role}</p>
        <p>Status: <span id="healthStatus">Stable</span></p>
        <p>BPM: <span id="dataBpm">--</span></p>
        <p>Oxygen: <span id="dataOxy">--</span></p>
      </div>

      <div class="card" style="flex:2; text-align:left;">
        <h3>Telemetry History</h3>

        <ul id="dataHistory"
        style="
        list-style:none;
        padding:0;
        max-height:300px;
        overflow-y:auto;
        ">
        </ul>

      </div>

    </div>
    `;

  } else if (page === "env") {

    content.innerHTML = `
    <h2 style="color:cyan;">Environment Analysis</h2>

    <div class="dashboard" style="flex-wrap:wrap;">

      <div class="card">
        <h3><i class="fa-solid fa-temperature-half"></i> Internal Temp</h3>
        <h2 style="color:#00ffcc;">22°C</h2>
        <small>Stable Cabin</small>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-snowflake"></i>External Temp</h3>
        <h2 style="color:#ff4d4d;">-150°C</h2>
        <small>Space Vacuum</small>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-gauge-high"></i>Pressure</h3>
        <h2 style="color:cyan;">101.3 Pa</h2>
        <small>Normal</small>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-radiation"></i>Radiation</h3>
        <h2 style="color:#ffcc00;">Low</h2>
        <small>Safe Exposure</small>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-wind"></i>CO₂ Levels</h3>
        <h2 style="color:#00ffcc;">Normal</h2>
        <small>Air circulation active</small>
      </div>

      <div class="card">
        <h3><i class="fa-solid fa-lungs"></i>Oxygen Stability</h3>
        <h2 style="color:lime;">98%</h2>
        <small>Nominal</small>
      </div>

    </div>
    `;

  } else if (page === "vr") {

    openVR();
  }
}
// --- انتهى --

// ---- الصفحة الرئيسيه 
function homePage() {

  return `
  <div style="
  text-align:center;
  padding:10px;
  color:cyan;
  font-weight:bold;
  font-size:18px;
  ">
    ASTRONAUT:
    <span id="activeName">${currentAstronaut.toUpperCase()}</span>
  </div>

  <div class="model-box" style="position:relative;">
    <div class="mobile-ai-alert" onclick="toggleAlertPopup()">
  <i class="fa-solid fa-triangle-exclamation"></i>
</div>
    <div id="astronautStatusBadge" style="
      position: absolute;
      top: 10px;
      left: 10%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid cyan;
      padding: 5px 15px;
      border-radius: 20px;
      z-index: 10;color: white;
      text-align: center;
      min-width: 150px;
    ">
      <div style="font-size: 12px; color: cyan;">CURRENT OPERATOR</div>
      <div style="font-weight: bold;">${currentAstronaut}</div>
      <div id="badgeHealth" style="font-size: 10px; color: #00ffcc;">Condition: Stable </div>
    </div>

    <model-viewer
    id="model"
    src="astronaut.glb"
    auto-rotate
    camera-controls
    exposure="1"
    style="width:100%; height:350px; transition: filter 1s ease;">

      <div slot="hotspot-1" data-position="0m 1.2m 0.2m" class="sensor-dot blink-green" id="heartSensor" onclick="toggleLabel(this)">
        <span class="label">Heart Sensor</span>
      </div>

      <div slot="hotspot-2" data-position="0.3m 1.3m 0.2m" class="sensor-dot blink-green" id="oxySensor1" onclick="toggleLabel(this)">
        <span class="label">Oxygen Sensor</span>
      </div>

      <div slot="hotspot-3" data-position="-0.3m 1.4m 0.2m" class="sensor-dot blink-green" id="oxySensor2" onclick="toggleLabel(this)">
        <span class="label">Backup Oxygen</span>
      </div>

      <div slot="hotspot-4" data-position="0.4m 0.8m 0.2m" class="sensor-dot blink-green" id="tempSensor1" onclick="toggleLabel(this)">
        <span class="label">Thermal Sensor</span>
      </div>
      
      <div slot="hotspot-5" data-position="-0.4m 0.8m 0.2m" class="sensor-dot blink-green" id="radSensor" onclick="toggleLabel(this)">
        <span class="label">Radiation Sensor</span>
      </div>

    </model-viewer>

  </div>

  <div style="display:flex; justify-content:flex-start; padding:0 10px;">

<div onclick="showPage('vr')"
    style="
    background:rgba(0,255,204,0.2);
    border:1px solid #00ffcc;
    border-radius:5px;
    padding:4px 12px;
    cursor:pointer;
    font-size:10px;
    color:#00ffcc;
    margin-bottom:5px;
    ">
      <i class="fa-solid fa-vr-cardboard"></i> VR HUD MODE
    </div>

  </div>

  <div class="dashboard">

    <div class="card">
      <h3>Heart Rate</h3>
      <canvas id="chart"></canvas>
    </div>

    <div class="card">

      <h3>Oxygen</h3>

      <div class="circle"
      id="oxygenCircle"
      style="border:8px solid #333;">

        <span id="oxygen">98%</span>

      </div>

    </div>

    <div class="card">

      <h3>Status</h3>

      <div id="statusIndicator" class="status-dot green"></div>

      <p id="statusText">Stable</p>

    </div>

  </div>

  <div id="aiToastContainer"
  style="
  position:fixed;
  top:20px;
  right:20px;
  z-index:9999;
  ">
  </div>
  `;
  


}

// ---- المحاكاة  الشغل الاساسي
setInterval(() => {

  isDangerMode = !isDangerMode;

}, 10000);

setInterval(() => {

  let bpm = isDangerMode
    ? Math.floor(Math.random() * 30) + 120
    : Math.floor(Math.random() * 20) + 70;

  let oxygen = isDangerMode
    ? Math.floor(Math.random() * 5) + 85
    : Math.floor(Math.random() * 3) + 97;

  dataLog.unshift({
    name: currentAstronaut,
    bpm: bpm,
    oxy: oxygen,
    status: isDangerMode ? "CRITICAL" : "STABLE",
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString()
  });

  if (dataLog.length > 20) dataLog.pop();

  if (isDangerMode) {

    alertsLog.unshift(`
    <div style="
    background:#1a0f0f;
    border-left:5px solid red;
    padding:12px;
    border-radius:10px;
    margin-bottom:10px;
    ">
      <div style="color:#ff4d4d; font-weight:bold;">
        <i class="fa-solid fa-triangle-exclamation"></i> CRITICAL SUIT ALERT
      </div>

      <div style="margin-top:8px;">
        <strong>${currentAstronaut}</strong><br>
        BPM: ${bpm} | Oxygen: ${oxygen}%<br>
        ${new Date().toLocaleDateString("en-US")} -
        ${new Date().toLocaleTimeString("en-US")}
      </div>
    </div>
    `);

    if (alertsLog.length > 15) alertsLog.pop();
  }

  updateUI(bpm, oxygen);

}, 2000);

// --------- تحديث الواجهة ---------
function updateUI(bpm, oxygen) {

  const oxyEl = document.getElementById("oxygen");
  const oxyCircle = document.getElementById("oxygenCircle");
  const modelViewer = document.getElementById("model");
  const statusInd = document.getElementById("statusIndicator");
  const statusText = document.getElementById("statusText");
  const badgeHealth = document.getElementById("badgeHealth");

  if (oxyEl && oxyCircle) {

    oxyEl.innerText = oxygen + "%";

    const color = isDangerMode
      ? "#ff4d4d"
      : "#00ffcc";

    oxyCircle.style.background = `conic-gradient(${color} ${oxygen}%, transparent 0)`;
  }

  if (modelViewer) {

    modelViewer.style.filter = isDangerMode
      ? "sepia(1) saturate(5) hue-rotate(-50deg)"
      : "sepia(1) saturate(2) hue-rotate(90deg)";

    if (isDangerMode) {
      showAiToast(bpm, oxygen);
    }
  }

  if (statusInd) {
    statusInd.className = isDangerMode
      ? "status-dot red"
      : "status-dot green";
  }

  if (statusText) {
    statusText.innerHTML = isDangerMode
      ? "Critical Condition"
      : "Stable";
  }
  
  // تحديث الحالة الصحية في البوكس الصغير فوق البدلة
  if (badgeHealth) {
    badgeHealth.innerText = isDangerMode ? "Condition: CRITICAL" : "Condition: Optimal";
    badgeHealth.style.color = isDangerMode ? "#ff4d4d" : "#00ffcc";
  }

  // الحساسات
  if (document.getElementById("heartValue")) {
    document.getElementById("heartValue").innerText = bpm + " BPM";
  }

  if (document.getElementById("oxygenValue")) {
    document.getElementById("oxygenValue").innerText = oxygen + " %";
  }

  if (document.getElementById("tempStatus")) {
    document.getElementById("tempStatus").innerText =
    isDangerMode ? "Critical Heat" : "Stable";
  }

  //  الداتا
  if (document.getElementById("dataBpm")) {
    document.getElementById("dataBpm").innerText = bpm;
  }

  if (document.getElementById("dataOxy")) {
    document.getElementById("dataOxy").innerText = oxygen + "%";
  }

  if (document.getElementById("healthStatus")) {
    document.getElementById("healthStatus").innerText =
    isDangerMode ? "CRITICAL" : "STABLE";
  }

  const historyList = document.getElementById("dataHistory");

  if (historyList) {

    historyList. innerHTML = dataLog.map(l => `
    <li>
      <i class="fa-solid fa-user-astronaut"></i> <strong>${l.name}</strong>
      | <i class="fa-solid fa-heart-pulse"></i> ${l.bpm} BPM
      | <i class="fa-solid fa-lungs"></i> ${l.oxy}%
      | ${l.status}
      <br>
      <small>${l.date} - ${l.time}</small>
    </li>
    `).join("");
  }

  // VR
  const vrHealth = document.getElementById("vrHealth");
  const vrOxygen = document.getElementById("vrOxygen");
  const vrStatus = document.getElementById("vrStatus");

  if (vrHealth) vrHealth.innerText = bpm + " BPM";
  if (vrOxygen) vrOxygen.innerText = oxygen + "%";
  if (vrStatus) vrStatus.innerText =
  isDangerMode ? "CRITICAL" : "STABLE";

  // الرسم البياني
  if (chart) {

    chart.data.datasets[0].data.push(bpm);
    chart.data.datasets[0].data.shift();

    chart.update();
  }
}

// ---- -اختيار الرائد- ترجع الهوم ---
function selectAstronaut(name) {

  currentAstronaut = name;

  showPage("home");
}

// ------اساله محدده AI
function askAI() {

  let input = document.getElementById("aiInput").value.toLowerCase();

  if (!input.trim()) return;

  let chat = document.getElementById("aiChat");

  let response =
  "Mission systems operational. No anomalies detected.";

  if (input.includes("oxygen")) {

    response =
    "Oxygen systems maintain breathable atmosphere inside the suit. Critical drops below 90% may cause dizziness and loss of consciousness.";

  } 
  //new answer=---
  else if (input.includes("Hi","Hello")|| input.includes("hi","hello") ) {

    response =
    `Hello 👋 
    How can I assist you today? <br><br>
    • Check oxygen level<br>
    • Show astronaut status<br>
    • Any danger alerts?<br>
    • Explain VR monitoring<br>
    • Show environment data`;
  }
  else if (input.includes("heart")) {

    response =
    "Elevated heart rate may indicate stress, fatigue, or dangerous environmental exposure.";

  } else if (input.includes("space")) {

    response =
    "Outer space is a vacuum environment with extreme temperatures and radiation exposure.";

  } else if (input.includes("radiation")) {

    response =
    "Radiation shielding protects astronauts from harmful cosmic particles.";

  } else if (input.includes("pressure")) {

    response =
    "Suit pressure systems maintain internal life-support equilibrium.";

  }
 else if (input.includes("status")) {

    response =
    "All astronaut systems are currently stable.";
 }
 else if (input.includes("alert")) {

    response =
    "No critical alerts detected at the moment.";
 }
 else if (input.includes("vr")) {

    response =
    "VR monitoring displays live astronaut health and suit telemetry.";

} else if (input.includes("temperature")) {

    response =
    "External temperature sensors monitor extreme thermal conditions in space.";

} else if (input.includes("co2")) {

    response =
    "CO₂ levels are maintained within safe breathing limits.";
 }
 else {

    response =
    "AI assistant could not recognize the request.";
 }
  chat.innerHTML += `
  <div style="margin-top:15px;">

    <div style="color:white;">
      <i class="fa-solid fa-user-astronaut"></i> YOU:
    </div>

    <div style="
    background:#1b2445;
    padding:10px;
    border-radius:10px;
    margin-top:5px;
    color:white;
    ">
      ${input}
    </div>

  </div>
  <div style="margin-top:10px;">

    <div style="color:#00ffcc;">
      <i class="fa-solid fa-robot"></i> AI:
    </div>

    <div style="
    background:#11182d;
    padding:10px;
    border-radius:10px;
    margin-top:5px;
    ">
      ${response}
    </div>

  </div>
  `;

  document.getElementById("aiInput").value = "";

  chat.scrollTop = chat.scrollHeight;
}


// ---- AI ALERT رساله منبثقه
function showAiToast(bpm, oxygen) {

  const container =
  document.getElementById("aiToastContainer");

  if (!container || container.childElementCount > 0) return;

  const toast = document.createElement("div");

  toast.style.cssText = `
  width:300px;
  background:rgba(20,20,20,0.95);
  border-left:5px solid red;
  color:white;
  padding:15px;
  border-radius:10px;
  box-shadow:0 0 20px rgba(255,0,0,0.5);
  animation: slideIn 0.3s ease;
  `;

  toast.innerHTML = `
  <div style="color:#ff4d4d; font-weight:bold; font-size:15px;">
    <i class="fa-solid fa-triangle-exclamation"></i> AI CRITICAL WARNING
  </div>

  <div style="margin-top:10px; line-height:1.6;">
    Astronaut:
    <strong>${currentAstronaut}</strong><br>

    Heart Rate:
    <strong>${bpm} BPM</strong><br>

    Oxygen:
    <strong>${oxygen}%</strong><br><br>

    AI detected unstable biological readings.
    Immediate monitoring recommended.
  </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}


// ----- الرسم البياني2
function initChart() {

  const ctx = document.getElementById("chart");

  if (!ctx) return;

  chart = new Chart(ctx, {

    type: "line",

    data: {

      labels: ["","","","",""],

      datasets: [{
        data: [80,80,80,80,80],
        borderColor: "cyan",
        tension: 0.4
      }]
    },

    options: {

      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}


// ----VR 

function openVR() {

  document.getElementById("content").innerHTML = `
  <h2 style="color:cyan;">VR HUD ACTIVE</h2>

  <div class="vr-box"
  style="
  height:350px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:15px;
  ">

    <h2>${currentAstronaut}</h2>

    <div class="vr-line">
      <i class="fa-solid fa-heart-pulse"></i> HEART RATE:
      <span id="vrHealth">-- BPM</span>
    </div>

    <div class="vr-line">
      <i class="fa-solid fa-lungs"></i> OXYGEN:
      <span id="vrOxygen">--%</span>
    </div>

    <div class="vr-line">
      <i class="fa-solid fa-wave-square"></i> STATUS:
      <span id="vrStatus">STABLE</span>
    </div>

    <button onclick="showPage('home')">
      CLOSE VR
    </button>

  </div>
  `;
}

// --- الليبل 
function toggleLabel(el) {

  let label = el.querySelector(".label");

  if (label) {

    label.style.display =
    label.style.display === "block"
    ? "none"
    : "block";
  }
}

// ----- التنبيهات 
function renderAlerts() {

  let box = document.getElementById("alertsBox");

  if (box) {

    box.innerHTML = alertsLog.length
    ? alertsLog.join("")
    : `
    <div class="card">
      No critical alerts detected.
    </div>
    `;
  }
}

//---سايدبار الجوال


// ---- تشغيل الصفحة 
showPage("home");