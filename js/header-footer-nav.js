const date = new Date();

document.querySelector(
  "#copyright"
).textContent = `© Jedrzej Golebiewski ${date.getFullYear()}`;

document.querySelector("#logo").addEventListener("click", redirectToIndexHtml);

function redirectToIndexHtml() {
  window.location.href = "./index.html";
}

const menuButton = document.querySelector("#menu-icon");
menuButton.addEventListener("click", animateMenuIconClick);

const currentHtmlFileName = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");
const linkOfCurrentPage = document.querySelector(`#${currentHtmlFileName}`);
linkOfCurrentPage.style.color = "#252422";

const menuLinkArray = document.querySelectorAll("#anchor-tags a");

function animateMenuIconClick() {
  this.classList.toggle("animate-menu-icon");
  if (this.classList.contains("animate-menu-icon")) {
    document.querySelector("#side-menu").style.top = 0;
    document.querySelector("#anchor-tags").style.left = 0;
    document.querySelector("#logo").style.opacity = 0;
    document.querySelector("#page-title-info").style.opacity = 0;
    document.querySelector("header").style.backgroundColor = "#EB5E28";
    document
      .querySelector("#logo")
      .removeEventListener("click", redirectToIndexHtml);

    for (let i = 0; i < menuLinkArray.length; i++) {
      setTimeout(() => (menuLinkArray[i].style.marginLeft = "8%"), i * 70);
    }
  } else {
    document
      .querySelector("#logo")
      .addEventListener("click", redirectToIndexHtml);
    document.querySelector("#side-menu").style.top = "-100vh";
    document.querySelector("#anchor-tags").style.left = "-100vw";
    document.querySelector("#logo").style.opacity = "100%";
    document.querySelector("#page-title-info").style.opacity = "100%";
    document.querySelector("header").style.backgroundColor = "#252422";
    for (let i = 0; i < menuLinkArray.length; i++) {
      setTimeout(() => (menuLinkArray[i].style.marginLeft = "-200%"), i * 40);
    }
  }
}
