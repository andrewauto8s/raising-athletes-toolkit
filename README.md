# Raising Athletes, Strengthening Communities

Web version of the Raising Athletes, Strengthening Communities Parent Resource Toolkit, created and authored by Anthony Toth in partnership with The Family Center of Grosse Pointe and Harper Woods and Project Play Southeast Michigan. Web build by Auto8.

## Pages

| File | Page | Audience |
| --- | --- | --- |
| `index.html` | Home | Everyone: how to use the guide, five ideas, the Children's Bill of Rights |
| `parents.html` | Parents & Caregivers | Five parent topics, trusted feed, FAQ |
| `coaches-organizations.html` | Coaches & Organizations | Coach education, partnerships, endorsement steps |
| `local-programs.html` | Local Programs | Local youth sports organizations directory |
| `styles.css` | Shared styles | Colors, type, layout for every page |
| `site.js` | Shared script | Section menu, scroll highlighting, copy buttons |

Plain HTML, CSS and a small script. No build step, no framework. Any web host that serves static files can run it.

## Common edits

**Add a local organization.** Open `local-programs.html`, find the comment that starts `TO ADD AN ORGANIZATION`, copy one `<div class="org">…</div>` block, paste it after the last one, and change the sport label, name, description, and link.

**Fix or change a link.** Search the page for the old URL and replace it. Every external link is a normal `<a href="…">`.

**Change wording.** Edit the text directly in the page file. Section IDs (for example `id="endorse"`) are used by the menus, so leave those as they are.

**Update the date.** The "Updated September 2026" line is in the footer of each page.

## Preview locally

Open `index.html` in any browser.
