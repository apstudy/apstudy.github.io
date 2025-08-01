import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, copyFileSync, writeFile, mkdir, read, readFile } from 'fs';
import { resolve, join, dirname, relative } from 'path';
import * as cheerio from 'cheerio';

// read templates from src/template
const templateStart = readFileSync("src/template/start.html", "utf-8");
const templateEnd = readFileSync("src/template/end.html", "utf-8");

const lessonTemplate = templateStart + readFileSync("src/template/lesson.html", "utf-8") + templateEnd;
const unitTemplate = templateStart + readFileSync("src/template/unit.html", "utf-8") + templateEnd;
const courseTemplate = templateStart + readFileSync("src/template/course.html", "utf-8") + templateEnd;

// fetch up-to-date data from the internet
async function fetchData(url) {
    const response = await fetch(url);
    return await response.text();
}

const examDatesPage = cheerio.load(await fetchData("https://apcentral.collegeboard.org/exam-administration-ordering-scores/exam-dates"));
let examDatesTemp = [];
examDatesPage('table.cb-table tbody').each((i, el1) => {
  examDatesPage(el1.children).each((j, el2) => {
    examDatesTemp.push(examDatesPage(el2).html())
  })
})
examDatesTemp = examDatesTemp.filter(el => !el.includes(`colspan="3"`)).map(el => el.replace("<br>"," "))
let examDates = {};
examDatesTemp.forEach((el, i) => {
  const date = cheerio.load("<tr>" + el + "</tr>", null, false);
  let temp = [];
  date("tr > *").each((j, el2) => {
    temp.push(date(el2));
  })
  temp[0] = date(temp[0]).text().trim();
  date(temp[1]).find("p").each((j, el2) => {
    if (date(el2).text().trim() !== "") {
      examDates["AP " + date(el2).text().trim()] = {
        date: temp[0],
        time: "8 a.m."
      }
    }
  })
  date(temp[2]).find("p").each((j, el2) => {
    if (date(el2).text().trim() !== "") {
      examDates["AP " + date(el2).text().trim()] = {
        date: temp[0],
        time: "12 p.m."
      }
    }
  })
})

// set up global courses data
const courses = [
  { title: "AP Biology", slug: "ap-biology" }
]
let navCourses = "";
courses.forEach(({title, slug}) => {
  navCourses += `<li class="item"><a href="/${slug}">${title}</a></li>`
})
const coursesDuration = transitionDuration(courses.length);


// set up global games data
const gamesDuration = transitionDuration(1);


// output directory for all generated files
const outDir = resolve('public');

// ensure the directory exists
if (!existsSync(outDir)) mkdirSync(outDir);



// generate and write unique pages
let aboutPage = templateStart.replace("{{page.title}}", "About");
aboutPage += readFileSync("src/unique/about.html", 'utf-8').replace("{{nav.courses}}", navCourses);
aboutPage += templateEnd;
aboutPage = aboutPage.replace("{{nav.courses.duration}}", coursesDuration).replace("{{nav.games.duration}}", gamesDuration);
writeFileSync(join(outDir, "about.html"), aboutPage);
console.log("Uploaded page: about.html");


let coursePage = templateStart.replace("{{page.title}}", "Courses");
coursePage += readFileSync("src/unique/courses.html", "utf-8").replace("{{nav.courses}}", navCourses);
coursePage += templateEnd;
let coursePageList = "";
courses.forEach(({title, slug}) => {
  coursePageList += `<div class="content-block">`
    coursePageList += `<div class="split-header">`
      coursePageList += `<h2>${title}:</h2>`
      coursePageList += `<a href="/${slug}">Course &rightarrow;</a>`
    coursePageList += `</div>`
    coursePageList += `<p>${JSON.parse(readFileSync("src/" + slug + "/index.json", "utf-8")).summary}</p>`
    coursePageList += `<h3>Exam Date: ${examDates[title].date} at ${examDates[title].time}</h3>`
  coursePageList += `</div>`
})
coursePage = coursePage.replace("{{courses-list}}", coursePageList);
coursePage = coursePage.replace("{{nav.courses.duration}}", coursesDuration).replace("{{nav.games.duration}}", gamesDuration);
writeFileSync(join(outDir, "courses.html"), coursePage);
console.log("Uploaded page: courses.html");



// write each page
courses.forEach(({title, slug}) => {
  const courseDir = resolve("src/" + slug)
  getFiles(courseDir).forEach((filename) => {
    filename = slug + "/" + filename;
    const fullPath = join(outDir, filename.replace(".json", ".html").replace("/index",""));
    const dir = dirname(fullPath);

    // Ensure parent directories exist
    mkdirSync(dir, { recursive: true });

    writeFileSync(fullPath, genGeneric(filename));

    console.log("Uploaded page: " + filename);
  });
});


// copy icons from src/icons to public/icons
const iconsDir = resolve("src/icons")
getFiles(iconsDir).forEach(icon => {
  const srcPath = join(iconsDir, icon)
  const destPath = resolve(outDir, "icons", icon);
  const destDir = dirname(destPath);

  // Ensure destination directory exists
  mkdirSync(destDir, { recursive: true });

  copyFileSync(srcPath, destPath)

  console.log("Uploaded icon: " + icon);
})


// copy stylesheets from src/css to public/css
const stylesheetsDir = resolve("src/css")
getFiles(stylesheetsDir).forEach(css => {
  const srcPath = join(stylesheetsDir, css)
  const destPath = resolve(outDir, "css", css);
  const destDir = dirname(destPath);

  // Ensure destination directory exists
  mkdirSync(destDir, { recursive: true });

  copyFileSync(srcPath, destPath)

  console.log("Uploaded stylesheet: " + css);
})


// copy scripts from src/css to public/css
const scriptsDir = resolve("src/js")
getFiles(scriptsDir).forEach(js => {
  const srcPath = join(scriptsDir, js)
  const destPath = resolve(outDir, "js", js);
  const destDir = dirname(destPath);

  // Ensure destination directory exists
  mkdirSync(destDir, { recursive: true });

  copyFileSync(srcPath, destPath)

  console.log("Uploaded script: " + js);
})


// origin point of generate functions
function genGeneric(filename) {
  const slug = filename.replace(".json", "").replace("/index", "");
  const data = JSON.parse(readFileSync("src/" + filename, 'utf-8'));

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

  const pagePath = lessonSlug.split("/");
  const navPath = resolve("src/nav", pagePath[0] + ".json");
  const navData = JSON.parse(readFileSync(navPath, 'utf-8'));

  page = page.replace("{{nav.courses}}", navCourses)
  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{unit.slug}}", pagePath[1]);
  page = page.replaceAll("{{lesson.slug}}", pagePath[2]);

  let navText = [];
  navData.units.forEach((unit, unitIdx) => {
    navText.push(`<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`);
    if (unit.slug === pagePath[1] && unit.hasOwnProperty("lessons")) {
      unit.lessons.forEach((lesson, lessonIdx) => {
        if (lesson.slug === pagePath[2]) {
          navText.push(`<li class="sub-item side-nav-current"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`);
          
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
          navText.push(`<li class="sub-item"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`);
        }
      })
    }
  })

  page = page.replace("{{navigation}}", navText.join(""));
  page = page.replace("{{nav.course.duration}}", transitionDuration(navText.length));

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
  let moreVidText = "";

  vidData.forEach(vid => {
    if (vid.hasOwnProperty("more") && vid["more"]) {
      moreVidText += genVideo(vid.title, vid.link, vid.more)
    } else {
      vidText += genVideo(vid.title, vid.link)
    }
  })

  if (moreVidText) {
    moreVidText = `<div class="more-container"><div>${moreVidText}</div></div>`
    moreVidText += `<button class="more-btn"><span class="more">&darr; More Videos &darr;</span><span class="less">&uarr; Less Videos &uarr;</span></button>`
  }

  page = page.replace("{{lesson.videos}}", vidText)
  page = page.replace("{{lesson.more-videos}}", moreVidText)

  page = page.replace("{{nav.courses.duration}}", coursesDuration).replace("{{nav.games.duration}}", gamesDuration);

  return page;
}


// function to generate unit content
function genUnit(unitSlug, data) {
  let page = unitTemplate;

  const pagePath = unitSlug.split("/");
  const navPath = resolve("src/nav", pagePath[0] + ".json");
  const navData = JSON.parse(readFileSync(navPath, 'utf-8'));

  page = page.replace("{{nav.courses}}", navCourses)
  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{unit.slug}}", pagePath[1]);

  page = page.replaceAll("{{course.ced}}", navData.ced)

  let navText = [];
  navData.units.forEach((unit, unitIdx) => {
    if (unit.slug === pagePath[1]) {
      navText.push(`<li class="item side-nav-current"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`);
      if (unit.hasOwnProperty("lessons")) {
        unit.lessons.forEach(lesson => {
          navText.push(`<li class="sub-item"><a href="/${navData.course}/${unit.slug}/${lesson.slug}">${lesson.prefix}: ${lesson.title}</a></li>`);
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
      navText.push(`<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`);
    }
  })

  page = page.replace("{{navigation}}", navText.join(""));
  page = page.replace("{{nav.course.duration}}", transitionDuration(navText.length));

  page = page.replace("{{unit.summary}}", data["summary"])


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
  let moreVidText = "";

  vidData.forEach(vid => {
    if (vid.hasOwnProperty("more") && vid["more"]) {
      moreVidText += genVideo(vid.title, vid.link, vid.more)
    } else {
      vidText += genVideo(vid.title, vid.link)
    }
  })

  if (moreVidText) {
    moreVidText = `<div class="more-container"><div>${moreVidText}</div></div>`
    moreVidText += `<button class="more-btn"><span class="more">&darr; More Videos &darr;</span><span class="less">&uarr; Less Videos &uarr;</span></button>`
  }

  page = page.replace("{{unit.videos}}", vidText)
  page = page.replace("{{unit.more-videos}}", moreVidText)

  page = page.replace("{{nav.courses.duration}}", coursesDuration).replace("{{nav.games.duration}}", gamesDuration);

  return page;
}


// function to generate course content
function genCourse(courseSlug, data) {
  let page = courseTemplate;

  const pagePath = courseSlug.split("/");
  const navPath = resolve("src/nav", pagePath[0] + ".json");
  const navData = JSON.parse(readFileSync(navPath, 'utf-8'));

  page = page.replace("{{nav.courses}}", navCourses)
  page = page.replaceAll("{{course.title}}", navData.title)
  page = page.replaceAll("{{course.slug}}", pagePath[0]);
  page = page.replaceAll("{{page.title}}", navData.title);

  let navText = [];
  navData.units.forEach(unit => {
    navText.push(`<li class="item"><a href="/${navData.course}/${unit.slug}">${unit.prefix}: ${unit.title}</a></li>`);
  })

  if (navData.units.at(-1).hasOwnProperty("lessons")) {
    page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units.at(-1).slug}/${navData.units.at(-1).lessons.at(-1).slug}`);
  } else {
    page = page.replace("{{navigation.previous}}", `/${navData.course}/${navData.units.at(-1).slug}`)
  }
  
  page = page.replace("{{navigation.next}}", `/${navData.course}/${navData.units[0].slug}`)

  page = page.replace("{{navigation}}", navText.join(""));
  page = page.replace("{{nav.course.duration}}", transitionDuration(navText.length));

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

  page = page.replace("{{course.exam-date}}", examDates[navData.title].date + " at " + examDates[navData.title].time);

  page = page.replace("{{nav.courses.duration}}", coursesDuration).replace("{{nav.games.duration}}", gamesDuration);

  return page;
}

function genVideo(title, link, more = false) {
  return `<div class="video-container"><div class="video-header"><h3>${title}</h3><a target="_blank" href="https://www.youtube.com/watch?v=${link}"></a></div>${more ? genMoreVideoEmbed(link) : genVideoEmbed(link)}</div>`
}

function genVideoEmbed(link) {
  return `<iframe class="video-embed" src="https://www.youtube-nocookie.com/embed/${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function genMoreVideoEmbed(link) {
  return `<iframe class="video-embed unloaded" data-src="https://www.youtube-nocookie.com/embed/${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function getFiles(dir) {
  let results = [];

  const entries = readdirSync(dir, {withFileTypes: true, recursive: true});

  entries.forEach(i => {
    if (i.isDirectory()) return;
    results.push(relative(dir, resolve(i.parentPath, i.name)));
  })

  return results;
}

function transitionDuration(itemCount) {
  return (0.47 + 0.03*itemCount) + "s";
}