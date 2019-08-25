let domRows = Array.from(document.getElementsByClassName("row"))

let getContentForId = itemId => itemId

const tileCount = 5

let prepareItem = col => {
    let span = col.children[0]
    span.innerHTML = getContentForId(span.id)

    col.addEventListener('dragstart', function(e) {
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
        if((tiles.length - 2) == tileCount){
            for(let i=1; i < tiles.length-2; i++){
                if(tiles[i] > tiles[i+1]) return;
            }
            alert("Victory")
        }
    }
}

let firstRowStart = domRows[0].children[0]
for(let i= 1; i <= tileCount; i++){
    domRows[0].insertBefore(createTile({row: 1,id: i}), firstRowStart.nextSibling)
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