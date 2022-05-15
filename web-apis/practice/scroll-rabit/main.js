const rabbitBtn = document.querySelector(".rabbit_btn");
const rabbit = document.querySelector("img[src='rabbit.png']");

rabbitBtn.addEventListener("click", (e) => {
  rabbit.scrollIntoView({ behavior: "smooth", block: "center" });
});
