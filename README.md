# Dipankar Chanda — Personal Website

A static personal website: HTML, CSS and vanilla JavaScript only. No backend, no database, no build step. Built to run on **GitHub Pages**.

---

## 1. Project structure

```
dipankar-chanda-website/
├── index.html          Home
├── about.html           About Me
├── education.html       Education timeline
├── journey.html          D.El.Ed Journey (dynamic, from data/journey.json)
├── notes.html            Notes & Resources (dynamic, from data/notes.json)
├── projects.html         Projects (dynamic, from data/projects.json)
├── teaching.html         Teaching & Internship
├── blog.html             Blog (dynamic, from data/blog.json)
├── contact.html          Contact
│
├── css/
│   ├── style.css         Design tokens + components
│   ├── responsive.css    Breakpoints
│   └── animations.css    Motion / reveal-on-scroll
│
├── js/
│   ├── theme.js           Dark/light mode
│   ├── components.js      Injects shared header/nav/footer into every page
│   ├── navigation.js      Scroll-to-top + reveal-on-scroll
│   ├── main.js             loadJSON() / empty & error state helpers
│   ├── notes.js            Notes & Resources page logic
│   ├── projects.js         Projects page logic
│   ├── journey.js          D.El.Ed Journey page logic
│   └── blog.js             Blog page logic
│
├── data/
│   ├── notes.json
│   ├── projects.json
│   ├── journey.json
│   ├── blog.json
│   └── education.json    (reference copy — education.html currently uses static HTML)
│
├── assets/
│   ├── images/            SVG placeholders (profile, project, note thumbnails)
│   └── icons/
│
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

Every page shares one nav and one footer, defined once in `js/components.js`, so you never need to edit navigation nine times.

---

## 2. Deploy to GitHub Pages

1. Create a new GitHub repository (public).
2. Upload every file in this project to that repository (keep the folder structure).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Choose the **main** branch and the **/ (root)** folder, then **Save**.
6. GitHub will give you a URL like `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`. Open it once the deployment finishes (usually under a minute).

No server setup, environment variables, or build commands are needed.

### Before/after deploying, replace these placeholders

- `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` — in `sitemap.xml`, `robots.txt`, and the `<link rel="canonical">` tag at the top of every HTML page.
- `YOUR_EMAIL@example.com` — in `contact.html`.
- `YOUR_INSTAGRAM_URL`, `YOUR_FACEBOOK_URL`, `YOUR_LINKEDIN_URL`, `YOUR_YOUTUBE_URL`, `YOUR_GITHUB_URL`, `YOUR_TELEGRAM_URL`, `YOUR_WHATSAPP_URL` — in `contact.html` **and** in `js/components.js` (footer icons use the same links, search for `SOCIAL_ICONS`).

---

## 3. Updating content (no coding required)

All notes, projects, journey entries and blog posts live in `data/*.json`. Edit the JSON, then push to GitHub — the live site updates automatically.

### Add a new note

Open `data/notes.json` and add a new object to the array:

```json
{
  "id": 9,
  "title": "CTET Child Development Notes",
  "category": "CTET",
  "semester": "",
  "subject": "Child Development & Pedagogy",
  "type": "Google Drive",
  "description": "Notes for CTET preparation.",
  "date": "2026-08-09",
  "url": "YOUR_GOOGLE_DRIVE_LINK",
  "tags": ["CTET", "CDP"],
  "published": true
}
```

- `url` should be a real Google Drive / Docs / Sheets link that opens in a new tab. Until you add a real link, the "Open Resource" button is automatically disabled.
- Set `"published": false` to hide an entry without deleting it.
- `id` should be unique — just increase the highest existing number by 1.

### Add a project

Edit `data/projects.json` the same way — see the existing IoT Attendance System entry as a template. Leave `"github"`, `"demo"`, or `"documentation"` as an empty string `""` if you don't have that link yet; the button will show as disabled instead of a broken link.

### Add a D.El.Ed journey entry

Edit `data/journey.json`. Use one of the existing categories (Semester 1, Semester 2, School Internship, Teaching Practice, Assignments, Lesson Plans, Reflective Diaries, School Observation, Art & Creative Education, Yoga Education, Work Education) or add a new category name — the filter dropdown updates automatically.

### Add a blog post

Edit `data/blog.json`. The `content` field supports simple HTML tags like `<p>`, `<strong>`, `<em>` if you want formatting inside the article view.

### After any edit

```bash
git add .
git commit -m "Add new note"
git push
```

GitHub Pages redeploys automatically within about a minute.

---

## 4. Replacing the profile photo

Currently `index.html` shows a "YOUR PHOTO HERE" placeholder built with `assets/images/profile-placeholder.svg`.

To use a real photo:

1. Add your photo to `assets/images/profile.jpg`.
2. In `index.html`, find the `.hero-photo` block and replace its contents with:
   ```html
   <img src="assets/images/profile.jpg" alt="Dipankar Chanda">
   ```
3. Commit and push.

---

## 5. Dark / light mode

Handled by `js/theme.js` using `localStorage` (key: `dc-theme`). If a visitor hasn't chosen a mode, the site follows their system preference automatically. No setup needed.

---

## 6. Notes on the tech choices

- **No framework** — React/Vue/etc. would add a build step, which GitHub Pages doesn't need and which would make simple JSON edits harder for a non-developer to maintain.
- **JSON + fetch()** — keeps content editable without touching HTML/CSS, while staying 100% static.
- **Relative paths everywhere** (`css/style.css`, not `/css/style.css`) — this is what makes the site work correctly at `https://username.github.io/repo-name/` instead of breaking on the repo subpath.

---

## 7. Future expansion (not built yet, structure allows it)

Quizzes, student registration, a PDF library, a resume/CV download, achievements, a discussion forum — none of these are implemented, but the JSON-driven structure and modular JS files make them straightforward to add later without a redesign.
