/* StardewSchedule v3 · Simple, Practical, Pixel Farm + Pierre's Board + 4-in-1 Import */

const STORAGE_KEY = 'stardew_schedule_v3';

const DEFAULT_PERIOD_STARTS = [
  '08:00', '08:55', '10:00', '10:55',
  '14:00', '14:55', '16:00', '16:55',
  '19:00', '19:55', '20:50', '21:40'
];

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const SPRITES = {
  sprout: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="9" width="2" height="5" fill="#3a8c3a"/><rect x="4" y="7" width="3" height="2" fill="#5ec24e"/><rect x="9" y="6" width="3" height="2" fill="#7ce063"/><rect x="5" y="13" width="6" height="2" fill="#6e3f1c"/></svg>`,
  parsnip: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#2e8b2e"/><rect x="5" y="2" width="2" height="2" fill="#49b549"/><rect x="9" y="2" width="2" height="2" fill="#49b549"/><rect x="5" y="4" width="6" height="5" fill="#f3c669"/><rect x="6" y="9" width="4" height="3" fill="#e0a23e"/><rect x="7" y="12" width="2" height="3" fill="#c78328"/><rect x="6" y="5" width="2" height="2" fill="#fff4cf"/></svg>`,
  strawberry: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="2" width="4" height="2" fill="#2e8b2e"/><rect x="4" y="4" width="8" height="5" fill="#d93838"/><rect x="5" y="9" width="6" height="3" fill="#c22929"/><rect x="6" y="12" width="4" height="2" fill="#a81d1d"/><rect x="6" y="6" width="1" height="1" fill="#ffd97d"/><rect x="9" y="7" width="1" height="1" fill="#ffd97d"/><rect x="7" y="10" width="1" height="1" fill="#ffd97d"/></svg>`,
  starfruit: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#f5c400"/><rect x="5" y="4" width="6" height="2" fill="#ffd83b"/><rect x="2" y="6" width="12" height="3" fill="#ffd83b"/><rect x="4" y="9" width="8" height="3" fill="#f0b000"/><rect x="3" y="12" width="3" height="2" fill="#d99400"/><rect x="10" y="12" width="3" height="2" fill="#d99400"/><rect x="6" y="6" width="2" height="2" fill="#fff6bf"/></svg>`,
  pumpkin: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="3" fill="#3a7d2c"/><rect x="3" y="5" width="10" height="8" fill="#e67e22"/><rect x="5" y="4" width="6" height="10" fill="#f39c12"/><rect x="7" y="5" width="2" height="8" fill="#d35400"/></svg>`,
  crystal: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#7dd3fc"/><rect x="5" y="4" width="6" height="8" fill="#38bdf8"/><rect x="6" y="6" width="4" height="4" fill="#e0f2fe"/><rect x="7" y="12" width="2" height="2" fill="#0284c7"/></svg>`,
  coffee: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="4" width="8" height="9" fill="#6f4e37"/><rect x="5" y="3" width="6" height="11" fill="#8b5a2b"/><rect x="7" y="4" width="2" height="9" fill="#3e2723"/></svg>`,
  junimoGreen: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#1e4d1e"/><rect x="5" y="4" width="6" height="2" fill="#65d455"/><rect x="3" y="6" width="10" height="6" fill="#65d455"/><rect x="4" y="12" width="8" height="2" fill="#4cb53e"/><rect x="5" y="8" width="2" height="2" fill="#1e293b"/><rect x="9" y="8" width="2" height="2" fill="#1e293b"/></svg>`,
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
let activeView = 'farm';
let boardDay = getTodayIdx();
let activeCourseId = null;
let editingCourseId = null;

function getTodayIdx() { const d = new Date().getDay(); return d === 0 ? 7 : d; }

function computeCurrentWeek(startDateStr) {
  if (!startDateStr) return 1;
  const start = new Date(startDateStr + 'T00:00:00');
  const diffDays = Math.floor((Date.now() - start.getTime()) / 86400000);
  if (isNaN(diffDays) || diffDays < 0) return 1;
  return Math.min(20, Math.floor(diffDays / 7) + 1);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('stardew_schedule_v2');
    if (raw) {
      const p = JSON.parse(raw);
      const startDate = p.startDate || '';
      return {
        week: startDate ? computeCurrentWeek(startDate) : (p.week || 1),
        startDate,
        periodStarts: Array.isArray(p.periodStarts) && p.periodStarts.length === 12 ? p.periodStarts : [...DEFAULT_PERIOD_STARTS],
        gold: p.gold ?? 250,
        sfx: p.sfx ?? true,
        harvested: p.harvested || { '1_c1': true, '1_c3': true },
        ddls: Array.isArray(p.ddls) ? p.ddls : [{ id: 'd1', title: '高数习题 P32 提交', date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10), done: false }],
        courses: Array.isArray(p.courses) && p.courses.length ? p.courses : structuredClone(DEFAULT_COURSES)
      };
    }
  } catch (e) {}
  return {
    week: 1,
    startDate: '',
    periodStarts: [...DEFAULT_PERIOD_STARTS],
    gold: 250,
    sfx: true,
    harvested: { '1_c1': true, '1_c3': true },
    ddls: [{ id: 'd1', title: '高数习题 P32 提交', date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10), done: false }],
    courses: structuredClone(DEFAULT_COURSES)
  };
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); }

function playChime(type = 'click') {
  if (!appState.sfx) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'square'; osc.connect(gain); gain.connect(ctx.destination);
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
  t.textContent = msg; t.classList.add('show');
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

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

function switchView(v) {
  activeView = v;
  document.getElementById('viewFarm').style.display = v === 'farm' ? 'block' : 'none';
  document.getElementById('viewBoard').style.display = v === 'board' ? 'block' : 'none';
  document.getElementById('slotFarm').classList.toggle('active', v === 'farm');
  document.getElementById('slotBoard').classList.toggle('active', v === 'board');
  playChime('click');
  renderAll();
}

function updateNextCourseHint(todayIdx, weekCourses) {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const todayList = weekCourses.filter(c => c.day === todayIdx).sort((a, b) => a.start - b.start);
  const next = todayList.find(c => {
    const [hh, mm] = (appState.periodStarts[c.start - 1] || '08:00').split(':').map(Number);
    return hh * 60 + mm > nowMins;
  });
  const hint = document.getElementById('nextCourseHint');
  if (next) {
    const tStr = appState.periodStarts[next.start - 1];
    hint.textContent = `下节课：${next.name}（${tStr}${next.room ? ' · ' + next.room : ''}）`;
  } else {
    hint.textContent = '今日课程已全部结束 · 点击任意地块可查看轻小说手记';
  }
}

function renderAll() {
  const todayIdx = getTodayIdx();
  document.getElementById('hudDate').textContent = `第 ${appState.week} 周 · ${DAYS[todayIdx - 1]}`;
  document.getElementById('hudGold').textContent = String(appState.gold).padStart(6, '0');
  document.getElementById('hotWeekNum').textContent = `W${appState.week}`;

  const weekCourses = appState.courses.filter(c => isCourseInWeek(c.weeks, appState.week));
  const done = weekCourses.filter(c => appState.harvested[`${appState.week}_${c.id}`]).length;
  const pct = weekCourses.length ? Math.round((done / weekCourses.length) * 100) : 0;
  document.getElementById('farmProgress').style.width = pct + '%';
  document.getElementById('farmCount').textContent = `${done}/${weekCourses.length}`;

  updateNextCourseHint(todayIdx, weekCourses);
  renderFarmGrid(todayIdx, weekCourses);
  renderQuestBoard(todayIdx, weekCourses);
  renderDdlBoard();
}

function renderFarmGrid(todayIdx, weekCourses) {
  const grid = document.getElementById('farmGrid');
  grid.innerHTML = '';

  const corner = document.createElement('div');
  corner.className = 'day-sign'; corner.textContent = '节';
  grid.appendChild(corner);

  DAYS.forEach((d, i) => {
    const h = document.createElement('div');
    h.className = 'day-sign' + (i + 1 === todayIdx ? ' today' : '');
    h.textContent = d + (i + 1 === todayIdx ? '★' : '');
    grid.appendChild(h);
  });

  const occupied = new Set();
  for (let p = 1; p <= 12; p++) {
    const tCol = document.createElement('div');
    tCol.className = 'stone-time';
    tCol.style.gridColumn = '1'; tCol.style.gridRow = String(p + 1);
    tCol.innerHTML = `${p}<small>${appState.periodStarts[p - 1] || ''}</small>`;
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
            <span class="plot-soil-strip">${appState.periodStarts[course.start - 1] || ''}</span>
            <span class="plot-crop-svg">${isDone ? SPRITES[course.crop || 'parsnip'] : SPRITES.sprout}</span>
          </div>
        `;
        el.onclick = () => { playChime('click'); openNovelModal(course.id); };
        grid.appendChild(el);
      } else {
        const soil = document.createElement('div');
        soil.className = 'soil-patch' + (d === todayIdx ? ' today-col' : '');
        soil.style.gridColumn = String(d + 1); soil.style.gridRow = String(p + 1);
        soil.onclick = () => { playChime('click'); openCourseModal(null, d, p); };
        grid.appendChild(soil);
      }
    }
  }
}

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
    qGrid.innerHTML = `<div class="empty-board" style="grid-column:1/-1;">今天没有安排课程！去鹈鹕镇休息，或点底部「加课」播种新安排。</div>`;
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
        <span class="quest-time">第${c.start}-${c.end}节 · ${appState.periodStarts[c.start - 1] || ''}</span>
      </div>
      <div class="quest-body">
        <div><b>地点：</b>${escapeHtml(c.room || '未填写')} &nbsp;|&nbsp; <b>教师：</b>${escapeHtml(c.teacher || '未填写')}</div>
        <div style="margin-top:6px;"><b>手记：</b>${escapeHtml((c.note || '暂无笔记，点右下角翻开轻小说手记...').slice(0, 48))}</div>
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

/* Homework / Exam DDL Quests */
function renderDdlBoard() {
  const wrap = document.getElementById('ddlGrid');
  wrap.innerHTML = '';
  if (!appState.ddls.length) {
    wrap.innerHTML = `<div class="empty-board" style="grid-column:1/-1;padding:18px;">暂无作业或考试 DDL，右上角一行即可贴上木板！</div>`;
    return;
  }
  appState.ddls.forEach(d => {
    const daysLeft = d.date ? Math.ceil((new Date(d.date + 'T23:59:59') - Date.now()) / 86400000) : null;
    const badge = daysLeft === null ? '无日期' : (daysLeft < 0 ? '已截止' : (daysLeft === 0 ? '今天截止!' : `剩 ${daysLeft} 天`));
    const card = document.createElement('div');
    card.className = 'quest-note';
    card.style.opacity = d.done ? '0.68' : '1';
    card.innerHTML = `
      <div class="thumbtack" style="background:${d.done ? '#16a34a' : '#dc2626'};"></div>
      <div class="quest-head">
        <h3 style="${d.done ? 'text-decoration:line-through;' : ''}">${escapeHtml(d.title)}</h3>
        <span class="quest-time">${badge}</span>
      </div>
      <div class="quest-foot">
        <button class="px-btn ${d.done ? '' : 'green'}" onclick="toggleDdl('${d.id}', event)">${d.done ? '已完成 (+100G)' : '交付悬赏 (+100G)'}</button>
        <button class="px-btn" style="color:#b91c1c;" onclick="deleteDdl('${d.id}')">撕掉</button>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function addDdlQuest() {
  const title = document.getElementById('ddlTitle').value.trim();
  const date = document.getElementById('ddlDate').value;
  if (!title) return showToast('请输入作业或考试名称');
  appState.ddls.unshift({ id: 'd_' + Date.now(), title, date, done: false });
  document.getElementById('ddlTitle').value = '';
  saveState(); renderDdlBoard(); playChime('click'); showToast('已贴上悬赏木板！');
}

function toggleDdl(id, ev) {
  const item = appState.ddls.find(x => x.id === id);
  if (!item) return;
  item.done = !item.done;
  if (item.done) { appState.gold += 100; playChime('coin'); spawnFloatGold(ev?.clientX, ev?.clientY, '+100G'); }
  else { appState.gold = Math.max(0, appState.gold - 100); }
  saveState(); renderAll();
}

function deleteDdl(id) {
  appState.ddls = appState.ddls.filter(x => x.id !== id);
  saveState(); renderDdlBoard();
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
  saveState(); renderAll();
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
    <div><b>时间：</b>${DAYS[c.day - 1]} 第 ${c.start}-${c.end} 节（${appState.periodStarts[c.start - 1] || ''} 起）</div>
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
function harvestCurrentCourse(ev) { if (!activeCourseId) return; toggleHarvestDirect(activeCourseId, ev); openNovelModal(activeCourseId); }
function editCurrentCourse() { closeModal('novelModal'); openCourseModal(activeCourseId); }
function deleteCurrentCourse() {
  if (!activeCourseId) return;
  appState.courses = appState.courses.filter(c => c.id !== activeCourseId);
  saveState(); closeModal('novelModal'); renderAll(); showToast('已铲除该地块课程');
}

/* Add / Edit Course */
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
    name, room: document.getElementById('fRoom').value.trim(),
    day: parseInt(document.getElementById('fDay').value, 10), start, end,
    teacher: document.getElementById('fTeacher').value.trim(),
    weeks: document.getElementById('fWeeks').value.trim() || '1-16',
    crop: document.getElementById('fCrop').value,
    color: document.getElementById('fColor').value,
    note: editingCourseId ? (appState.courses.find(x => x.id === editingCourseId)?.note || '') : ''
  };
  if (editingCourseId) {
    const idx = appState.courses.findIndex(x => x.id === editingCourseId);
    if (idx >= 0) appState.courses[idx] = payload;
  } else { appState.courses.push(payload); }
  saveState(); closeModal('courseModal'); renderAll(); playChime('coin'); showToast('已播种到农田！');
}

/* Settings Modal */
function openSettingsModal() {
  document.getElementById('setStartDate').value = appState.startDate || '';
  document.getElementById('setSfx').value = appState.sfx ? 'on' : 'off';
  document.getElementById('setPeriodStarts').value = appState.periodStarts.join(',');
  document.getElementById('settingsModal').classList.add('open');
}

function saveSettings() {
  appState.startDate = document.getElementById('setStartDate').value;
  if (appState.startDate) appState.week = computeCurrentWeek(appState.startDate);
  appState.sfx = document.getElementById('setSfx').value === 'on';
  const parts = document.getElementById('setPeriodStarts').value.split(/[,，\s]+/).map(s => s.trim()).filter(Boolean);
  if (parts.length === 12) appState.periodStarts = parts;
  saveState(); closeModal('settingsModal'); renderAll(); showToast('设置已保存！');
}

/* ================= 4-IN-1 IMPORT ENGINE ================= */
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

function parseLinesToCourses(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
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
  return parsed;
}

function importFromPlainText() {
  mergeImportedCourses(parseLinesToCourses(document.getElementById('plainTextInput').value));
}

async function importFromPdf(input) {
  const file = input.files[0];
  if (!file) return;
  const st = document.getElementById('pdfStatus');
  st.textContent = '正在加载 PDF 解析引擎...';
  try {
    if (!window.pdfjsLib) {
      await new Promise((res, rej) => {
        const sc = document.createElement('script');
        sc.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
        sc.onload = res; sc.onerror = rej; document.head.appendChild(sc);
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    }
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map(it => it.str).join(' ') + '\n';
    }
    const parsed = parseLinesToCourses(fullText);
    if (parsed.length) {
      mergeImportedCourses(parsed);
    } else {
      st.textContent = '该 PDF 为复杂表格排版，已自动把提取内容填入「文本秒解析」框（或推荐直接截图用「AI 截图导入」1 秒识别）！';
      document.getElementById('plainTextInput').value = fullText.slice(0, 2000);
    }
  } catch (e) {
    st.textContent = 'PDF 解析失败：' + e.message + '（推荐直接用「AI 截图导入」）';
  }
  input.value = '';
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
  a.href = URL.createObjectURL(blob); a.download = 'stardew-schedule-backup.json'; a.click();
  showToast('已导出 JSON 备份');
}

function resetDemoData() {
  appState.courses = structuredClone(DEFAULT_COURSES);
  appState.harvested = { '1_c1': true, '1_c3': true };
  saveState(); closeModal('importModal'); renderAll(); showToast('已恢复示例农田');
}

function changeWeek(delta) { appState.week = Math.max(1, Math.min(20, appState.week + delta)); saveState(); renderAll(); playChime('click'); }
function jumpToCurrentWeek() { appState.week = appState.startDate ? computeCurrentWeek(appState.startDate) : 1; saveState(); renderAll(); playChime('click'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

window.addEventListener('keydown', e => {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
  if (e.key === '1') switchView('farm');
  if (e.key === '2') switchView('board');
});

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
