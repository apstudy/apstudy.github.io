const fs = require('fs');
const path = require('path');

let lessonTemplate = fs.readFileSync("src/templates/lesson.html", "utf-8");
let unitTemplate = fs.readFileSync("src/templates/unit.html", "utf-8");
let courseTemplate = fs.readFileSync("src/templates/course.html", "utf-8");

// output directory for all generated files
const outDir = path.resolve(__dirname, '..', 'public');

// ensure the directory exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// array of pages to generate
const pages = [
  'ap-biology/index.json',
  'ap-biology/unit-1/index.json',
  'ap-biology/unit-1/lesson-0.json',
  'ap-biology/unit-1/lesson-1.json',
  'ap-biology/unit-1/lesson-2.json',
  'ap-biology/unit-1/lesson-3.json',
  'ap-biology/unit-1/lesson-4.json',
  'ap-biology/unit-1/lesson-5.json',
  'ap-biology/unit-1/lesson-6.json',
  'ap-biology/unit-2/index.json',
];

// write each page
pages.forEach((filename) => {
  const fullPath = path.join(outDir, filename.replace(".json", ".html").replace("/index",""));
  const dir = path.dirname(fullPath);

  // Ensure parent directories exist
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(fullPath, genGeneric(filename));

  console.log("Uploaded file: " + filename);
});


// copy icons from src/icons to public/icons
const iconsDir = path.resolve(__dirname, "..", "src/icons")
const icons = fs.readdirSync(iconsDir);
icons.forEach(icon => {
  const srcPath = path.join(iconsDir, icon)
  const destPath = path.resolve(outDir, "icons", icon);
  const destDir = path.dirname(destPath);

  // Ensure destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  fs.copyFileSync(srcPath, destPath)
})


// copy stylesheets from src/css to public/css
const stylesheetsDir = path.resolve(__dirname, "..", "src/css")
const stylesheets = fs.readdirSync(stylesheetsDir);
stylesheets.forEach(css => {
  const srcPath = path.join(stylesheetsDir, css)
  const destPath = path.resolve(outDir, "css", css);
  const destDir = path.dirname(destPath);

  // Ensure destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  fs.copyFileSync(srcPath, destPath)
})


// copy scripts from src/css to public/css
const scriptsDir = path.resolve(__dirname, "..", "src/js")
const scripts = fs.readdirSync(scriptsDir);
scripts.forEach(js => {
  const srcPath = path.join(scriptsDir, js)
  const destPath = path.resolve(outDir, "js", js);
  const destDir = path.dirname(destPath);

  // Ensure destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  fs.copyFileSync(srcPath, destPath)
})


// origin point of generate functions
function genGeneric(filename) {
  const slug = filename.replace(".json", "").replace("/index", "");
  const data = JSON.parse(fs.readFileSync("src/" + filename, 'utf-8'));

  if (data.type === "lesson") {
    return genLesson(slug, data);
  } else if (data.type === "unit") {
    return genUnit(slug, data);
  } else if (data.type === "course") {
    return genCourse(slug, data);
  }
}


// function to generate lesson content
function genLesson(lessonSlug, data) {
  let page = lessonTemplate;

  const navPath = path.resolve(__dirname, "..", "src", data["nav"] + ".json");
  const navData = JSON.parse(fs.readFileSync(navPath, 'utf-8'));
  const pagePath = lessonSlug.split("/")

  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{unit.slug}}", pagePath[1]);
  page = page.replaceAll("{{lesson.slug}}", pagePath[2]);

  let navText = "";
  navData.units.forEach((unit, unitIdx) => {
    navText += `<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`
    if (unit.slug === pagePath[1] && unit.hasOwnProperty("lessons")) {
      unit.lessons.forEach((lesson, lessonIdx) => {
        if (lesson.slug === pagePath[2]) {
          navText += `<li class="sub-item side-nav-current"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`;
          
          page = page.replaceAll("{{page.title}}", lesson.prefix + ": " + lesson.title);

          page = page.replaceAll("{{unit.title}}", unit.prefix + ": " + unit.title);
          page = page.replaceAll("{{lesson.title}}", lesson.prefix + ": " + lesson.title);

          if (lessonIdx === 0) {
            page = page.replace("{{navigation.previous}}", `/${navData.course}/${unit.slug}`)
          } else {
            page = page.replace("{{navigation.previous}}", `/${navData.course}/${unit.slug}/${unit.lessons[lessonIdx - 1].slug}`)
          }

          if (lessonIdx === unit.lessons.length - 1) {
            page = page.replace("{{navigation.next}}", `/${navData.course}/${navData.units[unitIdx + 1].slug}`)
          } else {
            page = page.replace("{{navigation.next}}", `/${navData.course}/${unit.slug}/${unit.lessons[lessonIdx + 1].slug}`)
          }

        } else {
          navText += `<li class="sub-item"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`
        }
      })
    }
  })

  page = page.replace("{{navigation}}", navText);

  page = page.replace("{{lesson.summary}}", data["summary"])

  const vocabData = data["vocab"]
  let vocabText = "";

  vocabData.forEach(vocab => {
    vocabText += `<li><a target="_blank" href="${vocab.link}">${vocab.term}</a></li>`;
  })

  page = page.replace("{{lesson.vocab}}", vocabText);
  page = page.replace("{{lesson.vocab-row-count}}", Math.ceil(vocabData.length/2))
  page = page.replace("{{lesson.vocab-row-count-3}}", Math.ceil(vocabData.length/3))

  const linkData = data["links"];
  let linkText = "";

  linkData.forEach(link => {
    linkText += `<li><a target="_blank" href="${link["link"]}">${link.title}</a></li>`
  })

  page = page.replace("{{lesson.links}}", linkText);

  const vidData = data["videos"];
  let vidText = "";

  vidData.forEach(vid => {
    vidText += `<div class="video-container">`
      vidText += `<div class="video-header">`
        vidText += `<h3>${vid.title}</h3>`
        vidText += `<a target="_blank" href="https://www.youtube.com/watch?v=${vid.link}"><img src="/icons/external_link.svg"></a>`
      vidText += `</div>`;
      vidText += `<iframe class="video-embed" src="https://www.youtube.com/embed/${vid.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    vidText += `</div>`
  })

  page = page.replace("{{lesson.videos}}", vidText)

  return page;
}


// function to generate unit content
function genUnit(unitSlug, data) {
  let page = unitTemplate;

  const navPath = path.resolve(__dirname, "..", "src", data["nav"] + ".json");
  const navData = JSON.parse(fs.readFileSync(navPath, 'utf-8'));
  const pagePath = unitSlug.split("/")

  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{unit.slug}}", pagePath[1]);

  page = page.replaceAll("{{course.ced}}", navData.ced)

  let navText = "";
  navData.units.forEach((unit, unitIdx) => {
    if (unit.slug === pagePath[1]) {
      navText += `<li class="item side-nav-current"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`;
      if (unit.hasOwnProperty("lessons")) {
        unit.lessons.forEach(lesson => {
          navText += `<li class="sub-item"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`
        })
      }

      page = page.replaceAll("{{page.title}}", unit.prefix + ": " + unit.title)
      page = page.replaceAll("{{unit.title}}", unit.prefix + ": " + unit.title)

      if (unitIdx === 0) {
        page = page.replace("{{navigation.previous}}", "/" + navData.course);
      } else if (navData.units[unitIdx-1].hasOwnProperty("lessons")) {
        page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units[unitIdx - 1].slug}/${navData.units[unitIdx - 1].lessons.at(-1).slug}`);
      } else {
        page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units[unitIdx - 1].slug}`)
      }

      if (unit.hasOwnProperty("lessons")) {
        page = page.replace("{{navigation.next}}", `/${navData.course}/${unit.slug}/${unit.lessons[0].slug}`);
      } else if (unitIdx === navData.units.length - 1) {
        page = page.replace("{{navigation.next}}", "/" + navData.course)
      } else {
        page = page.replace("{{navigation.next}}", `/${navData.course}/${navData.units[unitIdx + 1].slug}`)
      }

    } else {
      navText += `<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`
    }
  })

  page = page.replace("{{navigation}}", navText);

  page = page.replace("{{unit.summary}}", data["summary"])

  const unitVidData = data["unit-video"];
  let unitVidText = "";

  unitVidText += `<div class="video-header">`
    unitVidText += `<h2>${unitVidData.title}</h2>`
    unitVidText += `<a target="_blank" href="https://www.youtube.com/watch?v=${unitVidData.link}"><img src="/icons/external_link.svg"></a>`
  unitVidText += `</div>`;

  unitVidText += `<div class="video-container">`
    unitVidText += `<iframe class="video-embed" src="https://www.youtube.com/embed/${unitVidData.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  unitVidText += `</div>`

  page = page.replace("{{unit.unit-video}}", unitVidText)

  const gameData = data["games"]
  let gameText = "";

  gameData.forEach(game => {
    gameText += `<li><a target="_blank" href="${game.link}">${game.title}</a></li>`;
  })

  page = page.replace("{{unit.games}}", gameText);

  const linkData = data["links"];
  let linkText = "";

  linkData.forEach(link => {
    linkText += `<li><a target="_blank" href="${link["link"]}">${link.title}</a></li>`
  })

  page = page.replace("{{unit.links}}", linkText);

  const vidData = data["videos"];
  let vidText = "";

  vidData.forEach(vid => {
    vidText += `<div class="video-container">`
      vidText += `<div class="video-header">`
        vidText += `<h3>${vid.title}</h3>`
        vidText += `<a target="_blank" href="https://www.youtube.com/watch?v=${vid.link}"><img src="/icons/external_link.svg"></a>`
      vidText += `</div>`;
      vidText += `<iframe class="video-embed" src="https://www.youtube.com/embed/${vid.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    vidText += `</div>`
  })

  page = page.replace("{{unit.videos}}", vidText)

  return page;
}


// function to generate course content
function genCourse(courseSlug, data) {
  let page = courseTemplate;

  const navPath = path.resolve(__dirname, "..", "src", data["nav"] + ".json");
  const navData = JSON.parse(fs.readFileSync(navPath, 'utf-8'));
  const pagePath = courseSlug.split("/")

  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{page.title}}", navData.title);

  let navText = "";
  navData.units.forEach(unit => {
    navText += `<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`;
  })

  if (navData.units.at(-1).hasOwnProperty("lessons")) {
    page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units.at(-1).slug}/${navData.units.at(-1).lessons.at(-1).slug}`);
  } else {
    page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units.at(-1).slug}`)
  }
  
  page = page.replace("{{navigation.next}}", `/${navData.course}/${navData.units[0].slug}`)

  page = page.replace("{{navigation}}", navText);

  page = page.replace("{{course.summary}}", data["summary"])



  const gameData = data["games"]
  let gameText = "";

  gameData.forEach(game => {
    gameText += `<li><a target="_blank" href="${game.link}">${game.title}</a></li>`;
  })

  page = page.replace("{{course.games}}", gameText);

  const linkData = data["links"];
  let linkText = "";

  linkData.forEach(link => {
    linkText += `<li><a target="_blank" href="${link["link"]}">${link.title}</a></li>`
  })

  page = page.replace("{{course.links}}", linkText);

  return page;
}