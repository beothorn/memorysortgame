

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}





Array.from(document.getElementsByClassName("item")).forEach( item => {item.addEventListener('dragstart', function(e) {
    this.style.opacity = '0.4';
}, false)});



Array.from(document.getElementsByClassName("item-start-hidden")).forEach( item => {
    
    item.addEventListener('dragenter', function(e) {
      this.classList.remove('item-start-hidden');
      this.classList.add('item-start');
    }, false)

    item.addEventListener('dragleave', function(e) {
      this.classList.remove('item-start');
      this.classList.add('item-start-hidden');
    }, false)
    
});

Array.from(document.getElementsByClassName("item-end-hidden")).forEach( item => {
    
    item.addEventListener('dragenter', function(e) {
      this.classList.remove('item-end-hidden');
      this.classList.add('item-end');
    }, false)

    item.addEventListener('dragleave', function(e) {
      this.classList.remove('item-end');
      this.classList.add('item-end-hidden');
    }, false)
    
});
