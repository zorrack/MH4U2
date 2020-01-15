function createFilters(filteredLayer, sidebar) {
  for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs

    input.onchange = (e) => {
      console.log(e);
      updateMarkers(filteredLayer, sidebar);
    }
  }
}