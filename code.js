
Array.from(document.getElementsByClassName("col")).forEach( col => {
    col.addEventListener('dragstart', function(e) {
      this.classList.remove('col');
      this.classList.add('col-drag');
      let item = this.children[0]
      item.classList.remove('item-hidden');
      item.classList.add('item');
    }, false)

    col.addEventListener('dragend', function(e) {
      this.classList.add('col');
      this.classList.remove('col-drag');
      let item = this.children[0]
      item.classList.remove('item');
      item.classList.add('item-hidden');
    }, false)

    col.addEventListener('dragover', function(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      //var dragIcon = document.createElement('img');
      //dragIcon.src = 'logo.png';
      //dragIcon.width = 100;
      //let x = e.dataTransfer
      //x.setDragImage(dragIcon, -10, -10);

      return false;
    }  , false)
});



Array.from(document.getElementsByClassName("col-start-hidden")).forEach( col => {
    
    col.addEventListener('dragenter', function(e) {
      this.classList.remove('col-start-hidden');
      this.classList.add('col-start');
    }, false)

    col.addEventListener('dragleave', function(e) {
      this.classList.remove('col-start');
      this.classList.add('col-start-hidden');
    }, false)

});

Array.from(document.getElementsByClassName("col-end-hidden")).forEach( col => {
    
    col.addEventListener('dragenter', function(e) {
      this.classList.remove('col-end-hidden');
      this.classList.add('col-end');
    }, false)

    col.addEventListener('dragleave', function(e) {
      this.classList.remove('col-end');
      this.classList.add('col-end-hidden');
    }, false)
    
});