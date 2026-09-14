# Xin Meng — Academic Homepage

Personal academic homepage for Xin Meng / 孟昕, focused on 3D medical imaging, multimodal medical AI, and trustworthy AI.

Site URL: <https://mengxinlab.github.io/>

The site is plain HTML, CSS, and minimal vanilla JavaScript. There is no build process, package manager, external font, framework, analytics service, or runtime dependency.

## File structure

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
├── assets/
│   ├── avatar-placeholder.svg
│   └── README.md
└── files/
    └── README.md
```

Future project pages can be added under `projects/<project-name>/index.html` while the homepage remains the stable root page. Shared colors, typography, buttons, badges, and research-card patterns can be reused from `style.css`.

## Edit the content

### Name and biography

Edit the hero and About sections in `index.html`. Search for `Xin Meng`, `Medical AI Researcher`, or the existing biography sentences to find the relevant content.

### Light and dark colors

Edit the CSS custom properties near the top of `style.css`:

- `:root` defines the light theme.
- `@media (prefers-color-scheme: dark)` defines the system dark theme.
- `html[data-theme="light"]` and `html[data-theme="dark"]` define manually selected themes.

Keep the same semantic variable names so all components update consistently.

### Replace the avatar

The current text-first Hero intentionally leaves the right side open and does not display a portrait. If a photo is added later, place an optimized square image in `assets/` and reintroduce a semantic `<figure>` beside the Hero copy. See `assets/README.md` for preparation guidance.

### Add a WeChat QR code

Place the image at `assets/wechat-qr.png`. No code change is required. The modal detects the file and replaces its fallback message automatically.

### Add the CV

Place the PDF at:

`files/Xin_Meng_CV.pdf`

The header, hero, and Contact section already use this path.

### Add papers and slides

Place the current presentation resources at:

- `files/growthmamba-paper.pdf`
- `files/growthmamba-slides.pdf`

When present, the homepage automatically turns the corresponding “Coming soon” labels into links. PDF links open in a new tab.

### Add another Selected Research entry

1. Copy one complete `<article class="research-card">` block in `index.html`.
2. Replace its teaser, status, venue/year, title, description, tags, and available resources.
3. Use truthful status labels such as `Research Manuscript`, `Ongoing Research`, `Poster`, or a confirmed venue status.
4. Add only links that exist. External links must include `target="_blank"` and `rel="noopener noreferrer"`.
5. Keep the title concise and the description to approximately two or three sentences.

The card layout already supports future Paper, arXiv, Project Page, Code, Slides, and BibTeX links.

## Theme behavior

The theme control cycles through system, light, and dark. The first visit follows the operating-system preference. Manual light or dark choices are saved in `localStorage`; returning to system mode clears the saved override. A small inline script in the document head applies the preference before the stylesheet renders, preventing a wrong-theme flash.

## Test locally

From this repository directory, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Test navigation, theme changes, the Copy Email control, the WeChat modal, keyboard focus, and the narrow mobile layouts before publishing. Directly opening `index.html` also renders the core content, but a local server is needed for automatic document-availability checks.

## Deploy with GitHub Pages

1. Create or open the GitHub repository named `mengxinlab.github.io` under the `mengxinlab` account.
2. Commit these files to the `main` branch and push them to the repository root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**, then click **Save**.
6. Wait for the Pages deployment to finish, then open <https://mengxinlab.github.io/>.

The `.nojekyll` marker tells GitHub Pages to serve the static files directly.

## TODO checklist

- [ ] Replace `TODO_SCHOLAR` with the Google Scholar URL in `index.html`.
- [ ] Add `assets/wechat-qr.png`.
- [ ] Add `files/Xin_Meng_CV.pdf`.
- [ ] Add `files/growthmamba-paper.pdf`.
- [ ] Add `files/growthmamba-slides.pdf`.

After replacing a value, convert its disabled or “Coming soon” element in `index.html` into a normal link only when the destination is real.
