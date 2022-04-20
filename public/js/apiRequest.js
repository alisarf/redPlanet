//API REQUEST
async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

//Get random integer
const getRandomInt = (max) => {
  let i = Math.random() * (max - 0) + 0;
  i = Math.ceil(i);
  return i;
};
