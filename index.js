//  https://botw-compendium.herokuapp.com/api/v2
//  API ^^^^
const objectListEl = document.querySelector(".object-list");


async function main() {
  const objects = await fetch("https://botw-compendium.herokuapp.com/api/v2")
  const objectsData = await objects.json();
  const dataArr = pushDataToArr(objectsData.data);

  //Variable with sorted array
  const sortedData = dataArr.sort((a,z)=> a.id - z.id);
  console.log(sortedData)
  //Logic that turns sorted array into html
  objectListEl.innerHTML = (sortedData.map(data => objectHTML(data)).join(""));
  
  console.log("This ran 3")
  return dataArr.sort((a, z) => a.id - z.id);

}

main();


//checking if the class is an array. If it is, it stores in arrStore, if not it turns the object into an array, then stores it.
function pushDataToArr(data, arrStore = []) {
  for (const category in data) {
    if (data[category] instanceof Array) {
      for (let i = 0; i < data[category].length; i++){
        arrStore.push(data[category][i]);
      }
    }
    else if (data[category] instanceof Object){
      pushDataToArr(data[category], arrStore);
    }
  }
  return arrStore;
}


function objectHTML(data){
  console.log("this ran 2")
  return `<div class="object-card">
    <div class="object-card__container">

      <h3 class="object__name">${data.name}</h3>
      <img class="object__img" src="${data.image}">
      <p><b class="object__headers">Category: </b>${data.category}</p>
      <p><b class="object__headers">Common Locations: </b>${data.common_locations}</p>
      <p><b class="object__headers">Descrption: </b>${data.description}</p>

      ${data.cooking_effect && `<p><b class="object__headers">Cooking Effect: </b>${data.cooking_effect}</p>`}
      ${data.hearts_recovered && `<p><b class="object__headers">Hearts Recovered: </b>${data.hearts_recovered}</p>`}

      ${data.drops && `<p><b class="object__headers">Drops: </b>${data.drops}</p>`}

      ${data.attack && `<p><b class="object__headers">Attack: </b>${data.attack}</p>`}
      ${data.defence && `<p><b class="object__headers">Defence: </b>${data.defence}</p>`}
    </div>
  </div>`;
}