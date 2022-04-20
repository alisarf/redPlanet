/** Random User Generator
 * Dynamically fills into home.html fake user profiles.
 * api-generate-sug fills in the suggested friends column
 * api-generate-wrapper fills in anywhere comments are needed on feed
 * requires web server to stop CORS errors
 */

const url_userGen = "https://randomuser.me/api/?format=json";
let user_node_sug = document.getElementsByClassName("api-generate-sug");
let user_node_wrap = document.getElementsByClassName("api-generate-wrapper");

fillApi(user_node_sug, false);
fillApi(user_node_wrap, true);

function fillApi(user_node, section) {
  Array.from(user_node).forEach((node) => {
    if (section == true) {
      for (let i = 1; i <= node.dataset.randomUser; i++) {
        let target = document.createElement("section");
        target.classList.add("homeGrid__col--card", "api-generate-user");

        fetchData(url_userGen).then((data) => {
          target.innerHTML = buildComment(data.results[0]);
        });
        node.appendChild(target);
      }
    } else {
      let user_name = node.querySelector(".api-username");
      let user_icon = node.querySelector(".icon__user");

      fetchData(url_userGen).then((data) => {
        let user = data.results[0];
        user_name.innerHTML = `${user.name.first} ${user.name.last}`;
        user_icon.src = user.picture.thumbnail;
      });
    }
  });
}

var comments = [
  "Look out for meteor showers tonight guys! Woo! &#x1F320",
  "A true space odyssey: it's been 20 years since our Mars Odyssey spacecraft entered orbit around the Red Planet.",
  "I hate it when people say Space Exploration is a waste of money &#x1F624",
  "I'm at the Southern Launch Site rn. 1hr till take off! &#x1F60a",
  "Guys, the 25th cycle is upon us, and it brings more opportunities to see the northern lights.",
  '“Across the sea of space, the stars are other suns."  - Carl Sagan.',
  "“Part of life's mystery depends on future possibilities, and mystery is an elusive quality which evaporates when sampled frequently, to be followed by boredom. \" – Michael Collins.",
  "Did anyone see the space debri that fell last night over the bay? &#x1F603	",
];

function buildComment(user) {
  let feedcomment = `
    <div class="generate-user">
        <img class="icon__user" src="${user.picture.thumbnail}" alt="">
        <h2 class="api-username">${user.name.first} ${user.name.last}</h2>
    </div>        
    <p class="api-text">${comments[getRandomInt(comments.length - 1)]}</p>
    <button class="btn__primary">Reply</button>
    <span class="timestamp">${getRandomInt(20)} hrs</span>`;
  return feedcomment;
}
