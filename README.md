# Hongyu Yang

🌐 **Website: <https://hongyuyang9.github.io/>**

Hongyu Yang's personal page — a plain HTML/CSS/JS site served by GitHub Pages (no build step).

## 改哪里（Where to edit）

几乎所有文字都在 `index.html`。在编辑器里搜索下面的「搜索词」就能跳到对应位置。

| 想改什么 | 文件 | 搜索词 |
| --- | --- | --- |
| 左栏：名字、身份、学校、地点 | `index.html` | `Left sidebar` |
| 左栏：邮箱、Google Scholar、GitHub、ORCID、LinkedIn 链接 | `index.html` | `class="links"` |
| 头像 | 把方形照片存成 `assets/img/avatar.jpg` | — |
| 顶部 tab 名称 | `index.html` | `class="tabs"` |
| Home：自我介绍 | `index.html` | `About Me` |
| Home：研究方向标签 | `index.html` | `Research Interests` |
| Home：News | `index.html` | `class="news"` |
| Publications：文章 | `index.html` | `<!-- PUBLICATIONS -->`（复制一个 `<li class="pub">…</li>` 加新文章） |
| CV：Education（博士 / 硕士 / 本科） | `index.html` | `<!-- CV -->` 下面的 `Education` |
| CV：Research Experience | `index.html` | `Research Experience` |
| CV：Work Experience | `index.html` | `Work Experience` |
| CV：Skills | `index.html` | `<h3>Skills</h3>` |
| Hobbies：最上面一排四个爱好 | `index.html` | `class="hobby-row"` |
| Hobbies：花的图片 | 图片放 `assets/img/hobbies/`，在 `index.html` 搜 `class="gallery"`，复制一个 `<figure>` 改文件名和说明 |
| Hobbies：图片来源（Photo credits） | `index.html` | `class="credits"`（换成自己的照片后删掉对应那一行） |
| 今天吃什么：菜单 | `index.html` | `class="food-list"`（一个 `<li>` 一道菜） |
| 页脚 | `index.html` | `<footer` |
| 颜色（主色蓝、顶栏和按钮的蓝紫粉渐变 `--bar-bg` / `--grad`、背景白）和字体 | `assets/css/style.css` | 最上面的 `:root`（浅色）和 `[data-theme="dark"]`（深色） |
| 访客统计代码、点赞计数设置 | `assets/js/main.js` | 最上面的 `SITE` |

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`.
3. The site appears at <https://hongyuyang9.github.io/>.

## Private visitor stats (GoatCounter)

1. Sign up at <https://www.goatcounter.com> and pick a code, e.g. `hongyuyang9`.
2. Put the code in `SITE.goatcounter` in `assets/js/main.js`.
3. Log in to `https://<code>.goatcounter.com` to see visits, pages, referrers and visitor locations
   (country / region). The dashboard is private; nothing is shown on the site, and visits from
   `localhost` are not counted.

## Like button

Uses the free [Abacus](https://abacus.jasoncameron.dev) counter API. Each browser can like once.

## Photo credits

Flower photos in `assets/img/hobbies/` are from Wikimedia Commons under the licenses listed on the
Hobbies page ("Photo credits").
