/** Random User Generator
 * Dynamically fills into home.html fake user profiles.
 * api-generate-sug fills in the suggested friends column
 * apiRandomUser fills in anywhere comments are needed on feed
 * CORS error on multiple api fetches -> make one large request
 */

//get data from api for 100 people
const url_userGenMult = "https://randomuser.me/api/?results=100";
let user_node_sug = document.getElementsByClassName("api-generate-sug");
let user_node_wrap = document.getElementsByClassName("apiRandomUser");

const getPerson = async (user_node, section) => {
  let people;
  await fetch(url_userGenMult)
    .then((result) => result.json())
    .then((data) => {
      people = data;
    });

  Array.from(user_node).forEach((node) => {
    //does section need comment or just name/image?
    if (section == true) {
      for (let i = 1; i <= node.dataset.randomUser; i++) {
        let feedPost = document.createElement("section");
        feedPost.classList.add("homeGrid__col--card", "api-generate-user");
        feedPost.innerHTML = buildComment(people.results[getRandomInt(99)]);
        node.appendChild(feedPost);
      }
    } else {
      let user_name = node.querySelector(".api-username");
      let user_icon = node.querySelector(".icon__user");
      let user = people.results[getRandomInt(99)];
      user_name.innerHTML = `${user.name.first} ${user.name.last}`;
      user_icon.src = user.picture.thumbnail;
    }
  });
};

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
  //give user data -> return html section
  let feedcomment = `
    <div class="generate-user">
        <div class='generate-user-halo'><img class="icon__user icon__md" src="${
          user.picture.thumbnail
        }" alt=""></div>
        <h2 class="api-username">${user.name.first} ${user.name.last}</h2>
    </div>        
    <p class="api-text">${comments[getRandomInt(comments.length - 1)]}</p>
    <div class='generate-user__lowWrap'>
    <span class='generate-user__lowWrap--likes'>
    <img src='./images/like-svgrepo-com.svg' class='increment icons_likes_thumb'/>
    <img src='./images/favourite-svgrepo-com.svg' class='increment icons_likes_award'/>
    <img src='./images/heart-svgrepo-com.svg' class='increment icons_likes_heart'/>
    <p> ${getRandomInt(1000)}</p>
    </span>
    <span class='btn__gradient'><button class="btn__primary">Reply</button></span></div>
    <span class="timestamp">${getRandomInt(20)} h ago</span>`;
  return feedcomment;
}

getPerson(user_node_sug, false);
getPerson(user_node_wrap, true);
