/* StardewSchedule · 谷物课表 Core Engine */

const STORAGE_KEY = 'stardew_schedule_v1';

const PERIOD_TIMES = [
  ['08:00', '08:45'], ['08:55', '09:40'],
  ['10:00', '10:45'], ['10:55', '11:40'],
  ['14:00', '14:45'], ['14:55', '15:40'],
  ['16:00', '16:45'], ['16:55', '17:40'],
  ['19:00', '19:45'], ['19:55', '20:40'],
  ['20:50', '21:35'], ['21:40', '22:25']
];

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

/* Crisp 16x16 Pixel Art SVGs (Zero generic emojis) */
const CROP_SVGS = {
  parsnip: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#2e8b2e"/><rect x="5" y="2" width="2" height="2" fill="#49b549"/><rect x="9" y="2" width="2" height="2" fill="#49b549"/><rect x="5" y="4" width="6" height="5" fill="#f3c669"/><rect x="6" y="9" width="4" height="3" fill="#e0a23e"/><rect x="7" y="12" width="2" height="3" fill="#c78328"/><rect x="6" y="5" width="2" height="2" fill="#fff4cf"/></svg>`,
  strawberry: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="2" width="4" height="2" fill="#2e8b2e"/><rect x="4" y="4" width="8" height="5" fill="#d93838"/><rect x="5" y="9" width="6" height="3" fill="#c22929"/><rect x="6" y="12" width="4" height="2" fill="#a81d1d"/><rect x="6" y="6" width="1" height="1" fill="#ffd97d"/><rect x="9" y="7" width="1" height="1" fill="#ffd97d"/><rect x="7" y="10" width="1" height="1" fill="#ffd97d"/></svg>`,
  starfruit: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#f5c400"/><rect x="5" y="4" width="6" height="2" fill="#ffd83b"/><rect x="2" y="6" width="12" height="3" fill="#ffd83b"/><rect x="4" y="9" width="8" height="3" fill="#f0b000"/><rect x="3" y="12" width="3" height="2" fill="#d99400"/><rect x="10" y="12" width="3" height="2" fill="#d99400"/><rect x="6" y="6" width="2" height="2" fill="#fff6bf"/></svg>`,
  pumpkin: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="3" fill="#3a7d2c"/><rect x="3" y="5" width="10" height="8" fill="#e67e22"/><rect x="5" y="4" width="6" height="10" fill="#f39c12"/><rect x="7" y="5" width="2" height="8" fill="#d35400"/></svg>`,
  crystal: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="2" fill="#7dd3fc"/><rect x="5" y="4" width="6" height="8" fill="#38bdf8"/><rect x="6" y="6" width="4" height="4" fill="#e0f2fe"/><rect x="7" y="12" width="2" height="2" fill="#0284c7"/></svg>`,
  coffee: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="4" width="8" height="9" fill="#6f4e37"/><rect x="5" y="3" width="6" height="11" fill="#8b5a2b"/><rect x="7" y="4" width="2" height="9" fill="#3e2723"/></svg>`
};

const DEFAULT_COURSES = [
  { id: 'c1', name: '高等数学 (上)', day: 1, start: 1, end: 2, room: '教三 201', teacher: '王教授', weeks: '1-16', crop: 'parsnip', color: '#f9d88b', note: '【第一周重点】极限与连续的定义，课后习题 P32 第 3、5 题周五前交。' },
  { id: 'c2', name: '人工智能导论', day: 1, start: 5, end: 6, room: '信息楼 405', teacher: '陈老师', weeks: '1-16', crop: 'starfruit', color: '#b5daf5', note: '期末大作业需要提交一个 AI Agent 或 CV 小项目，建议提前组队！' },
  { id: 'c3', name: '大学英语听说', day: 2, start: 3, end: 4, room: '外语楼 302', teacher: '林老师', weeks: '1-16', crop: 'strawberry', color: '#f5b8b8', note: '下周二课堂 3 分钟 Presentation，主题自选。' },
  { id: 'c4', name: 'Python 程序设计', day: 3, start: 1, end: 2, room: '实验机房 A202', teacher: '张老师', weeks: '1-16', crop: 'crystal', color: '#d8c0f5', note: '带好 U 盘，本次实验课写爬虫与数据清洗脚本。' },
  { id: 'c5', name: '国际贸易实务', day: 4, start: 3, end: 4, room: '经管楼 108', teacher: '周教授', weeks: '1-16', crop: 'pumpkin', color: '#f7c59f', note: '重点背诵 FOB / CIF / CFR 贸易术语风险划分界限。' },
  { id: 'c6', name: '数据结构与算法', day: 4, start: 7, end: 8, room: '教二 304', teacher: '刘老师', weeks: '1-16', crop: 'coffee', color: '#b8e3a8', note: '二叉树遍历手写代码必考。' },
  { id: 'c7', name: '开源软件工程实践', day: 5, start: 5, end: 6, room: '创新工坊 2F', teacher: '李老师', weeks: '1-14', crop: 'starfruit', color: '#b8e3a8', note: '学会 Git 分支管理、PR 规范与 README 编写。' }
];

let appState = loadState();
let activeCourseId = null;
let editingCourseId = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    week: 1,
    season: 'spring',
    theme: 'stardew',
    gold: 150,
    sfx: true,
    harvested: {}, // key: `${week}_${courseId}`
    courses: structuredClone(DEFAULT_COURSES)
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

/* 8-bit Web Audio Chiptune SFX */
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

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

/* Parse Week String like "1-16", "1-16单", "2-14双", "1,3,5-8" */
function isCourseInWeek(weekStr, targetWeek) {
  if (!weekStr) return true;
  const s = String(weekStr).replace(/周/g, '').trim();
  const oddOnly = s.includes('单');
  const evenOnly = s.includes('双');
  if (oddOnly && targetWeek % 2 === 0) return false;
  if (evenOnly && targetWeek % 2 !== 0) return false;
  const clean = s.replace(/[单双()（）]/g, '');
  const parts = clean.split(/[,，]/);
  for (const p of parts) {
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

/* Render Entire App */
function renderAll() {
  document.body.dataset.season = appState.season;
  document.body.dataset.theme = appState.theme;
  document.getElementById('seasonSelect').value = appState.season;
  document.getElementById('themeSelect').value = appState.theme;
  document.getElementById('weekSelect').value = appState.week;
  document.getElementById('hudGold').textContent = appState.gold;
  document.getElementById('sfxBtn').textContent = appState.sfx ? '🔊 音效: 开' : '🔇 音效: 关';

  const seasonCrop = { spring: 'parsnip', summer: 'starfruit', fall: 'pumpkin', winter: 'crystal' }[appState.season];
  document.getElementById('hudSeasonIcon').innerHTML = `<span style="display:inline-block;width:18px;height:18px;vertical-align:middle;">${CROP_SVGS[seasonCrop]}</span>`;

  const todayJs = new Date().getDay();
  const todayIdx = todayJs === 0 ? 7 : todayJs;
  document.getElementById('hudDate').textContent = `第 ${appState.week} 周 · ${DAYS[todayIdx - 1]}`;

  renderGrid(todayIdx);
  renderFarmProgress();
}

function renderGrid(todayIdx) {
  const grid = document.getElementById('scheduleGrid');
  grid.innerHTML = '';

  // Header row
  const corner = document.createElement('div');
  corner.className = 'grid-head';
  corner.textContent = '节次';
  grid.appendChild(corner);

  DAYS.forEach((d, idx) => {
    const h = document.createElement('div');
    h.className = 'grid-head' + (idx + 1 === todayIdx ? ' today' : '');
    h.textContent = d + (idx + 1 === todayIdx ? ' ★' : '');
    grid.appendChild(h);
  });

  // Track occupied cells
  const weekCourses = appState.courses.filter(c => isCourseInWeek(c.weeks, appState.week));
  const occupied = new Set();

  for (let p = 1; p <= 12; p++) {
    const tCol = document.createElement('div');
    tCol.className = 'time-col';
    tCol.style.gridColumn = '1';
    tCol.style.gridRow = String(p + 1);
    tCol.innerHTML = `${p}<small>${PERIOD_TIMES[p - 1][0]}</small>`;
    grid.appendChild(tCol);

    for (let d = 1; d <= 7; d++) {
      const cellKey = `${d}_${p}`;
      if (occupied.has(cellKey)) continue;

      const course = weekCourses.find(c => c.day === d && c.start === p);
      if (course) {
        const span = Math.max(1, course.end - course.start + 1);
        for (let k = course.start; k <= course.end; k++) occupied.add(`${d}_${k}`);

        const card = document.createElement('div');
        const hKey = `${appState.week}_${course.id}`;
        const isHarvested = !!appState.harvested[hKey];
        card.className = 'course-card' + (isHarvested ? ' harvested' : '');
        card.style.gridColumn = String(d + 1);
        card.style.gridRow = `${p + 1} / span ${span}`;
        card.style.background = course.color || '#f9d88b';
        card.innerHTML = `
          <div>
            <div class="course-name">${escapeHtml(course.name)}</div>
            <div class="course-meta">
              ${course.room ? '@' + escapeHtml(course.room) + '<br/>' : ''}
              ${course.teacher ? escapeHtml(course.teacher) : ''}
            </div>
          </div>
          <div class="course-crop">${CROP_SVGS[course.crop || 'parsnip']}</div>
        `;
        card.onclick = () => { playChime('click'); openNovelModal(course.id); };
        grid.appendChild(card);
      } else {
        const slot = document.createElement('div');
        slot.className = 'cell-slot';
        slot.style.gridColumn = String(d + 1);
        slot.style.gridRow = String(p + 1);
        slot.title = `点击在 ${DAYS[d - 1]} 第 ${p} 节添加课程`;
        slot.onclick = () => { playChime('click'); openCourseModal(null, d, p); };
        grid.appendChild(slot);
      }
    }
  }
}

function renderFarmProgress() {
  const weekCourses = appState.courses.filter(c => isCourseInWeek(c.weeks, appState.week));
  const total = weekCourses.length;
  const done = weekCourses.filter(c => appState.harvested[`${appState.week}_${c.id}`]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('farmProgress').style.width = pct + '%';
  document.getElementById('farmCount').textContent = `${done} / ${total} 节`;

  let stage = '🌱 播种期（点开课程「打卡收获」赚 +50G）';
  let cropKey = 'parsnip';
  if (pct >= 100 && total > 0) { stage = '🌟 大丰收！本周课程全部通关！'; cropKey = 'starfruit'; }
  else if (pct >= 60) { stage = '🍓 结果期！距离本周丰收只差一点！'; cropKey = 'strawberry'; }
  else if (pct >= 25) { stage = '🌿 成长中！坚持上课就能收获金币！'; cropKey = 'parsnip'; }

  document.getElementById('farmStageText').textContent = stage;
  document.getElementById('farmStageIcon').innerHTML = `<span style="display:inline-block;width:24px;height:24px;">${CROP_SVGS[cropKey]}</span>`;
}

/* Light Novel Library Course Reader */
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
  noteEl.oninput = () => {
    c.note = noteEl.value;
    saveState();
  };

  const hKey = `${appState.week}_${c.id}`;
  const btn = document.getElementById('nvHarvestBtn');
  if (appState.harvested[hKey]) {
    btn.textContent = '✅ 本周已收获 (+50G)';
  } else {
    btn.textContent = '🌾 上完打卡 (+50G)';
  }
  document.getElementById('novelModal').classList.add('open');
}

function setNovelFont(px) {
  document.getElementById('nvNote').style.fontSize = px + 'px';
}

function harvestCurrentCourse() {
  if (!activeCourseId) return;
  const hKey = `${appState.week}_${activeCourseId}`;
  if (appState.harvested[hKey]) {
    delete appState.harvested[hKey];
    appState.gold = Math.max(0, appState.gold - 50);
    showToast('已取消本周打卡 (-50G)');
  } else {
    appState.harvested[hKey] = true;
    appState.gold += 50;
    playChime('coin');
    showToast('🌾 收获成功！金币 +50G');
  }
  saveState();
  renderAll();
  openNovelModal(activeCourseId);
}

function editCurrentCourse() {
  closeModal('novelModal');
  openCourseModal(activeCourseId);
}

function deleteCurrentCourse() {
  if (!activeCourseId) return;
  appState.courses = appState.courses.filter(c => c.id !== activeCourseId);
  saveState();
  closeModal('novelModal');
  renderAll();
  showToast('已删除该课程');
}

/* Add / Edit Course Modal */
function openCourseModal(courseId = null, defaultDay = 1, defaultStart = 1) {
  editingCourseId = courseId;
  const c = courseId ? appState.courses.find(x => x.id === courseId) : null;
  document.getElementById('courseModalTitle').textContent = c ? '✏️ 编辑课程' : '＋ 添加新课程';
  document.getElementById('fName').value = c ? c.name : '';
  document.getElementById('fRoom').value = c ? c.room : '';
  document.getElementById('fDay').value = c ? c.day : defaultDay;
  document.getElementById('fStart').value = c ? c.start : defaultStart;
  document.getElementById('fEnd').value = c ? c.end : Math.min(12, defaultStart + 1);
  document.getElementById('fTeacher').value = c ? c.teacher : '';
  document.getElementById('fWeeks').value = c ? c.weeks : '1-16';
  document.getElementById('fCrop').value = c ? (c.crop || 'parsnip') : 'parsnip';
  document.getElementById('fColor').value = c ? (c.color || '#f9d88b') : '#f9d88b';
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
  saveState();
  closeModal('courseModal');
  renderAll();
  playChime('coin');
  showToast('课程已保存！');
}

/* ================= 3-IN-1 IMPORT ENGINE ================= */
function openImportModal() {
  document.getElementById('importModal').classList.add('open');
}

function switchImportTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.imp-pane').forEach(p => p.style.display = 'none');
  btn.classList.add('active');
  document.getElementById('imp-' + tab).style.display = 'block';
}

function copyAiPrompt() {
  navigator.clipboard.writeText(document.getElementById('aiPromptText').textContent);
  showToast('📋 已复制 AI 识图提示词！去发给豆包/DeepSeek 吧');
}

const AUTO_COLORS = ['#f9d88b', '#b8e3a8', '#f5b8b8', '#b5daf5', '#d8c0f5', '#f7c59f'];
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
  saveState();
  closeModal('importModal');
  renderAll();
  playChime('coin');
  showToast(`🎉 成功导入 ${appState.courses.length} 门课程！`);
}

function importFromJsonText() {
  try {
    let raw = document.getElementById('aiJsonInput').value.trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) raw = match[0];
    const arr = JSON.parse(raw);
    mergeImportedCourses(arr);
  } catch (e) {
    showToast('JSON 格式有误，请确认完整复制了 AI 回复的 [...] 内容');
  }
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
      name: tokens[0] || '课程',
      room: tokens[1] || '',
      teacher: tokens[2] || '',
      day: dayMap[dm[1]],
      start: parseInt(pm[1], 10),
      end: parseInt(pm[2], 10),
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
      try {
        const data = JSON.parse(text);
        mergeImportedCourses(Array.isArray(data) ? data : data.courses);
      } catch (e) { showToast('JSON 文件解析失败'); }
    } else if (file.name.endsWith('.ics')) {
      const events = text.split('BEGIN:VEVENT').slice(1);
      const list = [];
      const seen = new Set();
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
  showToast('💾 已导出 JSON 课表备份');
}

function resetDemoData() {
  appState.courses = structuredClone(DEFAULT_COURSES);
  appState.harvested = {};
  saveState();
  closeModal('importModal');
  renderAll();
  showToast('已恢复星露谷示例课表');
}

/* Controls */
function changeWeek(delta) {
  appState.week = Math.max(1, Math.min(20, appState.week + delta));
  saveState(); renderAll(); playChime('click');
}
function setWeek(w) { appState.week = w; saveState(); renderAll(); }
function setSeason(s) { appState.season = s; saveState(); renderAll(); playChime('click'); }
function setTheme(t) { appState.theme = t; saveState(); renderAll(); playChime('click'); }
function toggleSfx() { appState.sfx = !appState.sfx; saveState(); renderAll(); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

/* Floating Seasonal Pixel Particles (Petals / Fireflies / Maple Leaves / Snow) */
(function initParticles() {
  const cv = document.getElementById('seasonCanvas');
  const ctx = cv.getContext('2d');
  let W, H;
  function resize() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  const pts = Array.from({ length: 28 }, () => ({
    x: Math.random() * 1400, y: Math.random() * 900,
    vx: (Math.random() - 0.3) * 0.7, vy: 0.4 + Math.random() * 0.8,
    sz: 4 + Math.floor(Math.random() * 4)
  }));

  function tick() {
    ctx.clearRect(0, 0, W, H);
    const colors = { spring: '#ffb7c5', summer: '#fff59d', fall: '#e65100', winter: '#ffffff' };
    ctx.fillStyle = appState.theme === 'night' ? '#93c5fd' : (colors[appState.season] || '#ffb7c5');
    ctx.globalAlpha = 0.65;
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y > H) { p.y = -10; p.x = Math.random() * W; }
      if (p.x > W) p.x = 0; if (p.x < 0) p.x = W;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.sz, p.sz);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* Init */
(function boot() {
  const ws = document.getElementById('weekSelect');
  for (let i = 1; i <= 20; i++) {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = `第 ${i} 周`;
    ws.appendChild(opt);
  }
  function updateClock() {
    const now = new Date();
    document.getElementById('hudClock').textContent =
      String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }
  updateClock();
  setInterval(updateClock, 15000);
  renderAll();
})();
