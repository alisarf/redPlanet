/*
 * Clicking on any like icons will increment
 * the total count and flash blue color
 */
(function timer() {
  setTimeout(function () {
    let likes = document.getElementsByClassName("increment");
    for (const likeEvent of likes) {
      likeEvent.addEventListener("click", function (e) {
        let str = likeEvent.parentNode.querySelector("p");
        str.innerHTML = parseInt(str.textContent) + 1;
      });
    }
  }, 1000);
})();
