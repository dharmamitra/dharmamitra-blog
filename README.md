# Dharmamitra Blog

Research news, releases, and updates from the [Dharmamitra Project](https://dharmamitra.org).

Built with [Jekyll](https://jekyllrb.com/) and deployed to **GitHub Pages**.
The design mirrors the Dharmamitra frontend (Noto Sans, maroon `#972e3a`
accents, light-pink panels). **Posts publish automatically** when pushed to
`main` — no build step to run by hand.

---

## ✍️ Publishing a post (the common case)

1. Create a file in [`_posts/`](_posts/) named `YYYY-MM-DD-your-title.md`.
2. Add front matter and write in Markdown:

   ```markdown
   ---
   title: "Your post title"
   date: 2026-06-15
   author: Your Name
   tags: [release, research]
   description: One-line summary shown on the home page and in search results.
   ---

   Your content here, in **Markdown**. Images go in `assets/images/` and are
   referenced as `![alt]({{ "/assets/images/your-image.png" | relative_url }})`.
   ```

3. Commit and push to `main`.

That's it. The [GitHub Actions workflow](.github/workflows/pages.yml) rebuilds
the site and deploys it within a minute or two.

> **Tip:** `date:` controls ordering and the post's URL. `tags:` and
> `description:` are optional but recommended. The first paragraph is used as the
> excerpt on the home page if no `description:` is given.

### Drafts

Put work-in-progress posts in [`_drafts/`](_drafts/) (no date prefix needed).
They won't publish. Preview them locally with `--drafts` (see below).

---

## 🛠️ One-time GitHub setup

In the repo on GitHub: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. After that, every push to `main` deploys automatically.

The site will be served at **https://dharmamitra.github.io/dharmamitra-blog/**.

### Using a custom domain (e.g. blog.dharmamitra.org)

1. Add a `CNAME` file at the repo root containing the domain.
2. In [`_config.yml`](_config.yml) set `url:` to the domain and `baseurl: ""`.
3. Configure the DNS record at your provider and set the domain in
   **Settings → Pages**.

---

## 💻 Local preview (optional)

Requires Ruby ≥ 3.0.

```bash
bundle install
bundle exec jekyll serve --livereload      # http://127.0.0.1:4000/dharmamitra-blog/
bundle exec jekyll serve --drafts          # also render _drafts/
```

> macOS ships an old system Ruby (2.6). Install a newer one with
> [`rbenv`](https://github.com/rbenv/rbenv) or Homebrew (`brew install ruby`)
> before running locally. Local preview is **not required** to publish — the
> GitHub Action builds with Ruby 3.3.

---

## 📁 Structure

```
_config.yml                 Site config (title, links, URLs, plugins)
index.html                  Home page — lists all posts
about.md                    About page
_posts/                     ← published posts (YYYY-MM-DD-title.md)
_drafts/                    unpublished work in progress
_layouts/                   default · home · post · page templates
_includes/                  head · header · footer partials
assets/css/style.scss       theme (Dharmamitra design language)
assets/images/              logos, favicon, and post images
.github/workflows/pages.yml CI: build + deploy to GitHub Pages
```
