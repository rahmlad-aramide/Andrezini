const cookieContainer = document.querySelector(".cookie-container");
const agreeBtn = document.querySelector(".agree button");

setTimeout(() => {
  cookieContainer.classList.remove("hide");
}, 1000);

agreeBtn.addEventListener("click", () => {
  cookieContainer.classList.add("hide");
});