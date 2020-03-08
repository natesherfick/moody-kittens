let currentKitten = {}
/** 
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()


/** ADD
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.name.value

  currentKitten = kittens.find(kitten => kitten.name == kittenName)

  if (!currentKitten) {
    let kitten = {
      id: generateId(),
      name: kittenName,
      mood: "Tolerant",
      affection: 5,
    }
    kittens.push(kitten)
    saveKittens()
  }

  form.reset()
  drawKittens()
}

/** SAVE
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}



/** LOAD
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**DRAW
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  kittens.forEach(kitten => {
    template +=
      `<div class="card container setBox">
<div class="kitten ${kitten.mood}">
<img src="https://robohash.org/${kitten.name}?set=set4">
</div>
<div class="name-font">Name: ${kitten.name}</div>
<div>Mood: ${kitten.mood}</div>
<div>Affection: ${kitten.affection}</div>
<div id="${kitten.mood}" class="mt-1 d-flex space-around">
<button onclick="pet(${kitten.id})">Pet</button>
<button onclick="catnip(${kitten.id})">Catnip</button>
</div>
</div>`
  })

  document.getElementById("kitties").innerHTML = template
}
/** FIND
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id)
  let petNumber = Math.random()

  if (petNumber <= 0.7) {
    kitten.affection -= 1
  } else {kitten.affection += 1}

  if (kitten.affection >6){kitten.mood = "Happy"}

  if (kitten.affection <=6 && kitten.affection >= 4){kitten.mood = "Tolerant"}

  if (kitten.affection <= 3 && kitten.affection > 0){kitten.mood = "Angry"}

  if (kitten.affection < 1){
    kitten.mood = "Gone"    
  }
 
  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  kitten.mood = "Tolerant"

  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) { }

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("name-bar").classList.remove("hidden")

  drawKittens();
}

function deleteKittens() {
  kittens = []
  saveKittens()
  drawKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000).toString()
    // +
    // "-" +
    // Math.floor(Math.random() * 10000000)
  );
}

