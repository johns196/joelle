# Joelle Mahfouz — Portfolio Website

A modern, animated personal portfolio for Joelle Mahfouz — hospitality
management professional and journalist. Built with plain HTML/CSS/JS
(no build step, no dependencies) so it runs anywhere, including
GitHub Pages, for free.

**Style:** dark, elegant theme with gold/lilac accents, scroll-triggered
reveal animations, a mouse-parallax "depth" hero scene (multiple layers
moving at different speeds + subtle 3D tilt on cards — the closest real
web equivalent of "4D": 3D space animated over time), a typewriter role
line, animated stat counters and skill bars, and a tabbed experience
timeline (Hotel Management / Journalism).

## 🚀 View it locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Publish on GitHub Pages (free hosting)

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Pick the branch this code is on (e.g. `main` or the current branch) and
   folder `/ (root)`, then **Save**.
5. Wait 1–2 minutes. Your site will be live at:
   `https://<your-github-username>.github.io/<repo-name>/`

That's it — no build tools, no server required.

## ✏️ How to add Joelle's real content

Everything that needs to be personalized is marked with `[Bracketed
Placeholder Text]` directly inside `index.html`. Open it and search for
`[` to jump between every spot that needs a real value. Key places:

| Section | What to replace |
|---|---|
| Hero tagline | The `<em>[Replace with Joelle's own tagline]</em>` line |
| About | Bio paragraph, City/Country, Education, Languages, Email |
| About photo | `assets/img/joelle-profile.jpg` is already set — swap it for a different photo any time (see below) |
| Experience | Job titles, hotel/publication names, dates, descriptions (two tabs: Hotel Management / Journalism) |
| Portfolio | Replace the 3 sample cards with real articles/projects and links |
| Contact | Real email, phone, LinkedIn, Instagram links |
| Download CV button | Add a PDF at `assets/cv/Joelle-Mahfouz-CV.pdf` (see `assets/cv/PUT_CV_HERE.txt`) |

### Swapping the photo

`assets/img/joelle-profile.jpg` is the current About-section photo
(a cropped portrait — cropped so only Joelle appears, since the
original photo also included a family member). To use a different
photo, add the new image file under `assets/img/` and update the
`src` in `index.html`:

```html
<img src="assets/img/your-new-photo.jpg" alt="Joelle Mahfouz portrait" id="profileImg" />
```

A portrait-oriented photo (roughly 4:5 ratio, at least 800×1000px)
works best. If a photo includes other people, crop it to just Joelle
before adding it here, especially if anyone in it is a minor.

## 📁 Project structure

```
index.html              — all page content/sections
assets/css/style.css    — design system, layout, animations
assets/js/main.js       — scroll reveals, parallax, tabs, typewriter, tilt
assets/img/             — profile photo
assets/cv/              — downloadable CV/resume PDF
```

## 🛠️ Tech

Vanilla HTML5, CSS3 (custom properties, 3D transforms, grid/flexbox),
and vanilla JavaScript (IntersectionObserver for scroll reveals, no
frameworks or build tools) — loads instantly and needs zero maintenance.
