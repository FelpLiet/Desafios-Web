document.querySelector(".container").addEventListener("mouseover", function () {
  document.body.classList.add("blur");
});

document.querySelector(".container").addEventListener("mouseout", function () {
  document.body.classList.remove("blur");
});
