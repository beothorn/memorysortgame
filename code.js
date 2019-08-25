let domRows = Array.from(document.getElementsByClassName("row"))

let prepareItem = col => {
    let span = col.children[0]
    span.innerHTML = span.dataset["ord"]

    col.addEventListener('dragstart', function(e) {
      this.classList.remove('col');
      this.classList.add('col-drag');
      let item = this.children[0]
      item.classList.remove('item-hidden');
      item.classList.add('item');

      e.dataTransfer.effectAllowed = 'move';

        
      let dataToTransfer = {
          row: this.dataset["row"],
          ord: item.dataset["ord"]
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
    let ord = data.ord

    let div = document.createElement("div")
    div.classList.add("col")
    div.dataset["row"] = row
    div.draggable = true
    let span = document.createElement("span")
    span.classList.add("item-hidden")
    span.dataset["ord"] = ord

    div.appendChild(span)
    prepareItem(div)
    return div
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
        let newTile = createTile(JSON.parse(e.dataTransfer.getData('text/plain')))
        this.parentElement.insertBefore(newTile, this.nextSibling)
        this.parentElement.removeChild(this);
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
      let newTile = createTile(JSON.parse(e.dataTransfer.getData('text/plain')))
      this.parentElement.insertBefore(newTile, this)
    }, false)
    
});