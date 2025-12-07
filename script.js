// --- 1. CORE DATA ---
const EVIDENCE = [
    { id: 'emf', label: 'EMF 5', icon: '📶', desc: "Must hit Level 5 (Red)." },
    { id: 'box', label: 'Box', icon: '📻', desc: "Talk in dark." },
    { id: 'uv', label: 'UV', icon: '🖐️', desc: "Green handprints." },
    { id: 'orb', label: 'Orbs', icon: '✨', desc: "Floating dots in NV." },
    { id: 'writing', label: 'Writing', icon: '📖', desc: "Ghost writes in book." },
    { id: 'freezing', label: 'Freeze', icon: '❄️', desc: "Below 0C." },
    { id: 'dots', label: 'D.O.T.S', icon: '🟢', desc: "Green silhouette." }
];

const FILTERS = [
    { id: 'fast', label: '🏃 Fast Speed' },
    { id: 'early', label: '⚠️ Early Hunter' },
    { id: 'quiet', label: '🤫 Quiet Steps' },
    { id: 'guarantee', label: '✨ Guaranteed Ev' }
];

const GHOSTS = [
    { 
        name: "Spirit", ev: ['emf','box','writing'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Weakness: Smudge"],
        desc: "The default ghost. Identified by ruling others out.",
        ability: "None.",
        test: "Smudge the room. Cannot hunt for <span class='hl-green'>180s</span> (3 mins). Others hunt after 90s.",
        zeroEv: "Only identifiable by the 180s Smudge timer test.",
        tags: []
    },
    { 
        name: "Wraith", ev: ['emf','box','dots'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Teleports", "No Footprints"],
        desc: "Floats. Teleports to players. Hates salt.",
        ability: "Teleports to within 3m of player (EMF 2/5).",
        test: "Salt Test: If it steps in salt but leaves <span class='hl-red'>NO UV footprints</span>, it is a Wraith.",
        zeroEv: "Random EMF spikes next to you. Stepping in salt with no footprints.",
        tags: ['guarantee', 'quiet']
    },
    { 
        name: "Phantom", ev: ['box','uv','dots'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Slow", forced: null,
        traits: ["Sanity Drain", "Invisible in Photos"],
        desc: "Drains sanity when looked at. Vanishes in photos.",
        ability: "Sanity drain (~0.5%/sec). Longer invisibility during hunts.",
        test: "Take a photo. If ghost vanishes instantly but photo counts as 'Ghost', it is a Phantom.",
        zeroEv: "Slow blinking during hunt. Disappearing in photos.",
        tags: ['vis']
    },
    { 
        name: "Poltergeist", ev: ['box','uv','writing'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Multi-Throw", "Sanity Drain"],
        desc: "Throws massive amounts of objects at once.",
        ability: "Multi-throw drains 2% sanity per item.",
        test: "Make a pile of items. If it explodes them all at once, it is a Poltergeist.",
        zeroEv: "Massive item throws. Rapid sanity drain.",
        tags: ['vis']
    },
    { 
        name: "Banshee", ev: ['uv','orb','dots'], danger: "Low", hunt: "Target", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Stalks Target", "Paramic Scream"],
        desc: "Stalks one specific player. Ignores others.",
        ability: "Selects a Target. Ignores non-targets during hunts.",
        test: "Use Parabolic Mic. If you hear a high-pitched scream, it is a Banshee.",
        zeroEv: "Ghost walking past players during a hunt. Unique scream.",
        tags: ['guarantee']
    },
    { 
        name: "Jinn", ev: ['emf','uv','freezing'], danger: "High", hunt: "50%", speed: "2.5 m/s", blink: "Normal", forced: null,
        traits: ["Fast (Breaker)", "Sanity Zap"],
        desc: "Territorial. Moves very fast if Fuse Box is ON.",
        ability: "Speeds up if seeing player from afar (Breaker ON). Drains 25% sanity if close.",
        test: "Turn Breaker OFF. If ghost loses super speed, it is a Jinn.",
        zeroEv: "Speed drop when breaker is cut. Sanity zap.",
        tags: ['fast']
    },
    { 
        name: "Mare", ev: ['box','orb','writing'], danger: "Med", hunt: "60%/40%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Hates Lights", "Dark Hunter"],
        desc: "Empowered by darkness. Weakened by light.",
        ability: "Hunts at 60% in dark, 40% in lights. Turns lights off immediately.",
        test: "Turn light ON. If it turns OFF instantly, suspect Mare. It cannot turn lights ON.",
        zeroEv: "Never turning lights on. Hunting early in dark.",
        tags: ['early']
    },
    { 
        name: "Revenant", ev: ['orb','writing','freezing'], danger: "High", hunt: "50%", speed: "3.0 m/s", blink: "Normal", forced: null,
        traits: ["Super Fast (LoS)", "Super Slow"],
        desc: "The speed demon. Slow when hidden, fast when chasing.",
        ability: "1.0 m/s scanning. 3.0 m/s chasing.",
        test: "Hide during hunt. Footsteps should be extremely slow.",
        zeroEv: "Distinct slow/fast switch during hunts.",
        tags: ['fast']
    },
    { 
        name: "Shade", ev: ['emf','writing','freezing'], danger: "Low", hunt: "35%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Shy", "Low Activity"],
        desc: "Shy ghost. Very low activity.",
        ability: "Cannot hunt if >1 person in room.",
        test: "Sit in ghost room at 0% sanity. If it refuses to hunt, it is a Shade.",
        zeroEv: "Extreme passivity. Ghost events are often just 'shadow' form.",
        tags: ['quiet']
    },
    { 
        name: "Demon", ev: ['uv','writing','freezing'], danger: "High", hunt: "70%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Aggressive", "20s Cooldown"],
        desc: "Aggressive. Frequent hunts.",
        ability: "20s hunt cooldown. Rare ability to hunt at 100% sanity.",
        test: "Smudge test: If it hunts 60-90s after smudge, it is a Demon.",
        zeroEv: "Frequent, early hunts.",
        tags: ['early']
    },
    { 
        name: "Yurei", ev: ['orb','freezing','dots'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Door Slams", "Sanity Drain"],
        desc: "Drains sanity by interacting with doors.",
        ability: "Slams door shut to drain 15% sanity.",
        test: "Smudge test: Smudge traps it in room for 90s.",
        zeroEv: "Full door slams.",
        tags: []
    },
    { 
        name: "Oni", ev: ['emf','freezing','dots'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Solid", forced: null,
        traits: ["Visible", "Active"],
        desc: "Very active. Visible longer during hunts.",
        ability: "Cannot do 'Airball' event. Drains double sanity on events.",
        test: "If you get the 'Airball' mist event, it is NOT an Oni.",
        zeroEv: "Highly visible during hunts. Frequent physical events.",
        tags: ['vis']
    },
    { 
        name: "Yokai", ev: ['box','orb','dots'], danger: "Med", hunt: "80%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Hates Voices", "Deaf"],
        desc: "Attracted to voices. Deaf during hunts.",
        ability: "Talking triggers hunt at 80%. Hearing range 2.5m.",
        test: "Hide and yell during hunt. If it ignores you, it is a Yokai.",
        zeroEv: "Early hunt caused by talking. Unresponsive to voice during hunt.",
        tags: ['early']
    },
    { 
        name: "Hantu", ev: ['freezing','orb','uv'], danger: "Med", hunt: "50%", speed: "Variable", blink: "Normal", forced: "freezing",
        traits: ["Cold Speed", "Breath"],
        desc: "Fast in cold. Slow in warm.",
        ability: "Speed scales with temp. Cannot turn breaker ON.",
        test: "Turn breaker OFF. Look for frosty breath on ghost during hunt.",
        zeroEv: "Fast in cold rooms, slow in warm rooms. Frosty breath.",
        tags: ['fast']
    },
    { 
        name: "Goryo", ev: ['emf','uv','dots'], danger: "Low", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: "dots",
        traits: ["Camera DOTS", "Static"],
        desc: "Only shows DOTS on camera. Does not roam.",
        ability: "DOTS only visible on Video Camera when no one is in room.",
        test: "If you see DOTS with naked eye, it is NOT a Goryo.",
        zeroEv: "Very hard to identify without DOTS.",
        tags: ['guarantee']
    },
    { 
        name: "Myling", ev: ['emf','writing','uv'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Silent Steps", "Vocal"],
        desc: "Vocal ghost with silent footsteps.",
        ability: "Footsteps silent until very close (12m).",
        test: "Hide flashlight. If you hear vocals before footsteps, it is a Myling.",
        zeroEv: "Silent footsteps during hunt.",
        tags: ['quiet']
    },
    { 
        name: "Onryo", ev: ['box','orb','freezing'], danger: "Med", hunt: "60%", speed: "1.7 m/s", blink: "Normal", forced: null,
        traits: ["Fears Fire", "Candle Hunter"],
        desc: "Fears fire. Candles prevent hunts.",
        ability: "Blowing 3 candles triggers hunt.",
        test: "Light candle. If it blows candle then hunts instantly, it is an Onryo.",
        zeroEv: "Hunts immediately after candle blowout.",
        tags: ['early']
    },
    { 
        name: "The Twins", ev: ['emf','box','freezing'], danger: "Med", hunt: "50%", speed: "1.5 / 1.9", blink: "Normal", forced: null,
        traits: ["Twin Speed", "Decoy"],
        desc: "Two entities. Mimics interactions.",
        ability: "Main ghost (1.5m/s). Decoy ghost (1.9m/s).",
        test: "Listen to hunt speeds. Fast hunt then slow hunt? Twins.",
        zeroEv: "Alternating hunt speeds.",
        tags: ['fast']
    },
    { 
        name: "Raiju", ev: ['emf','orb','dots'], danger: "High", hunt: "65%", speed: "2.5 m/s", blink: "Normal", forced: null,
        traits: ["Elec Power", "Disruptor"],
        desc: "Powered by electronics.",
        ability: "Moves fast near active electronics. Disrupts from far away.",
        test: "Place gear on floor. If it zooms past it, it is a Raiju.",
        zeroEv: "Fast speed near equipment. Large disruption range.",
        tags: ['fast', 'early']
    },
    { 
        name: "Obake", ev: ['emf','orb','uv'], danger: "Med", hunt: "50%", speed: "1.7 m/s", blink: "Shifting", forced: "uv",
        traits: ["Shapeshift", "6-Finger"],
        desc: "Shapeshifter. Tricky fingerprints.",
        ability: "Can leave 6-finger handprints. Changes model during hunt.",
        test: "Find a 6-finger handprint. 100% confirmation.",
        zeroEv: "Changing model during hunt.",
        tags: ['guarantee']
    },
    { 
        name: "The Mimic", ev: ['box','freezing','uv'], danger: "Low", hunt: "Var", speed: "Var", blink: "Variable", forced: "orb",
        traits: ["Copycat", "Fake Orbs"],
        desc: "Copycat. Always has Orbs.",
        ability: "Copies traits of other ghosts. Always has Orbs as 4th evidence.",
        test: "If you have 3 evidences + Orbs, it is a Mimic.",
        zeroEv: "Inconsistent behavior.",
        tags: ['guarantee']
    },
    { 
        name: "Moroi", ev: ['box','writing','freezing'], danger: "High", hunt: "50%", speed: "Variable", blink: "Normal", forced: "box",
        traits: ["Curse", "Sanity Speed"],
        desc: "Curses victims. Fast at low sanity.",
        ability: "Speed increases as sanity drops. Smudge blinds for 12s.",
        test: "Take pills. If ghost slows down, it is a Moroi.",
        zeroEv: "Gets faster as game progresses. Long smudge blind.",
        tags: ['fast']
    },
    { 
        name: "Deogen", ev: ['box','writing','dots'], danger: "High", hunt: "40%", speed: "3.0 m/s", blink: "Normal", forced: "box",
        traits: ["Wallhack", "Slow Close"],
        desc: "Always knows where you are. Slow close up.",
        ability: "You CANNOT hide. Fast when far, super slow when close.",
        test: "Do not hide. Loop it. If it slows to a crawl near you, it is a Deogen.",
        zeroEv: "Finding you in hiding spots.",
        tags: ['fast', 'guarantee']
    },
    { 
        name: "Thaye", ev: ['orb','writing','dots'], danger: "High", hunt: "75%", speed: "2.75 m/s", blink: "Normal", forced: null,
        traits: ["Ages", "Fast Start"],
        desc: "Ages over time. Fast early, slow late.",
        ability: "Starts fast/active. Becomes slow/passive over time.",
        test: "Was it fast early game and slow late game? Thaye.",
        zeroEv: "Extreme activity early game, dead quiet late game.",
        tags: ['fast', 'early']
    }
];

// --- 2. STATE ---
let app = {
    evidence: { emf:0, box:0, uv:0, orb:0, writing:0, freezing:0, dots:0 },
    activeFilters: new Set(),
    timer: { int: null, dur: 90 }
};

const ui = {
    evBar: document.getElementById('evBar'),
    filterRow: document.getElementById('filterRow'),
    ghostGrid: document.getElementById('ghostGrid'),
    count: document.getElementById('matchCount'),
    ghostModal: document.getElementById('ghostModal'),
    manualModal: document.getElementById('manualModal'),
    timerDisplay: document.getElementById('timerDisplay'),
    timerFill: document.getElementById('timerFill'),
    timerBtn: document.getElementById('timerBtn')
};

// --- 3. INIT ---
function init() {
    renderEvidence();
    renderFilters();
    updateBoard();

    document.getElementById('btnReset').addEventListener('click', () => {
        Object.keys(app.evidence).forEach(k => app.evidence[k] = 0);
        app.activeFilters.clear();
        renderFilters();
        updateBoard();
    });

    document.getElementById('btnManual').addEventListener('click', () => {
        showManualTab('ev', document.querySelector('.manual-nav .nav-btn'));
        ui.manualModal.showModal();
    });

    document.getElementById('closeGhost').addEventListener('click', () => ui.ghostModal.close());
    document.getElementById('closeManual').addEventListener('click', () => ui.manualModal.close());

    document.querySelectorAll('.t-opt').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.t-opt').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            app.timer.dur = parseInt(b.dataset.time);
            resetTimer();
        });
    });

    // Timer button
    ui.timerBtn.addEventListener('click', () => {
        if(app.timer.int) {
            clearInterval(app.timer.int);
            app.timer.int = null;
            ui.timerBtn.innerHTML = "▶";
            ui.timerBtn.classList.remove('active');
            return;
        }
        ui.timerBtn.innerHTML = "⏹";
        ui.timerBtn.classList.add('active');
        ui.timerFill.style.width = "0%";
        ui.timerFill.style.background = "var(--acc-cyan)";
        const start = Date.now();
        const end = start + (app.timer.dur * 1000);
        app.timer.int = setInterval(() => {
            const left = Math.ceil((end - Date.now())/1000);
            if(left <= 0) {
                ui.timerDisplay.textContent = "0";
                ui.timerFill.style.width = "100%";
                ui.timerFill.style.background = "var(--acc-red)";
                clearInterval(app.timer.int);
                app.timer.int = null;
                ui.timerBtn.innerHTML = "▶";
                ui.timerBtn.classList.remove('active');
            } else {
                ui.timerDisplay.textContent = left;
                ui.timerFill.style.width = (((app.timer.dur - left) / app.timer.dur)*100) + "%";
            }
        }, 100);
    });

    // WIP banner close + remember dismissal
    const banner = document.getElementById('wipBanner');
    const bannerClose = document.getElementById('wipClose');

    if (banner && bannerClose) {
        if (localStorage.getItem('phasmo_wip_dismissed') === '1') {
            banner.style.display = 'none';
        }

        bannerClose.addEventListener('click', () => {
            banner.style.display = 'none';
            localStorage.setItem('phasmo_wip_dismissed', '1');
        });
    }

    // Initial manual content
    document.getElementById('manualContent').innerHTML = MANUAL_DB.ev;
}

// --- 4. RENDERING ---
function renderEvidence() {
    ui.evBar.innerHTML = '';
    EVIDENCE.forEach(ev => {
        const btn = document.createElement('div');
        btn.className = 'ev-btn';
        btn.dataset.id = ev.id;
        btn.innerHTML = `<div class="ev-icon">${ev.icon}</div><div class="ev-label">${ev.label}</div>`;
        btn.addEventListener('click', (e) => toggleEv(ev.id, 1, e));
        btn.addEventListener('contextmenu', (e) => toggleEv(ev.id, 2, e));
        ui.evBar.appendChild(btn);
    });
}

function renderFilters() {
    ui.filterRow.innerHTML = '';
    FILTERS.forEach(f => {
        const chip = document.createElement('div');
        chip.className = `filter-chip ${app.activeFilters.has(f.id) ? 'active' : ''}`;
        chip.textContent = f.label;
        chip.addEventListener('click', () => {
            if(app.activeFilters.has(f.id)) app.activeFilters.delete(f.id);
            else app.activeFilters.add(f.id);
            renderFilters();
            updateBoard();
        });
        ui.filterRow.appendChild(chip);
    });
}

// --- 5. LOGIC ---
function toggleEv(id, val, e) {
    e.preventDefault();
    app.evidence[id] = (app.evidence[id] === val) ? 0 : val;
    updateBoard();
}

function updateBoard() {
    const matches = [];
    const possibleEv = new Set();

    GHOSTS.forEach(g => {
        let possible = true;
        for(const [id, val] of Object.entries(app.evidence)) {
            if(val === 0) continue;
            const has = g.ev.includes(id) || (g.name === 'The Mimic' && id === 'orb');
            if(val === 1 && !has) possible = false;
            if(val === 2 && has) possible = false;
        }
        if(possible && app.activeFilters.size > 0) {
            app.activeFilters.forEach(fid => {
                if(!g.tags.includes(fid)) possible = false;
            });
        }

        if(possible) {
            matches.push(g);
            g.ev.forEach(e => possibleEv.add(e));
            if(g.name === 'The Mimic') possibleEv.add('orb');
        }
    });

    ui.count.textContent = matches.length;

    document.querySelectorAll('.ev-btn').forEach(btn => {
        const id = btn.dataset.id;
        btn.dataset.state = app.evidence[id];
        if(app.evidence[id] === 0 && matches.length < GHOSTS.length && !possibleEv.has(id)) {
            btn.classList.add('dimmed');
        } else {
            btn.classList.remove('dimmed');
        }
    });

    ui.ghostGrid.innerHTML = '';
    matches.forEach(g => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.danger = g.danger;

        let dots = '';
        EVIDENCE.forEach(e => {
            let cls = 'ev-tag';
            if(app.evidence[e.id] === 1) cls += ' match';
            if(g.forced === e.id) cls += ' forced';
            
            if(g.ev.includes(e.id)) {
                let label = e.id === 'writing' ? 'BOOK' : 
                            e.id === 'freezing' ? 'FRZ' : 
                            e.id === 'box' ? 'BOX' : 
                            e.label.replace('EMF 5','EMF').replace('Orbs','ORB');
                dots += `<div class="${cls}">${label}</div>`;
            }
        });
        if(g.name === 'The Mimic') {
            let cls = 'ev-tag mimic';
            if(app.evidence.orb === 1) cls += ' match';
            dots += `<div class="${cls}">+ORBS</div>`;
        }

        let traitsHtml = '';
        if(g.traits) g.traits.forEach(t => traitsHtml += `<div class="trait-badge">${t}</div>`);

        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-name">${g.name}</h3>
                <div class="pill-container"><div class="stat-pill danger"><span>Hunt: ${g.hunt}</span></div></div>
            </div>
            <div class="trait-row">${traitsHtml}</div>
            <div class="card-desc">${g.desc}</div>
            <div class="card-bot">${dots}</div>
        `;
        
        card.addEventListener('click', () => openGhostModal(g));
        ui.ghostGrid.appendChild(card);
    });
}

function openGhostModal(g) {
    document.getElementById('mName').textContent = g.name;
    document.getElementById('mContent').innerHTML = `
        <div class="stat-grid">
            <div class="stat-box"><span class="stat-label">Speed</span><span class="stat-val" style="color:var(--acc-orange)">${g.speed}</span></div>
            <div class="stat-box"><span class="stat-label">Hunt Threshold</span><span class="stat-val" style="color:var(--acc-red)">${g.hunt}</span></div>
            <div class="stat-box"><span class="stat-label">Blink Rate</span><span class="stat-val">${g.blink}</span></div>
            <div class="stat-box"><span class="stat-label">Difficulty</span><span class="stat-val">${g.danger}</span></div>
        </div>
        <div class="section-header">Behavior</div>
        <div class="detail-text">${g.ability}</div>
        <div class="section-header">Zero Evidence Tell</div>
        <div class="detail-text" style="color:var(--acc-cyan)">${g.zeroEv}</div>
        <div class="section-header">Confirmation Test</div>
        <div class="confirm-box detail-text">${g.test}</div>
    `;
    ui.ghostModal.showModal();
}

// --- 6. MANUAL CONTENT ---
const MANUAL_DB = {
    ev: `
        <div class="manual-entry">
            <h4>EMF Level 5</h4>
            <p class="detail-text">
                Reader must hit the red LED (5). Level 2–4 is normal interaction or events.
                <br><span class="hl-blue">Tip:</span> Place EMF on doors, windows, or objects the ghost touches to catch EMF 5.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Spirit Box</h4>
            <p class="detail-text">
                Lights OFF in the room. Ask questions while close to the ghost room.
                Look for the <span class="hl-green">ghost icon</span> on the box UI, that is evidence.
                <br><span class="hl-blue">Tip:</span> You can talk while other gear is on, just avoid high noise sources like active hunts.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Ultraviolet (UV)</h4>
            <p class="detail-text">
                Green handprints on doors, windows, light switches, and keyboards.
                Footprints from salt are <span class="hl-red">NOT</span> evidence, even though they show up with UV.
                <br><span class="hl-blue">Tip:</span> Check doors right after they move &mdash; prints fade in ~60 seconds, some ghosts shorten this.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Ghost Orbs</h4>
            <p class="detail-text">
                Small floating spheres seen only on video cameras with Night Vision.
                Orbs spawn in or near the <span class="hl-green">current ghost room.</span>
                <br><span class="hl-blue">Tip:</span> Place camera at head height pointing into the room, then check from the truck or a monitor.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Ghost Writing</h4>
            <p class="detail-text">
                Ghost writes in the book. Thrown books or kicked books are <span class="hl-red">not</span> evidence.
                <br><span class="hl-blue">Tip:</span> Use two books in the ghost room to speed this up, especially for shy ghosts.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Freezing Temperatures</h4>
            <p class="detail-text">
                Below 0°C/32°F with visible breath. Thermometer or breath both count.
                <br><span class="hl-blue">Tip:</span> Check multiple rooms and hallways, especially if the breaker has just come on.
            </p>
        </div>
        <div class="manual-entry">
            <h4>D.O.T.S Projector</h4>
            <p class="detail-text">
                Green silhouette running through the projector area.
                Some ghosts are more visible on camera than to the naked eye.
                <br><span class="hl-blue">Tip:</span> Place DOTS in the center of the ghost room and watch from camera for a while.
            </p>
        </div>
    `,
    sanity: `
        <div class="manual-entry">
            <h4>Sanity Basics</h4>
            <p class="detail-text">
                Your sanity drains over time, faster in the dark.
                <br>&bull; Base drain: ~<span class="hl-green">0.12%/sec</span> in light, ~<span class="hl-red">0.24%/sec</span> in darkness (values approximate).
                <br>&bull; Ghost events (breathing, apparitions) drain extra sanity on top.
                <br>&bull; Some ghosts have unique sanity abilities (extra drain or protection).
            </p>
        </div>
        <div class="manual-entry">
            <h4>Average vs Individual Sanity</h4>
            <p class="detail-text">
                Hunt checks use the <span class="hl-blue">average team sanity</span>, not just yours.
                <br>&bull; One low-sanity player can drag the whole team’s average down.
                <br>&bull; Some ghosts target a single player (Banshee), but still respect average sanity for hunts.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Hunt Thresholds</h4>
            <p class="detail-text">
                Approximate thresholds (average sanity):
                <br><span class="hl-red">80%</span> Yokai (if talking a lot)
                <br><span class="hl-red">75%</span> Thaye (young)
                <br><span class="hl-red">70%</span> Demon
                <br><span class="hl-red">60%</span> Mare (in the dark)
                <br><span class="hl-red">50%</span> Standard ghosts
                <br><span class="hl-green">35%</span> Shade
                <br><span class="hl-blue">Special:</span> Some abilities allow hunts above usual values (e.g. Demon, cursed hunts).
            </p>
        </div>
        <div class="manual-entry">
            <h4>Sanity Pills</h4>
            <p class="detail-text">
                Pills restore a chunk of sanity depending on difficulty.
                <br>&bull; Higher difficulties restore less sanity.
                <br>&bull; Each player has a limited number of pills per contract.
                <br><span class="hl-blue">Tip:</span> Use pills after early evidence but before hitting dangerous hunt ranges to stabilize the game.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Sanity & Specific Ghosts</h4>
            <p class="detail-text">
                Some ghosts interact heavily with sanity:
                <br>&bull; <span class="hl-red">Yurei:</span> Door slam that drains ~15%.
                <br>&bull; <span class="hl-red">Phantom:</span> Looking at it drains sanity faster during events.
                <br>&bull; <span class="hl-red">Moroi:</span> Curses you via Spirit Box/Paramic and speeds up the lower your sanity gets.
                <br>&bull; <span class="hl-red">Demon:</span> Can hunt very early and has a shorter hunt cooldown.
            </p>
        </div>
    `,
    cursed: `
        <div class="manual-entry">
            <h4>Ouija Board</h4>
            <p class="detail-text">
                Asks questions directly to the ghost.
                <br>&bull; Each question drains sanity, more for certain questions.
                <br>&bull; Saying "Goodbye" correctly ends the session safely.
                <br><span class="hl-red">Hide and Seek</span> will trigger an instant hunt.
                <br><span class="hl-blue">Tip:</span> Use it deliberately when you are ready to hide &mdash; great for speedrunning and forced hunts.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Tarot Cards</h4>
            <p class="detail-text">
                Draw cards for random effects:
                <br>&bull; <span class="hl-red">Death:</span> Triggers a hunt.
                <br>&bull; <span class="hl-green">Sun:</span> Restores sanity to 100%.
                <br>&bull; <span class="hl-red">Moon:</span> Drops sanity to 0%.
                <br>&bull; <span class="hl-red">Hanged Man:</span> Instant death.
                <br><span class="hl-blue">Tip:</span> Always be near a hiding spot when drawing cards, in case you pull Death.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Music Box</h4>
            <p class="detail-text">
                Plays a lullaby, revealing the ghost’s location.
                <br>&bull; Walking too close while it plays will make the ghost manifest and then hunt.
                <br>&bull; Turning it off early can still anger the ghost.
                <br><span class="hl-blue">Tip:</span> Use to pinpoint the ghost room, but make sure your hiding route is planned first.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Haunted Mirror</h4>
            <p class="detail-text">
                Shows the ghost room through the mirror.
                <br>&bull; Using it drains sanity rapidly while held up.
                <br>&bull; If sanity gets too low or used too long, it will shatter and trigger a hunt.
                <br><span class="hl-blue">Tip:</span> Peek briefly to learn the room, then stop before it cracks.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Voodoo Doll</h4>
            <p class="detail-text">
                Interacting pushes random pins.
                <br>&bull; Each pin causes a ghost interaction and sanity drain.
                <br>&bull; The heart pin forces a hunt.
                <br><span class="hl-blue">Tip:</span> Use for extra interactions when you need evidence, but be ready for an immediate hunt.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Summoning Circle</h4>
            <p class="detail-text">
                Lights candles to summon a full ghost apparition.
                <br>&bull; Lighting all candles forces the ghost to appear in the circle.
                <br>&bull; After the manifestation it will immediately hunt.
                <br><span class="hl-blue">Tip:</span> Great for ghost photos, but only use if your hiding spot is close and safe.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Monkey Paw</h4>
            <p class="detail-text">
                Grants limited wishes with trade-offs.
                <br>&bull; Wishes can change weather, sanity, revive, lock doors, and more, but each has a curse.
                <br>&bull; Many wishes force cursed hunts, disable hiding spots, or distort vision.
                <br><span class="hl-blue">Tip:</span> Treat it as a late-game tool when you understand the downside of each wish.
            </p>
        </div>
    `,
    equip: `
        <div class="manual-entry">
            <h4>Crucifix</h4>
            <p class="detail-text">
                Prevents hunts from starting within range.
                <br>&bull; Default radius ~3m, <span class="hl-red">5m for Demon.</span>
                <br>&bull; Each use burns one arm &mdash; two uses and it is destroyed.
                <br><span class="hl-blue">Tip:</span> Place on the floor where the ghost stands most often (center of ghost room or favorite hallway).
            </p>
        </div>
        <div class="manual-entry">
            <h4>Smudge Sticks</h4>
            <p class="detail-text">
                Burn to repel or blind the ghost.
                <br>&bull; During a hunt, blinds and slows the ghost for a few seconds.
                <br>&bull; Outside hunts, prevents hunts for 90s, <span class="hl-green">180s for Spirit</span>, less for Demon.
                <br><span class="hl-blue">Tip:</span> Use them on the ghost room or as an escape tool while looping.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Sanity Pills</h4>
            <p class="detail-text">
                Restores sanity depending on difficulty.
                <br>&bull; Stronger on lower difficulties, weaker on higher.
                <br>&bull; Limited number per contract.
                <br><span class="hl-blue">Tip:</span> Save pills until after you’ve gathered some evidence, then stabilize before pushing late game.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Candles & Lighters</h4>
            <p class="detail-text">
                Candles prevent passive sanity drain when near them.
                <br>&bull; The ghost can blow them out.
                <br>&bull; Onryo has special interactions with flames and candles.
                <br><span class="hl-blue">Tip:</span> Use candles in objectives rooms to stay longer without losing tons of sanity.
            </p>
        </div>
        <div class="manual-entry">
            <h4>EMF Reader</h4>
            <p class="detail-text">
                Detects ghost interactions and certain abilities.
                <br>&bull; EMF 5 is evidence, lower levels are still useful for tracking interactions.
                <br><span class="hl-blue">Tip:</span> Drop EMF in the ghost room and check it after noises, door moves, or thrown items.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Thermometer</h4>
            <p class="detail-text">
                Helps find the coldest room.
                <br>&bull; Rooms cool over time, especially with the breaker off.
                <br>&bull; Freezing temps still show even if the room warms slightly.
                <br><span class="hl-blue">Tip:</span> Sweep early to locate the ghost, then confirm with breath or more precise readings.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Video Camera</h4>
            <p class="detail-text">
                Used for Ghost Orbs and DOTS (via monitor).
                <br>&bull; Place on tripods or surfaces looking across the room.
                <br>&bull; Night Vision mode is required to see Orbs clearly.
                <br><span class="hl-blue">Tip:</span> Try multiple angles if you suspect Orbs but haven’t seen any yet.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Photo Camera</h4>
            <p class="detail-text">
                Earns money and evidence photos.
                <br>&bull; Dead bodies, interactions, fingerprints, footprints, and the ghost all give photo rewards.
                <br><span class="hl-blue">Tip:</span> Keep it ready during ghost events &mdash; some ghosts (Phantom) behave differently in photos.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Parabolic Microphone</h4>
            <p class="detail-text">
                Listens for distant sounds through walls.
                <br>&bull; Some ghosts have special parabolic sounds (e.g. Banshee scream, Moroi breath).
                <br><span class="hl-blue">Tip:</span> Use on large maps to locate the ghost wing before moving gear in.
            </p>
        </div>
        <div class="manual-entry">
            <h4>DOTS Projector</h4>
            <p class="detail-text">
                Projects a green grid to reveal DOTS evidence.
                <br>&bull; Some ghosts (Goryo) only show DOTS on camera, not to the naked eye.
                <br><span class="hl-blue">Tip:</span> Combine DOTS + video camera to cover both normal and Goryo-style DOTS.
            </p>
        </div>
        <div class="manual-entry">
            <h4>Motion & Sound Sensors</h4>
            <p class="detail-text">
                Area control tools for larger maps.
                <br>&bull; Motion triggers when anything passes through the beam.
                <br>&bull; Sound sensors report activity in a wide cone on the truck monitor.
                <br><span class="hl-blue">Tip:</span> Great for tracking roaming ghosts when you are unsure of the exact room.
            </p>
        </div>
        <div class="manual-entry">
            <h4>UV Light & Glowstick</h4>
            <p class="detail-text">
                Both reveal fingerprints and footprints.
                <br>&bull; Glowsticks can be dropped and left in the room for constant coverage.
                <br><span class="hl-blue">Tip:</span> Use glowsticks around salt piles to catch footprints quickly.
            </p>
        </div>
    `
};

// exposed for HTML onclick
window.showManualTab = (key, btn) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.getElementById('manualContent').innerHTML = MANUAL_DB[key];
};

function resetTimer() {
    if(app.timer.int) clearInterval(app.timer.int);
    app.timer.int = null;
    ui.timerBtn.innerHTML = "▶";
    ui.timerBtn.classList.remove('active');
    ui.timerDisplay.textContent = app.timer.dur;
    ui.timerFill.style.width = "0%";
    ui.timerFill.style.background = "var(--acc-cyan)";
}

// kick off
init();
