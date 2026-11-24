/* StardewSchedule v2 · Pixel Farm Plot + Pierre's Quest Board */

const STORAGE_KEY = 'stardew_schedule_v2';

const PERIOD_TIMES = [
  ['08:00', '08:45'], ['08:55', '09:40'],
  ['10:00', '10:45'], ['10:55', '11:40'],
  ['14:00', '14:45'], ['14:55', '15:40'],
  ['16:00', '16:45'], ['16:55', '17:40'],
  ['19:00', '19:45'], ['19:55', '20:40'],
  ['20:50', '21:35'], ['21:40', '22:25']
];

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

/* 16x16 Crisp Pixel Art Sprites */
const SPRITES = {
  sprout: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="9" width="2" height="5" fill="#3a8c3a"/><rect x="4" y="7" width="3" height="2" fill="#5ec24e"/><rect x="9" y="6" width="3" height="2" fill="#7ce063"/><rect x="5" y="13" width="6" height="2" fill="#6e3f1c"/></svg>`,
  parsnip: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#2e8b2e"/><rect x="5" y="2" width="2" height="2" fill="#49b549"/><rect x="9" y="2" width="2" height="2" fill="#49b549"/><rect x="5" y="4" width="6" height="5" fill="#f3c669"/><rect x="6" y="9" width="4" height="3" fill="#e0a23e"/><rect x="7" y="12" width="2" height="3" fill="#c78328"/><rect x="6" y="5" width="2" height="2" fill="#fff4cf"/></svg>`,
  strawberry: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="2" width="4" height="2" fill="#2e8b2e"/><rect x="4" y="4" width="8" height="5" fill="#d93838"/><rect x="5" y="9" width="6" height="3" fill="#c22929"/><rect x="6" y="12" width="4" height="2" fill="#a81d1d"/><rect x="6" y="6" width="1" height="1" fill="#ffd97d"/><rect x="9" y="7" width="1" height="1" fill="#ffd97d"/><rect x="7" y="10" width="1" height="1" fill="#ffd97d"/></svg>`,
  starfruit: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#f5c400"/><rect x="5" y="4" width="6" height="2" fill="#ffd83b"/><rect x="2" y="6" width="12" height="3" fill="#ffd83b"/><rect x="4" y="9" width="8" height="3" fill="#f0b000"/><rect x="3" y="12" width="3" height="2" fill="#d99400"/><rect x="10" y="12" width="3" height="2" fill="#d99400"/><rect x="6" y="6" width="2" height="2" fill="#fff6bf"/></svg>`,
  pumpkin: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="3" fill="#3a7d2c"/><rect x="3" y="5" width="10" height="8" fill="#e67e22"/><rect x="5" y="4" width="6" height="10" fill="#f39c12"/><rect x="7" y="5" width="2" height="8" fill="#d35400"/></svg>`,
  crystal: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#7dd3fc"/><rect x="5" y="4" width="6" height="8" fill="#38bdf8"/><rect x="6" y="6" width="4" height="4" fill="#e0f2fe"/><rect x="7" y="12" width="2" height="2" fill="#0284c7"/></svg>`,
  coffee: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="4" width="8" height="9" fill="#6f4e37"/><rect x="5" y="3" width="6" height="11" fill="#8b5a2b"/><rect x="7" y="4" width="2" height="9" fill="#3e2723"/></svg>`,
  junimoGreen: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#1e4d1e"/><rect x="5" y="4" width="6" height="2" fill="#65d455"/><rect x="3" y="6" width="10" height="6" fill="#65d455"/><rect x="4" y="12" width="8" height="2" fill="#4cb53e"/><rect x="5" y="8" width="2" height="2" fill="#1e293b"/><rect x="9" y="8" width="2" height="2" fill="#1e293b"/><rect x="2" y="8" width="1" height="2" fill="#4cb53e"/><rect x="13" y="8" width="1" height="2" fill="#4cb53e"/></svg>`,
  junimoYellow: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#7c4a03"/><rect x="5" y="4" width="6" height="2" fill="#fde047"/><rect x="3" y="6" width="10" height="6" fill="#facc15"/><rect x="4" y="12" width="8" height="2" fill="#eab308"/><rect x="5" y="8" width="2" height="2" fill="#1e293b"/><rect x="9" y="8" width="2" height="2" fill="#1e293b"/></svg>`,
  board: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="2" width="12" height="12" fill="#7c4d25"/><rect x="4" y="4" width="8" height="8" fill="#fae5b2"/><rect x="7" y="3" width="2" height="2" fill="#dc2626"/><rect x="5" y="7" width="6" height="1" fill="#73441e"/><rect x="5" y="9" width="4" height="1" fill="#73441e"/></svg>`,
  crate: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="4" width="12" height="10" fill="#964b17"/><rect x="3" y="5" width="10" height="8" fill="#cf8338"/><rect x="7" y="2" width="2" height="6" fill="#38bdf8"/><rect x="5" y="6" width="6" height="2" fill="#38bdf8"/></svg>`
};

const DEFAULT_COURSES = [
  { id: 'c1', name: '高等数学 (上)', day: 1, start: 1, end: 2, room: '教三 201', teacher: '王教授', weeks: '1-16', crop: 'parsnip', color: '#f9df9b', note: '【第一周重点】极限与连续的定义，课后习题 P32 第 3、5 题周五前交。' },
  { id: 'c2', name: '人工智能导论', day: 1, start: 5, end: 6, room: '信息楼 405', teacher: '陈老师', weeks: '1-16', crop: 'starfruit', color: '#bfe0f7', note: '期末大作业需要提交一个 AI Agent 或 CV 小项目，建议提前组队！' },
  { id: 'c3', name: '大学英语听说', day: 2, start: 3, end: 4, room: '外语楼 302', teacher: '林老师', weeks: '1-16', crop: 'strawberry', color: '#f7c4c4', note: '下周二课堂 3 分钟 Presentation，主题自选。' },
  { id: 'c4', name: 'Python 程序设计', day: 3, start: 1, end: 2, room: '实验机房 A202', teacher: '张老师', weeks: '1-16', crop: 'crystal', color: '#decaf7', note: '带好 U 盘，本次实验课写爬虫与数据清洗脚本。' },
  { id: 'c5', name: '国际贸易实务', day: 4, start: 3, end: 4, room: '经管楼 108', teacher: '周教授', weeks: '1-16', crop: 'pumpkin', color: '#f9cfab', note: '重点背诵 FOB / CIF / CFR 贸易术语风险划分界限。' },
  { id: 'c6', name: '数据结构与算法', day: 4, start: 7, end: 8, room: '教二 304', teacher: '刘老师', weeks: '1-16', crop: 'coffee', color: '#c4e8b4', note: '二叉树遍历手写代码必考。' },
  { id: 'c7', name: '开源软件工程实践', day: 5, start: 5, end: 6, room: '创新工坊 2F', teacher: '李老师', weeks: '1-14', crop: 'starfruit', color: '#c4e8b4', note: '学会 Git 分支管理、PR 规范与 README 编写。' }
];

let appState = loadState();
let activeView = 'farm'; // 'farm' | 'board'
let boardDay = getTodayIdx();
let activeCourseId = null;
let editingCourseId = null;

function getTodayIdx() {
  const d = new Date().getDay();
  return d === 0 ? 7 : d;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('stardew_schedule_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        week: parsed.week || 1,
        gold: parsed.gold ?? 150,
        sfx: parsed.sfx ?? true,
        harvested: parsed.harvested || { '1_c1': true, '1_c3': true },
        courses: Array.isArray(parsed.courses) && parsed.courses.length ? parsed.courses : structuredClone(DEFAULT_COURSES)
      };
    }
  } catch (e) {}
  return {
    week: 1,
    gold: 250,
    sfx: true,
    harvested: { '1_c1': true, '1_c3': true },
    courses: structuredClone(DEFAULT_COURSES)
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

/* 8-bit Web Audio SFX */
function playChime(type = 'click') {
  if (!appState.sfx) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'coin') {
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now); osc.stop(now + 0.28);
    } else {
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now); osc.stop(now + 0.07);
    }
  } catch (e) {}
}

function spawnFloatGold(x, y, text = '+50G') {
  const el = document.createElement('div');
  el.className = 'float-gold';
  el.textContent = text;
  el.style.left = (x || window.innerWidth / 2) + 'px';
  el.style.top = (y || window.innerHeight / 2) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function isCourseInWeek(weekStr, targetWeek) {
  if (!weekStr) return true;
  const s = String(weekStr).replace(/周/g, '').trim();
  if (s.includes('单') && targetWeek % 2 === 0) return false;
  if (s.includes('双') && targetWeek % 2 !== 0) return false;
  const clean = s.replace(/[单双()（）]/g, '');
  for (const p of clean.split(/[,，]/)) {
    if (p.includes('-')) {
      const [a, b] = p.split('-').map(n => parseInt(n, 10));
      if (!isNaN(a) && !isNaN(b) && targetWeek >= a && targetWeek <= b) return true;
    } else {
      const n = parseInt(p, 10);
      if (!isNaN(n) && targetWeek === n) return true;
    }
  }
  return false;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* Switch between Farm Plot and Pierre's Quest Board */
function switchView(v) {
  activeView = v;
  document.getElementById('viewFarm').style.display = v === 'farm' ? 'block' : 'none';
  document.getElementById('viewBoard').style.display = v === 'board' ? 'block' : 'none';
  document.getElementById('slotFarm').classList.toggle('active', v === 'farm');
  document.getElementById('slotBoard').classList.toggle('active', v === 'board');
  playChime('click');
  renderAll();
}

function renderAll() {
  const todayIdx = getTodayIdx();
  document.getElementById('hudDate').textContent = `第 ${appState.week} 周 · ${DAYS[todayIdx - 1]}`;
  document.getElementById('hudGold').textContent = String(appState.gold).padStart(6, '0');
  document.getElementById('hotWeekNum').textContent = `W${appState.week}`;
  document.getElementById('sfxLabel').textContent = appState.sfx ? '音效开' : '音效关';

  const weekCourses = appState.courses.filter(c => isCourseInWeek(c.weeks, appState.week));
  const done = weekCourses.filter(c => appState.harvested[`${appState.week}_${c.id}`]).length;
  const pct = weekCourses.length ? Math.round((done / weekCourses.length) * 100) : 0;
  document.getElementById('farmProgress').style.width = pct + '%';
  document.getElementById('farmCount').textContent = `${done} / ${weekCourses.length} 块已收割`;

  renderFarmGrid(todayIdx, weekCourses);
  renderQuestBoard(todayIdx, weekCourses);
}

/* VIEW A: Pixel Farm Plot */
function renderFarmGrid(todayIdx, weekCourses) {
  const grid = document.getElementById('farmGrid');
  grid.innerHTML = '';

  const corner = document.createElement('div');
  corner.className = 'day-sign';
  corner.textContent = '节次';
  grid.appendChild(corner);

  DAYS.forEach((d, i) => {
    const h = document.createElement('div');
    h.className = 'day-sign' + (i + 1 === todayIdx ? ' today' : '');
    h.textContent = d + (i + 1 === todayIdx ? ' ★' : '');
    grid.appendChild(h);
  });

  const occupied = new Set();
  for (let p = 1; p <= 12; p++) {
    const tCol = document.createElement('div');
    tCol.className = 'stone-time';
    tCol.style.gridColumn = '1';
    tCol.style.gridRow = String(p + 1);
    tCol.innerHTML = `${p}<small>${PERIOD_TIMES[p - 1][0]}</small>`;
    grid.appendChild(tCol);

    for (let d = 1; d <= 7; d++) {
      const key = `${d}_${p}`;
      if (occupied.has(key)) continue;
      const course = weekCourses.find(c => c.day === d && c.start === p);
      if (course) {
        const span = Math.max(1, course.end - course.start + 1);
        for (let k = course.start; k <= course.end; k++) occupied.add(`${d}_${k}`);

        const isDone = !!appState.harvested[`${appState.week}_${course.id}`];
        const el = document.createElement('div');
        el.className = 'crop-plot' + (isDone ? ' harvested' : '');
        el.style.gridColumn = String(d + 1);
        el.style.gridRow = `${p + 1} / span ${span}`;
        el.style.background = course.color || '#f9df9b';
        el.innerHTML = `
          <span class="plot-badge ${isDone ? 'gold' : 'sprout'}">${isDone ? '★ 成熟' : '生长中'}</span>
          <div>
            <div class="plot-title">${escapeHtml(course.name)}</div>
            <div class="plot-meta">${course.room ? '@' + escapeHtml(course.room) : ''}${course.teacher ? ' · ' + escapeHtml(course.teacher) : ''}</div>
          </div>
          <div class="plot-sprite-row">
            <span class="plot-soil-strip">${PERIOD_TIMES[course.start - 1][0]}</span>
            <span class="plot-crop-svg">${isDone ? SPRITES[course.crop || 'parsnip'] : SPRITES.sprout}</span>
          </div>
        `;
        el.onclick = () => { playChime('click'); openNovelModal(course.id); };
        grid.appendChild(el);
      } else {
        const soil = document.createElement('div');
        soil.className = 'soil-patch' + (d === todayIdx ? ' today-col' : '');
        soil.style.gridColumn = String(d + 1);
        soil.style.gridRow = String(p + 1);
        soil.onclick = () => { playChime('click'); openCourseModal(null, d, p); };
        grid.appendChild(soil);
      }
    }
  }
}

/* VIEW B: Pierre's Quest Bulletin Board */
function renderQuestBoard(todayIdx, weekCourses) {
  const pills = document.getElementById('boardDayPills');
  pills.innerHTML = '';
  DAYS.forEach((d, idx) => {
    const dayNum = idx + 1;
    const b = document.createElement('button');
    b.className = 'day-pill' + (boardDay === dayNum ? ' active' : '');
    b.textContent = d + (dayNum === todayIdx ? '(今)' : '');
    b.onclick = () => { boardDay = dayNum; playChime('click'); renderQuestBoard(todayIdx, weekCourses); };
    pills.appendChild(b);
  });

  document.getElementById('boardTitle').textContent = `皮埃尔公告板 · 第 ${appState.week} 周 ${DAYS[boardDay - 1]}`;
  const list = weekCourses.filter(c => c.day === boardDay).sort((a, b) => a.start - b.start);
  const qGrid = document.getElementById('questGrid');
  qGrid.innerHTML = '';

  if (!list.length) {
    qGrid.innerHTML = `<div class="empty-board" style="grid-column:1/-1;">今天没有安排课程！去鹈鹕镇海边钓鱼，或者点底部「7 播种新课」添加安排吧。</div>`;
    return;
  }

  list.forEach(c => {
    const isDone = !!appState.harvested[`${appState.week}_${c.id}`];
    const card = document.createElement('div');
    card.className = 'quest-note';
    card.innerHTML = `
      <div class="thumbtack"></div>
      <div class="quest-head">
        <h3>${escapeHtml(c.name)}</h3>
        <span class="quest-time">第${c.start}-${c.end}节 · ${PERIOD_TIMES[c.start - 1][0]}</span>
      </div>
      <div class="quest-body">
        <div><b>地点：</b>${escapeHtml(c.room || '未填写')} &nbsp;|&nbsp; <b>教师：</b>${escapeHtml(c.teacher || '未填写')}</div>
        <div style="margin-top:6px;"><b>手记摘要：</b>${escapeHtml((c.note || '暂无笔记，点击翻开轻小说手记记录重点...').slice(0, 48))}</div>
      </div>
      <div class="quest-foot">
        <button class="px-btn ${isDone ? '' : 'green'}" onclick="toggleHarvestDirect('${c.id}', event)">
          ${isDone ? '★ 已完成 (+50G)' : '完成任务 (+50G)'}
        </button>
        <button class="px-btn primary" onclick="openNovelModal('${c.id}')">翻开手记</button>
      </div>
    `;
    qGrid.appendChild(card);
  });
}

function toggleHarvestDirect(courseId, ev) {
  const hKey = `${appState.week}_${courseId}`;
  if (appState.harvested[hKey]) {
    delete appState.harvested[hKey];
    appState.gold = Math.max(0, appState.gold - 50);
  } else {
    appState.harvested[hKey] = true;
    appState.gold += 50;
    playChime('coin');
    spawnFloatGold(ev?.clientX, ev?.clientY, '+50G');
  }
  saveState();
  renderAll();
}

/* Light Novel Reader */
function openNovelModal(courseId) {
  const c = appState.courses.find(x => x.id === courseId);
  if (!c) return;
  activeCourseId = courseId;
  const idx = appState.courses.indexOf(c) + 1;
  document.getElementById('nvVol').textContent = `VOLUME ${String(idx).padStart(2, '0')} · 轻小说课程手记`;
  document.getElementById('nvTitle').textContent = c.name;
  document.getElementById('nvMeta').innerHTML = `
    <div><b>时间：</b>${DAYS[c.day - 1]} 第 ${c.start}-${c.end} 节（${PERIOD_TIMES[c.start - 1][0]}–${PERIOD_TIMES[c.end - 1][1]}）</div>
    <div><b>地点：</b>${escapeHtml(c.room || '未填写')}</div>
    <div><b>教师：</b>${escapeHtml(c.teacher || '未填写')}</div>
    <div><b>周次：</b>第 ${escapeHtml(c.weeks || '1-16')} 周</div>
  `;
  const noteEl = document.getElementById('nvNote');
  noteEl.value = c.note || '';
  noteEl.oninput = () => { c.note = noteEl.value; saveState(); };

  const isDone = !!appState.harvested[`${appState.week}_${c.id}`];
  document.getElementById('nvHarvestBtn').textContent = isDone ? '★ 本周已收割 (+50G)' : '收割打卡 (+50G)';
  document.getElementById('novelModal').classList.add('open');
}

function setNovelFont(px) { document.getElementById('nvNote').style.fontSize = px + 'px'; }

function harvestCurrentCourse(ev) {
  if (!activeCourseId) return;
  toggleHarvestDirect(activeCourseId, ev);
  openNovelModal(activeCourseId);
}

function editCurrentCourse() { closeModal('novelModal'); openCourseModal(activeCourseId); }
function deleteCurrentCourse() {
  if (!activeCourseId) return;
  appState.courses = appState.courses.filter(c => c.id !== activeCourseId);
  saveState(); closeModal('novelModal'); renderAll(); showToast('已铲除该地块课程');
}

/* Course Modal */
function openCourseModal(courseId = null, defaultDay = 1, defaultStart = 1) {
  editingCourseId = courseId;
  const c = courseId ? appState.courses.find(x => x.id === courseId) : null;
  document.getElementById('courseModalTitle').textContent = c ? '编辑农田课程' : '播种新课程';
  document.getElementById('fName').value = c ? c.name : '';
  document.getElementById('fRoom').value = c ? c.room : '';
  document.getElementById('fDay').value = c ? c.day : defaultDay;
  document.getElementById('fStart').value = c ? c.start : defaultStart;
  document.getElementById('fEnd').value = c ? c.end : Math.min(12, defaultStart + 1);
  document.getElementById('fTeacher').value = c ? c.teacher : '';
  document.getElementById('fWeeks').value = c ? c.weeks : '1-16';
  document.getElementById('fCrop').value = c ? (c.crop || 'parsnip') : 'parsnip';
  document.getElementById('fColor').value = c ? (c.color || '#f9df9b') : '#f9df9b';
  document.getElementById('courseModal').classList.add('open');
}

function saveCourseForm() {
  const name = document.getElementById('fName').value.trim();
  if (!name) return showToast('请填写课程名称');
  const start = Math.max(1, Math.min(12, parseInt(document.getElementById('fStart').value, 10) || 1));
  const end = Math.max(start, Math.min(12, parseInt(document.getElementById('fEnd').value, 10) || start));
  const payload = {
    id: editingCourseId || ('c_' + Date.now() + Math.random().toString(36).slice(2, 5)),
    name,
    room: document.getElementById('fRoom').value.trim(),
    day: parseInt(document.getElementById('fDay').value, 10),
    start, end,
    teacher: document.getElementById('fTeacher').value.trim(),
    weeks: document.getElementById('fWeeks').value.trim() || '1-16',
    crop: document.getElementById('fCrop').value,
    color: document.getElementById('fColor').value,
    note: editingCourseId ? (appState.courses.find(x => x.id === editingCourseId)?.note || '') : ''
  };
  if (editingCourseId) {
    const idx = appState.courses.findIndex(x => x.id === editingCourseId);
    if (idx >= 0) appState.courses[idx] = payload;
  } else {
    appState.courses.push(payload);
  }
  saveState(); closeModal('courseModal'); renderAll(); playChime('coin'); showToast('已播种到农田！');
}

/* 3-in-1 Import */
function openImportModal() { document.getElementById('importModal').classList.add('open'); }
function switchImportTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.imp-pane').forEach(p => p.style.display = 'none');
  btn.classList.add('active');
  document.getElementById('imp-' + tab).style.display = 'block';
}
function copyAiPrompt() {
  navigator.clipboard.writeText(document.getElementById('aiPromptText').textContent);
  showToast('已复制 AI 识图提示词！发给豆包/DeepSeek 即可');
}

const AUTO_COLORS = ['#f9df9b', '#c4e8b4', '#f7c4c4', '#bfe0f7', '#decaf7', '#f9cfab'];
const AUTO_CROPS = ['parsnip', 'strawberry', 'starfruit', 'pumpkin', 'crystal', 'coffee'];

function mergeImportedCourses(list) {
  if (!Array.isArray(list) || !list.length) return showToast('未识别到有效课程');
  appState.courses = list.map((item, i) => ({
    id: 'imp_' + Date.now() + '_' + i,
    name: String(item.name || '未命名课程'),
    day: Math.max(1, Math.min(7, parseInt(item.day, 10) || 1)),
    start: Math.max(1, Math.min(12, parseInt(item.start, 10) || 1)),
    end: Math.max(1, Math.min(12, parseInt(item.end, 10) || parseInt(item.start, 10) || 2)),
    room: String(item.room || ''),
    teacher: String(item.teacher || ''),
    weeks: String(item.weeks || '1-16'),
    crop: item.crop || AUTO_CROPS[i % AUTO_CROPS.length],
    color: item.color || AUTO_COLORS[i % AUTO_COLORS.length],
    note: String(item.note || '')
  }));
  saveState(); closeModal('importModal'); renderAll(); playChime('coin');
  showToast(`成功播种 ${appState.courses.length} 门课程！`);
}

function importFromJsonText() {
  try {
    let raw = document.getElementById('aiJsonInput').value.trim();
    const m = raw.match(/\[[\s\S]*\]/);
    if (m) raw = m[0];
    mergeImportedCourses(JSON.parse(raw));
  } catch (e) { showToast('JSON 格式有误，请确认完整复制了 [...]'); }
}

function importFromPlainText() {
  const lines = document.getElementById('plainTextInput').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const dayMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 7, '天': 7, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 };
  const parsed = [];
  for (const line of lines) {
    const dm = line.match(/(?:周|星期)([一二三四五六日天1-7])/);
    const pm = line.match(/(\d{1,2})\s*[-~到至]\s*(\d{1,2})\s*节?/);
    if (!dm || !pm) continue;
    const wm = line.match(/(\d{1,2}\s*-\s*\d{1,2}\s*周?(?:[（(]?[单双][)）]?)?)/);
    let rest = line.replace(dm[0], '').replace(pm[0], '');
    if (wm) rest = rest.replace(wm[0], '');
    const tokens = rest.trim().split(/\s+/).filter(Boolean);
    parsed.push({
      name: tokens[0] || '课程', room: tokens[1] || '', teacher: tokens[2] || '',
      day: dayMap[dm[1]], start: parseInt(pm[1], 10), end: parseInt(pm[2], 10),
      weeks: wm ? wm[1].replace(/\s+/g, '') : '1-16'
    });
  }
  mergeImportedCourses(parsed);
}

function importFromFile(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result);
    if (file.name.endsWith('.json')) {
      try { const d = JSON.parse(text); mergeImportedCourses(Array.isArray(d) ? d : d.courses); }
      catch (e) { showToast('JSON 解析失败'); }
    } else if (file.name.endsWith('.ics')) {
      const events = text.split('BEGIN:VEVENT').slice(1);
      const list = [], seen = new Set();
      for (const ev of events) {
        const sum = (ev.match(/SUMMARY:(.*)/) || [])[1]?.trim();
        const loc = (ev.match(/LOCATION:(.*)/) || [])[1]?.trim() || '';
        const dt = (ev.match(/DTSTART[^:]*:(\d{8})T(\d{2})(\d{2})/) || []);
        if (!sum || !dt[1]) continue;
        const y = +dt[1].slice(0, 4), m = +dt[1].slice(4, 6) - 1, d = +dt[1].slice(6, 8);
        const jsDay = new Date(y, m, d).getDay();
        const day = jsDay === 0 ? 7 : jsDay;
        const hh = +dt[2];
        const start = hh < 10 ? 1 : (hh < 12 ? 3 : (hh < 16 ? 5 : (hh < 18 ? 7 : 9)));
        const key = `${sum}_${day}_${start}`;
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({ name: sum, day, start, end: start + 1, room: loc, weeks: '1-16' });
      }
      mergeImportedCourses(list);
    }
    input.value = '';
  };
  reader.readAsText(file, 'utf-8');
}

function exportBackupJson() {
  const blob = new Blob([JSON.stringify(appState.courses, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'stardew-schedule-backup.json';
  a.click();
  showToast('已导出 JSON 备份');
}

function resetDemoData() {
  appState.courses = structuredClone(DEFAULT_COURSES);
  appState.harvested = { '1_c1': true, '1_c3': true };
  saveState(); closeModal('importModal'); renderAll(); showToast('已恢复示例农田');
}

function changeWeek(delta) { appState.week = Math.max(1, Math.min(20, appState.week + delta)); saveState(); renderAll(); playChime('click'); }
function resetToWeek1() { appState.week = 1; saveState(); renderAll(); playChime('click'); }
function toggleSfx() { appState.sfx = !appState.sfx; saveState(); renderAll(); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* Keyboard shortcuts 1/2 for hotbar */
window.addEventListener('keydown', e => {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
  if (e.key === '1') switchView('farm');
  if (e.key === '2') switchView('board');
});

/* Boot */
(function boot() {
  document.getElementById('junimo1').innerHTML = SPRITES.junimoGreen;
  document.getElementById('junimo2').innerHTML = SPRITES.junimoYellow;
  document.getElementById('icoFarm').innerHTML = SPRITES.parsnip;
  document.getElementById('icoBoard').innerHTML = SPRITES.board;
  document.getElementById('icoImport').innerHTML = SPRITES.crate;
  document.getElementById('icoPlant').innerHTML = SPRITES.sprout;

  function updateClock() {
    const now = new Date();
    document.getElementById('hudClock').textContent =
      String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }
  updateClock();
  setInterval(updateClock, 15000);
  renderAll();
})();
