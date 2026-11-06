// Fails on any file in _posts/ that the main site would leave out or show blank. Run from the repo root.
// Mirrors parsePost and listPostFiles in dharmamitra-frontend-next, with the same gray-matter parser.
import { readdirSync, readFileSync, statSync } from "node:fs"
import matter from "gray-matter"

// Keep in sync with BLOG_CATEGORIES in dharmamitra-frontend-next.
const CATEGORIES = ["news", "updates", "events", "research", "publications"]
const FILE_NAME = /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/
const MAX_POST_BYTES = 64 * 1024
const MATTER_OPTIONS = {
  excerpt: () => "",
  engines: {
    javascript: {
      parse: () => {
        throw new Error("JavaScript front matter is not allowed")
      },
    },
  },
}

const isText = (value) => typeof value === "string" && value.trim().length > 0

function dateText(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : null
}

function isRealDate(text) {
  const date = new Date(`${text}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(text)
}

function problemsIn(entry) {
  if (!entry.isFile() || !FILE_NAME.test(entry.name)) {
    return ["the main site ignores this. Name posts YYYY-MM-DD-short-title.md, in lowercase letters, digits and hyphens"]
  }

  if (statSync(`_posts/${entry.name}`).size > MAX_POST_BYTES) {
    return ["the main site leaves out posts over 64 KB. Put images in assets/images/ rather than in the post"]
  }

  let parsed
  try {
    parsed = matter(readFileSync(`_posts/${entry.name}`, "utf8"), MATTER_OPTIONS)
  } catch (error) {
    const reason = error.message.split("\n")[0]
    return [`front matter is not valid. Check for repeated fields, and put quotation marks around any value containing a colon. (${reason})`]
  }

  const { data, content } = parsed
  const fileDate = entry.name.slice(0, 10)
  const problems = []
  if (!isText(data.title)) problems.push("title is missing or is not text")
  if (!isText(data.description)) problems.push("description is missing or is not text")
  if (!CATEGORIES.includes(data.category)) problems.push(`category must be one of: ${CATEGORIES.join(", ")}`)
  if (!isRealDate(fileDate)) problems.push("the date in the file name is not a real date")
  if (dateText(data.date) !== fileDate) problems.push(`date must be ${fileDate}, the same as in the file name, written as YYYY-MM-DD`)
  if (!content.trim()) problems.push("the post has no body. Check that the front matter ends with a --- line")
  return problems
}

let failed = false
for (const entry of readdirSync("_posts", { withFileTypes: true })) {
  for (const problem of problemsIn(entry)) {
    failed = true
    console.log(`::error file=_posts/${entry.name}::${problem}`)
  }
}
if (failed) process.exit(1)
console.log("All posts are valid.")
