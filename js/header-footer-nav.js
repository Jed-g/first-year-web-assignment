// Dynamically add year to footer copyright
const date = new Date();

document.querySelector("#copyright").textContent = `© Jedrzej Golebiewski ${date.getFullYear()}`;

// Attach "click" event listener to the logo in order to redirect to home
document.querySelector("#logo").addEventListener("click", redirectToIndexHtml);

function redirectToIndexHtml() {
  window.location.href = "./index.html";
}

// Highlight current page link in menu
const currentHtmlFileName = window.location.pathname.split("/").pop().replace(".html", "");
const linkOfCurrentPage = document.querySelector(`#${currentHtmlFileName}`);
linkOfCurrentPage.style.color = "#252422";

// Select all anchors in the "#anchor-tags" div
const menuLinkArray = document.querySelectorAll("#anchor-tags a");

// Attach "click" event listener to the menu hamburger icon in order execute "animateMenuIconClick" function
const menuButton = document.querySelector("#menu-icon");
menuButton.addEventListener("click", animateMenuIconClick);

function animateMenuIconClick() {

  // Toggle css class to cross outer lines and make inner one transparent
  this.classList.toggle("animate-menu-icon");

  // "If" regarding whether to animate menu expansion or closure
  if (this.classList.contains("animate-menu-icon")) {

    // Prevent scrolling of page
    document.body.style.overflow = "hidden";

    // Remove "click" event listener from logo
    document.querySelector("#logo").removeEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo").style.cursor = "default";

    // Make header elements transparent (didn't use z-index = -1 etc. because of conflict with hamburger icon disappearing)
    document.querySelector("#logo").style.opacity = 0;
    document.querySelector("#page-title-info").style.opacity = 0;
    document.querySelector("header").style.backgroundColor = "#EB5E28";

    // Expand menu orange background from top
    document.querySelector("#side-menu").style.top = 0;

    // Expand "#anchor-tags" div from left
    // (has to be hidden when menu not in use, otherwise clicking on the screen is obscured by the transparent div)
    document.querySelector("#anchor-tags").style.left = 0;
   
    // Animate each of the menu links from the left
    menuLinkArray.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "8%", index * 70);
    });

  } else {

    // Enable scrolling of page
    document.body.style.overflow = "visible";

    // Add "click" event listener to logo enabling redirection to home
    document.querySelector("#logo").addEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo").style.cursor = "pointer";

    // Make header opaque
    document.querySelector("#logo").style.opacity = "100%";
    document.querySelector("#page-title-info").style.opacity = "100%";
    document.querySelector("header").style.backgroundColor = "#252422";

    // Hide menu background
    document.querySelector("#side-menu").style.top = "-100vh";

    // Hide "#anchor-tags" div
    document.querySelector("#anchor-tags").style.left = "-100vw";

    // Hide menu links
    menuLinkArray.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "-200%", index * 40);
    });

  }
}
