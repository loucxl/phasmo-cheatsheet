# PHASMO.OS // Complete Investigation Suite

A comprehensive web-based toolkit for Phasmophobia investigators — built for ghost hunters of all experience levels. Whether you're learning the basics or mastering zero-evidence runs, this site has everything you need to identify ghosts, survive hunts, and complete objectives.

## ✨ Features

### 🔍 Smart Evidence Filtering
Select evidence as you find it and watch the suspect list automatically narrow down. Real-time filtering shows you exactly which ghosts are still possible based on your findings.

### 👻 Comprehensive Ghost Database
Click any ghost card for complete information including:
- Detailed ability explanations for beginners
- Precise hunt thresholds and movement speeds
- Step-by-step identification tests
- Zero-evidence identification tips for Nightmare/Insanity modes
- Strengths, weaknesses, and survival strategies

### 🗺️ Complete Game Information
- **Maps Database**: All 12 maps with difficulty ratings, room counts, and hiding spots
- **Equipment Guide**: 22 items with costs, mechanics, ranges, and pro tips
- **Game Mechanics**: Hunt systems, sanity mechanics, difficulty modifiers, cursed possessions
- **Strategy Guide**: Phase-by-phase tactics from setup to escape

### ⚙️ Advanced Tools
- **Hunt Threshold Reference**: Know exactly when each ghost type can start hunting
- **Speed Tracking**: Accurate movement speeds (m/s) for footstep identification
- **Filter Customization**: Fast speed, early hunter, quiet footsteps, guaranteed evidence
- **Hunt Timer**: Built-in stopwatch with presets for smudge sticks (90s/180s/60s) and cooldowns (25s)

### 💡 Quality of Life
- Clean, modern interface designed for quick reference during investigations
- Reset button to start fresh without reloading
- Responsive design for desktop and tablet (mobile optimization in progress)
- Beginner's guide included with plain-English explanations

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **No Dependencies**: Zero external frameworks or libraries required
- **Client-Side**: All data stored locally in your browser - no backend, no tracking
- **Lightweight**: Fast loading and offline-capable once cached

## 🎮 Perfect For

- **New Players**: Learn ghost behaviors with beginner-friendly explanations
- **Veteran Hunters**: Quick reference for hunt thresholds, speeds, and zero-evidence identification
- **Team Play**: Share your screen for coordinated investigations
- **Challenge Runs**: Nightmare and Insanity mode reference guides

## 🚀 Getting Started

### Option 1: Use the Live Site
Visit the hosted version at: `[Your URL Here]`

### Option 2: Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/phasmo-os.git
   ```
2. Open `index.html` in your browser
3. No build process or installation required!

## 📁 Project Structure

```
phasmo-os/
├── index.html          # Main application file
├── script.js           # Ghost data and application logic
├── style.css           # Styling and responsive design
└── README.md           # This file
```

## 🤝 Contributing

Contributions are welcome! If you notice any incorrect ghost data, have suggestions for new features, or want to improve the codebase:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Data Accuracy

Ghost mechanics and behaviors are verified against:
- Official Phasmophobia Wiki
- Community testing and research
- Game patch notes and updates

If you notice any outdated information after a game update, please open an issue!

## ⚠️ Disclaimer

This is a fan-made tool created by the Phasmophobia community for the community. It is **not affiliated with, endorsed by, or connected to Kinetic Games** in any way. All ghost mechanics, hunt behaviors, and game data are based on community research, testing, and publicly available information. Game mechanics may change with updates.

Phasmophobia and all related trademarks are property of Kinetic Games.


## 🙏 Acknowledgments

- Kinetic Games for creating Phasmophobia
- The Phasmophobia community for extensive testing and documentation
- Contributors who help keep ghost data accurate and up-to-date

---

**Made with ❤️ for ghost hunters everywhere**

*Star this repo if you find it helpful!* ⭐

# PHASMO.OS Update Changelog - v2.1
## Winter's Jest Update (December 2025)

### 🎉 What's New

This update adds the three brand new ghosts introduced in Phasmophobia's Winter's Jest 2025 update, bringing the total ghost count from 24 to **27 ghosts**.

---

## 📊 New Ghosts Added

### 1. **Dayan** 
- **Evidence:** EMF 5, Ghost Orbs, Spirit Box
- **Hunt Threshold:** 45-60% (varies with player movement)
- **Speed:** 1.12-2.25 m/s (varies with player movement)
- **Danger Level:** Medium

**Key Traits:**
- Reacts to player movement within 10 meters
- Speeds up to 2.25 m/s when players move near her
- Slows down to 1.12 m/s when players stand still
- Always uses female ghost models (like Banshee)
- Hunt threshold increases to 60% if moving, decreases to 45% if standing still

**How to Identify:**
- Stand completely still during a hunt - if the ghost dramatically slows to a crawl, it's a Dayan
- Check the ghost's gender - Dayan is always female
- Movement-reactive behavior is very distinctive

---

### 2. **Gallu**
- **Evidence:** EMF 5, Ultraviolet, Spirit Box
- **Hunt Threshold:** 40-60% (three different states)
- **Speed:** 1.36-1.96 m/s (three different states)
- **Danger Level:** High

**Key Traits:**
- Described as "another form of demon"
- Gets ENRAGED when protective equipment is used (crucifixes, smudge sticks)
- Has three behavioral states: Normal, Enraged, and Weakened
- Protective equipment becomes less effective when ghost is enraged
- After being enraged, becomes exhausted and enters weakened state

**How to Identify:**
- Use crucifixes or smudge sticks multiple times
- If hunts become MORE frequent and equipment seems less effective, then suddenly the ghost weakens, it's a Gallu
- Very aggressive, demon-like hunting behavior

---

### 3. **Obambo**
- **Evidence:** Ultraviolet, Ghost Writing, D.O.T.S Projector
- **Hunt Threshold:** 10% (calm) / 65% (aggressive)
- **Speed:** 1.45 m/s (calm) / 1.96 m/s (aggressive)
- **Danger Level:** Medium

**Key Traits:**
- Switches between calm and aggressive states every ~2 minutes
- In calm state: barely hunts (10%), slow speed (1.45 m/s), very low activity
- In aggressive state: hunts frequently (65%), faster speed (1.96 m/s), high activity
- Can switch states mid-hunt!
- May be confused with Shade (calm) or Demon (aggressive)

**How to Identify:**
- Be patient and observe over time
- Look for dramatic mood swings - extremely passive then suddenly very aggressive
- Evidence collection often only happens during aggressive phases
- Inconsistent behavior is the key tell

---

## 🎨 Visual Updates

### Work-in-Progress Banner
- Added an informative banner at the top of the site
- Informs users that the site has been updated with the new ghosts
- Clarifies that core functionality works as intended
- Uses animated styling to draw attention without being intrusive

### Updated Statistics
- Ghost count updated from 24 to 27 throughout the site
- Version number updated to v2.1

---

## 📝 Technical Changes

### Files Modified:
1. **script.js** - Added three new ghost entries to the GHOSTS array
2. **index.html** - Added WIP banner, updated ghost count from 24 to 27, updated version to v2.1
3. **style.css** - Added banner styling with animations

### Data Integrity:
- All existing ghosts remain unchanged
- New ghosts follow the same data structure as existing entries
- Evidence filtering will automatically include new ghosts
- No breaking changes to existing functionality

---

## 🎮 How to Use

Simply replace your current `index.html`, `script.js`, and `style.css` files with these updated versions. The site will automatically:
- Display all 27 ghosts
- Include new ghosts in evidence filtering
- Show the WIP banner at the top
- Work exactly as before, just with more ghosts!

---

## 📌 Important Notes

### Evidence Combinations:
- **Dayan:** EMF 5 + Orbs + Spirit Box (unique combination)
- **Gallu:** EMF 5 + UV + Spirit Box (unique combination)
- **Obambo:** UV + Writing + D.O.T.S (unique combination)

Each new ghost has a unique evidence combination, making them distinguishable through the evidence system.

### Behavioral Testing:
These three ghosts are particularly behavior-focused:
- **Dayan** requires movement testing
- **Gallu** requires protective equipment testing
- **Obambo** requires patience and time observation

### Zero-Evidence Runs:
All three ghosts have detailed zero-evidence identification tips included in their descriptions for Nightmare/Insanity difficulty players.

---

## 🔮 Future Updates

The site will continue to be updated as:
- More information about these ghosts is discovered by the community
- Balance changes are made by the developers
- Additional content is added to Phasmophobia

---

## ✅ Testing Checklist

Before going live, verify:
- [✓] All 27 ghosts appear in the grid
- [✓] Evidence filtering works with new ghosts
- [✓] Banner displays correctly at the top
- [✓] Ghost cards open and display new ghost information
- [✓] Speed and hunt threshold filters include new ghosts correctly
- [✓] No JavaScript errors in console

---

**Happy Hunting! 👻**

*Last Updated: December 17, 2025*
