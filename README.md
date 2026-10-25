# Dharmamitra Blog

Research news, releases, and updates from the [Dharmamitra Project](https://dharmamitra.org).

Posts are written in Markdown in this repository and appear on two sites:

- **The preview site**, at
  [dharmamitra.github.io/dharmamitra-blog](https://dharmamitra.github.io/dharmamitra-blog/).
  It is built with [Jekyll](https://jekyllrb.com/) and GitHub Pages, and is
  used to check post content. **Posts publish automatically** when pushed to
`main` — no build step to run by hand.
- **The main site** (pending release), at [dharmamitra.org/blog](https://dharmamitra.org/blog).
  This is where users read the blog. Posts are automaticaly pulled from `main`
  once per hour.

---

## 🔄 How publishing works

1. Add or edit a post in [`_posts/`](_posts/) and commit it to `main`. The
   GitHub web editor is enough. No software needs to be installed.
2. The [GitHub Actions workflow](.github/workflows/jekyll.yml) rebuilds the
   preview site. The change appears there within a few minutes.
3. Check the post on the preview site.
4. The main site refreshes its copy of the blog at most once an hour. The
   change appears there about an hour after the commit. Nothing needs to be
   done to trigger this.

Both sites read the `main` branch. Every commit to `main` therefore reaches the
main site within about an hour, whether or not it was checked on the preview
site.

If the preview build fails, GitHub shows a red cross next to the commit and, the 
**Actions** tab shows the error.

Posts that are not ready to publish go in [`_drafts/`](#drafts). Neither site
shows drafts.

---

## ✍️ Creating a post

1. Create a file in [`_drafts/`](#drafts), or [`_posts/`](_posts/)  named `YYYY-MM-DD-short-title.md`.
2. Add front matter and write in Markdown:

   ```markdown
   ---
   title: "Your post title"
   date: 2026-06-15
   author: Your Name
   category: updates
   tags: [release, research]
   description: One-line summary shown in post lists and search results.
   ---

   Your content here, in **Markdown**. Images go in [`assets/images/`](assets/images/) and are
   referenced as `![Group photo at the OCR and Beyond workshop]({{ '/assets/images/OCR-and-beyond-group-photo.jpg' | relative_url }})`.
   ```

3. Commit to `main` (and, if working locally push).

   That's it. The preview site will be rebuilt and deployed within a minute or two and 
   if the post added to [`_posts/`](_posts/) it will then be visible.


### Drafts & file names

Put work-in-progress posts in [`_drafts/`](_drafts/). Neither site shows them.
To publish a draft, move it to `_posts/` and make sure its file name starts
with the date. Drafts can be previewed locally with `--drafts` (see the
[Local preview](#-local-preview-optional) section below).

The file name after the date becomes the post's address on the main
site. For example, `2026-08-31-aming-tu-prize.md` is published at
`dharmamitra.org/blog/2026-08-31-aming-tu-prize`. Use lowercase letters, digits and
hyphens, and keep it different from every other post. **Avoid renaming the file after the post is published**, because that changes its address and breaks existing links to it.

### Front matter fields

| Field | Required | What it holds |
| --- | --- | --- |
| `title` | Yes | The post title, in quotation marks. |
| `date` | Yes | The date as `YYYY-MM-DD`, the same as in the file name. It sets the order of posts. If only the month is known, use the first of that month. |
| `category` | Yes | One of the five categories listed below. |
| `description` | Yes | A summary of one or two sentences, shown in post lists and search results. Keep it under 220 characters. |
| `author` | No | The author's name, or `Dharmamitra Project`. |
| `tags` | No | Keywords in square brackets, for example `[prosopography, manuscripts]`. These should not overlap with categories and are unused on the main site |

**The main site leaves out any post that is missing a required field or whose `category` is not in the list below.** The preview site may still show such a
post, so check that all four required fields are present before committing.

### Categories

Every post has exactly one `category:`, chosen from this fixed list:

| Category | Use it for | Example |
| --- | --- | --- |
| `news` | Announcements about the project itself: awards, grants, partnerships and changes to the team. | [Aming Tu Prize for Outstanding Creative Contribution to Digital Buddhist Studies](_posts/2026-08-31-aming-tu-prize.md) |
| `updates` | Changes to the Dharmamitra tools and data: new features, datasets, models and integrations. | [Introducing ‘Segment View’, Expanded Datasets, and More!](_posts/2026-05-11-introducing-segment-view-expanded-datasets-and-more.md) |
| `events` | Talks, lectures, workshops and conference presentations given or organised by the team. | [OCR and Beyond Workshop at Tohoku University](_posts/2026-03-28-ocr-and-beyond-workshop.md) |
| `research` | Write-ups of research done with Dharmamitra tools or data, describing the methods and findings. | [Nepalese Scribes and Patrons](_posts/2026-10-02-nepalese-scribes-and-patrons.md) |
| `publications` | Papers published by the team. | [MITRA‑zh: An efficient, open machine translation solution for Buddhist Chinese](_posts/2023-12-01-mitra-zh.md) |

A `publications` post gives the full citation (authors and venue), the paper's
abstract or a summary of it, and ends with a **Read this article** link to the
paper.

### Images

Every user who opens a post downloads all of its images, so small files make
pages load faster and use less data. Git also keeps every version of every file
permanently. A large image stays in the repository's history even after it is
replaced or deleted, so resize and compress each image before its first commit.

- **Size.** Resize to at most 1600 pixels on the long side. Most images then
  come to well under 400 KB.
- **Format.** Use JPEG for photographs and PNG for screenshots, charts and
  diagrams with flat colour or text. WebP suits both and is usually the
  smallest. Saving a photograph as PNG makes it several times larger.
- **Tool.** [Squoosh](https://squoosh.app/) runs in the browser and needs no
  installation. It resizes, converts and compresses in one step, and its output
  leaves out the photo's metadata, such as camera details and location.
- **File names.** Use only letters, digits, hyphens and underscores. The main
  site cannot load an image whose name contains a space.
- **Alt text.** Describe what the image shows, for users who cannot see it.
- **Only commit images a post uses.**

---

## 🛠️ One-time GitHub setup

In the repo on GitHub: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. After that, every push to `main` deploys the preview site
automatically.


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
> before running locally. Local preview is **not required** to publish. The
> GitHub Action builds the site itself.

---

## 📁 Structure

```
_config.yml                  Site config (title, links, URLs, plugins)
index.html                   Home page — lists all posts
about.md                     About page
_posts/                      ← published posts (YYYY-MM-DD-title.md)
_drafts/                     unpublished work in progress
_layouts/                    default · home · post · page templates
_includes/                   head · header · footer partials
assets/css/style.scss        theme (Dharmamitra design language)
assets/images/               logos, favicon, and post images
.github/workflows/jekyll.yml CI: build + deploy the preview site
```
