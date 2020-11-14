// Dynamically add year to footer copyright
const date = new Date();

document.querySelector("#copyright").textContent += ` ${date.getFullYear()}`;

// Attach "click" event listener to the logo in order to redirect to home
document.querySelectorAll(".logo").forEach(element => element.addEventListener("click", redirectToIndexHtml));

function redirectToIndexHtml() {
  window.location.href = "./index.html";
}

// Highlight current page link in menu
const currentHtmlFileName = window.location.pathname.split("/").pop().replace(".html", "");
const linkOfCurrentPage = document.querySelectorAll(`.${currentHtmlFileName}`);
linkOfCurrentPage.forEach(link => link.style.color = "#252422");

const menuIcon = document.querySelector("#menu-icon");

// Select all anchors in the "#anchor-tags" div
const menuLinkArrayMobile = document.querySelectorAll("#anchor-tags a");

const menuLinkArrayLeft = document.querySelectorAll("#anchor-tags-left a");
const menuLinkArrayRight = document.querySelectorAll("#anchor-tags-right a");;

// Attach "click" event listener to the menu hamburger icon in order execute "animateMenuIconClick" function
const menuButton = document.querySelector("#menu-icon");
menuButton.addEventListener("click", () => animateMenuIconClick("mobile"));

function animateMenuIconClick(sourceOfCall) {

  if (sourceOfCall === "mobile"){

    if (!desktopMenuLockedOpen){
      desktopMenuLockedOpen = true;
      desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
    } else {
      desktopMenuLockedOpen = false;
      desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
    }

    animateDesktopMenu("mobile");
  }

  // Toggle css class to cross outer lines and make inner one transparent
  menuIcon.classList.toggle("animate-menu-icon");

  // "If" regarding whether to animate menu expansion or closure
  if (menuIcon.classList.contains("animate-menu-icon")) {

    document.body.classList.toggle("hide-overflow");

    menuIcon.classList.toggle("push-menu-button-top");

    // Remove "click" event listener from logo
    document.querySelector("#logo-mobile").removeEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo-mobile").style.cursor = "default";

    // Make header elements transparent (didn't use z-index = -1 etc. because of conflict with hamburger icon disappearing)
    document.querySelector("#logo-mobile").style.opacity = 0;
    document.querySelector("#page-title-info-mobile").style.opacity = 0;
    document.querySelector("#mobile-tablet-header").style.backgroundColor = "#EB5E28";

    // Expand menu orange background from top
    document.querySelector("#side-menu").style.top = 0;

    // Expand "#anchor-tags" div from left
    // (has to be hidden when menu not in use, otherwise clicking on the screen is obscured by the transparent div)
    document.querySelector("#anchor-tags").style.left = 0;

    document.querySelector("#anchor-tags-left").style.left = 0;
    document.querySelector("#anchor-tags-right").style.left = "50vw";
   
    // Animate each of the menu links from the left
    menuLinkArrayMobile.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "8vw", index * 70);
    });

    menuLinkArrayLeft.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "12vw", index * 140);
    });

    menuLinkArrayRight.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "12vw", index * 140);
    });

  } else {

    document.body.classList.toggle("hide-overflow");

    menuIcon.classList.toggle("push-menu-button-top");

    // Add "click" event listener to logo enabling redirection to home
    document.querySelector("#logo-mobile").addEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo-mobile").style.cursor = "pointer";

    // Make header opaque
    document.querySelector("#logo-mobile").style.opacity = "100%";
    document.querySelector("#page-title-info-mobile").style.opacity = "100%";
    document.querySelector("#mobile-tablet-header").style.backgroundColor = "#252422";

    // Hide menu background
    document.querySelector("#side-menu").style.top = "-100vh";

    // Hide "#anchor-tags" div
    document.querySelector("#anchor-tags").style.left = "-100vw";

    document.querySelector("#anchor-tags-left").style.left = "-50vw";
    document.querySelector("#anchor-tags-right").style.left = "100vw";

    // Hide menu links
    menuLinkArrayMobile.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 40);
    });

    menuLinkArrayLeft.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 80);
    });

    menuLinkArrayRight.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 80);
    });
  }
}

let desktopMenuOpen = false;

let desktopMenuLockedOpen = false;
let desktopMenuButtonAreaEntered = false;
let desktopMenuLinkAreaEntered = false;

const desktopMenuButton = document.querySelector("#menu-desktop-icon");
const desktopMenuButtonH1 = document.querySelector("#menu-desktop-inner h1");
const desktopMenuButtonArrowElementsArray = document.querySelectorAll("#menu-desktop-arrow *");
const desktopMenuLinkArea = document.querySelector("#menu-desktop-anchor-tags");
const desktopMenuAnchorTagsArray = document.querySelectorAll("#menu-desktop-anchor-tags-inner a");

function buttonClick(){
  if (!desktopMenuLockedOpen){

    desktopMenuLockedOpen = true;

    if (!desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
    desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
    desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
    desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
    desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
    clearTimeout(attachEventListenersTimeoutFunction);
  } else {
    desktopMenuLockedOpen = false;
    animateDesktopMenu("desktop");

    var attachEventListenersTimeoutFunction = setTimeout(() => {
      desktopMenuButtonAreaEntered = false;
      desktopMenuLinkAreaEntered = false;
      desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
    }, 400);
  }
}

function linkAreaClick() {
  desktopMenuLockedOpen = true;

  desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
  desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
  desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
  desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
}

function buttonMouseEnter() {
  desktopMenuButtonAreaEntered = true;
  if (!desktopMenuLinkAreaEntered && !desktopMenuOpen){
    animateDesktopMenu("desktop");
  }
}

function buttonMouseLeave() {
  setTimeout(() => {
    desktopMenuButtonAreaEntered = false;
    if (!desktopMenuLinkAreaEntered && desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
  }, 1);
}

function linkAreaMouseEnter() {
  desktopMenuLinkAreaEntered = true;
  if (!desktopMenuButtonAreaEntered && !desktopMenuOpen){
    animateDesktopMenu("desktop");
  }
}

function linkAreaMouseLeave() {
  setTimeout(() => {
    desktopMenuLinkAreaEntered = false;
    if (!desktopMenuButtonAreaEntered && desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
  }, 1);
}

desktopMenuButton.addEventListener("click", buttonClick);
desktopMenuLinkArea.addEventListener("click", linkAreaClick);
desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);

document.querySelector("#desktop-header").addEventListener("click", (evt) => {
  if (evt.target.getAttribute("id") !== "menu-desktop-icon" && evt.target.getAttribute("id") !== null){
    closeMenuClickOutsideDesktopMenu();
  }
});

document.querySelector("main").addEventListener("click", closeMenuClickOutsideDesktopMenu);

function closeMenuClickOutsideDesktopMenu() {
  if (desktopMenuOpen){
    animateDesktopMenu("desktop");
    desktopMenuLockedOpen = false;
    desktopMenuButtonAreaEntered = false;
    desktopMenuLinkAreaEntered = false;
    desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
    desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
    desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
    desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
  }
}

function animateDesktopMenu(sourceOfCall) {

  desktopMenuOpen = !desktopMenuOpen;

  if (sourceOfCall === "desktop"){
    animateMenuIconClick("desktop");
  }

  if (desktopMenuOpen){
    desktopMenuButtonArrowElementsArray.forEach(line => {
      line.style.transform = "scale(0.5, 1)";
      line.style.backgroundColor = "#403d39";
      setTimeout(() => {
        line.style.transform = "";
        line.classList.add("animate-menu-desktop-icon");
      }, 150);
    });

    desktopMenuLinkArea.style.top = 0;
    desktopMenuButton.style.backgroundColor = "#eb5e28";
    desktopMenuButtonH1.style.color = "#403d39";

    desktopMenuAnchorTagsArray.forEach((link, index) => {
      setTimeout(() => link.style.marginTop = 0, index * 60 + 10);
    });

  } else {

    desktopMenuButtonArrowElementsArray.forEach(line => {
      line.style.transform = "scale(0.5, 1)";
      line.style.backgroundColor = "#ccc5b9";
      setTimeout(() => {
        line.style.transform = "";
        line.classList.remove("animate-menu-desktop-icon");
      }, 100);
    });

    desktopMenuLinkArea.style.top = "";
    desktopMenuButton.style.backgroundColor = "";
    desktopMenuButtonH1.style.color = "#ccc5b9";
  }

  desktopMenuAnchorTagsArray.forEach((link, index) => {
    setTimeout(() => link.style.marginTop = "", index * 30);
  });
};