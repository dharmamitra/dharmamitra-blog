# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Jekyll blog for the [Dharmamitra Project](https://dharmamitra.org), deployed automatically to GitHub Pages at `https://dharmamitra.github.io/dharmamitra-blog/` on every push to `main`. No manual build step is needed to publish.

## Local development

Requires Ruby ≥ 3.0 (macOS system Ruby is too old — use `rbenv` or `brew install ruby`).

```bash
bundle install
bundle exec jekyll serve --livereload      # http://127.0.0.1:4000/dharmamitra-blog/
bundle exec jekyll serve --drafts          # also renders _drafts/
```

## Publishing posts

Add a file to `_posts/` named `YYYY-MM-DD-your-title.md` with this front matter:

```markdown
---
title: "Post title"
date: 2026-06-15
author: Author Name
tags: [release, research]
description: One-line summary shown on the home page and in search results.
---
```

- `date:` controls post ordering and the URL (`/:year/:month/:day/:title/`)
- `description:` is optional; the first paragraph is used as the excerpt if omitted
- Images go in `assets/images/` and are referenced with `{{ "/assets/images/file.png" | relative_url }}`
- Work-in-progress posts go in `_drafts/` (no date prefix needed) — they won't publish

## Architecture

- `_config.yml` — site settings, URL, plugins (`jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`), and default front matter that auto-applies `post` layout to all posts and `page` layout to all pages
- `_layouts/` — `default` (base HTML shell), `home` (post list), `post`, `page`
- `_includes/` — `head.html`, `header.html`, `footer.html` partials used by `default` layout
- `assets/css/style.scss` — theme (Noto Sans, maroon `#972e3a` accents, light-pink panels matching dharmamitra.org design language)
- `.github/workflows/jekyll.yml` — builds with Ruby 3.1 and deploys to GitHub Pages on push to `main`

## Custom domain

To switch to a custom domain (e.g. `blog.dharmamitra.org`): add a `CNAME` file at the repo root, set `url:` in `_config.yml` to the domain, set `baseurl: ""`, configure the DNS record, and update **Settings → Pages** on GitHub.
