let moves = 0

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let items = [
    {"id":1, "innerHTML": "1"},
    {"id":2, "innerHTML": "2"},
    {"id":3, "innerHTML": "3"},
    {"id":4, "innerHTML": "4"},
]

randomizedItems = shuffle(items)

let domRows = Array.from(document.getElementsByClassName("row"))

let getContentForId = itemId => itemId

let prepareItem = col => {
    let span = col.children[0]
    span.innerHTML = getContentForId(span.id)

    col.addEventListener('dragstart', function(e) {
      if(this.classList.contains("col")) moves++
      
      this.classList.remove('col');
      this.classList.add('col-drag');
      let item = this.children[0]
      item.classList.remove('item-hidden');
      item.classList.add('item');

      e.dataTransfer.effectAllowed = 'move';

        
      let dataToTransfer = {
          row: this.dataset["row"],
          id: item.id
      }

      e.dataTransfer.setData("text/plain", JSON.stringify(dataToTransfer));

    }, false)

    col.addEventListener('dragend', function(e) {
      this.classList.add('col');
      this.classList.remove('col-drag');
      let item = this.children[0]
      item.classList.remove('item');
      item.classList.add('item-hidden');
    }, false)

    col.addEventListener('dragover', function(e) {
      if (e.preventDefault) e.preventDefault() // Necessary. Allows us to drop.

      return false;
    }  , false)
}

let createTile = (data)=>{
    let row = data.row
    let id = data.id

    let div = document.createElement("div")
    div.classList.add("col")
    div.dataset["row"] = row
    div.draggable = true
    let span = document.createElement("span")
    span.classList.add("item-hidden")
    span.id = id

    div.appendChild(span)
    prepareItem(div)
    return div
}


let verifyVictory = () => {
    for(domRow of domRows){
        let tiles = Array.from(domRow.children)
        if((tiles.length - 2) == randomizedItems.length){
            for(let i=1; i < tiles.length-2; i++){
                let previous = parseInt(tiles[i].children[0].id)
                let next = parseInt(tiles[i+1].children[0].id)
                if(previous > next) return;
            }
            alert("Victory in "+moves+" moves")
        }
    }
}

let firstRowStart = domRows[0].children[0]
for(randomizedItem of randomizedItems){
    domRows[0].insertBefore(createTile({row: 1,id: randomizedItem.id}), firstRowStart.nextSibling)
}

Array.from(document.getElementsByClassName("col")).forEach(prepareItem);


Array.from(document.getElementsByClassName("col-start-hidden")).forEach( col => {

    col.addEventListener('dragenter', function(e) {
      if (e.preventDefault) e.preventDefault() // Necessary. Allows us to drop.
      this.classList.remove('col-start-hidden');
      this.classList.add('col-start');
    }, false)

    col.addEventListener('dragleave', function(e) {
        if (e.preventDefault) e.preventDefault() // Necessary. Allows us to drop.
      this.classList.remove('col-start');
      this.classList.add('col-start-hidden');
    }, false)

    col.addEventListener('dragover', function(e) {
      if (e.preventDefault) e.preventDefault()
      return false;
    }  , false)

    col.addEventListener('drop', function(e) {
        this.classList.remove('col-start');
        this.classList.add('col-start-hidden');
        let oldTileInfo = JSON.parse(e.dataTransfer.getData('text/plain'))

        document.getElementById(oldTileInfo.id).parentElement.remove();
        let newTile = createTile(oldTileInfo)
        this.parentElement.insertBefore(newTile, this.nextSibling)
        verifyVictory()
    }, false)
});

Array.from(document.getElementsByClassName("col-end-hidden")).forEach( col => {
    
    col.addEventListener('dragenter', function(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }
      this.classList.remove('col-end-hidden');
      this.classList.add('col-end');
    }, false)

    col.addEventListener('dragleave', function(e) {
      this.classList.remove('col-end');
      this.classList.add('col-end-hidden');
    }, false)

    col.addEventListener('dragover', function(e) {
      if (e.preventDefault) e.preventDefault()
      return false;
    }  , false)

    col.addEventListener('drop', function(e) {
      this.classList.remove('col-end');
      this.classList.add('col-end-hidden');
      let oldTileInfo = JSON.parse(e.dataTransfer.getData('text/plain'))
      document.getElementById(oldTileInfo.id).parentElement.remove();
      let newTile = createTile(oldTileInfo)
      this.parentElement.insertBefore(newTile, this)
      verifyVictory()
    }, false)
    
});