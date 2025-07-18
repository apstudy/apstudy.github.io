const html = document.documentElement;

let sideNavStatus = localStorage.getItem("sideNavStatus") || "open";

if (this.window.innerWidth <= 1200) sideNavStatus = 'closed';

if (sideNavStatus === "closed") html.classList.add("side-nav-closed");

window.addEventListener("DOMContentLoaded", function() {
  requestAnimationFrame(function() {
    document.documentElement.classList.remove("no-transition");
  })
  document.querySelector(".side-nav-btn").addEventListener("click", () => {
    html.classList.toggle('side-nav-closed');
    sideNavStatus = sideNavStatus === 'open' ? 'closed' : 'open';
    localStorage.setItem('sideNavStatus', sideNavStatus);
  })
})