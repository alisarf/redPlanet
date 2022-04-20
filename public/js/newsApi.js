/** API NEWS ARTICLE REQUEST
 * query for all .apiArticles and find the dataset value to
 * determine how many articles will be added into the tag. I used modular op
 * to determine if an article would contain a photo and/or be split into 2 article
 * per section to add visual variation */

var apiArticle = document.querySelectorAll(".apiArticles");
const url_spaceNews = "https://api.spaceflightnewsapi.net/v3/articles";

fetchData(url_spaceNews).then((data) => {
  for (const section of apiArticle) {
    //# of articles needed, set in html file
    let reps = section.dataset.articleCount;

    for (let a = 0; a < reps; a++) {
      //add pic and/or split options for visual variation
      let pic = a % 3 == 0 ? false : true;
      let split = a % 5 == 0 ? true : false;

      //build and append article
      let elnode = articleBuilder(data, pic, split);
      section.appendChild(elnode);
    }
  }
});

//Build article into HTML node
const articleBuilder = (data, pic = true, split = true) => {
  let i = getRandomInt(8); //get diff. return api data

  let art = document.createElement("section");
  art.classList.add("apiArticle");

  //HTML Template
  const temp_basic = (i) => {
    let basic = `
      <div>
        <a href='${data[i].url}'><h3>${data[i].title}</h3><a/>
          ${
            //add a pic option
            pic == true
              ? `<a href='${data[i].url}'><img src="${data[i].imageUrl}" alt=""><a/>`
              : ` `
          }
        <p class='text_overflow'>${data[i].summary}</p>
      </div>`;
    return basic;
  };

  //Two articles per section tag option
  const temp_split = (split) => {
    if (split == false) {
      return temp_basic(i);
    } else {
      let temp_split = temp_basic(i) + temp_basic(i + 1);
      art.classList.add("temp_split");
      return temp_split;
    }
  };

  art.innerHTML = temp_split(split);
  return art;
};
