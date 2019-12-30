function createFilters(checkboxStates) {
	
  filteredLayer = L.geoJSON(null, {
      filter: (feature) => {
          var isServiceCategoryChecked = checkboxStates.serviceCategories.includes(feature.properties.ac1)
          var isPatientTypeChecked = checkboxStates.patientTypes.includes(feature.properties.patienttype)
          return isServiceCategoryChecked && isPatientTypeChecked //only true if both are true
      }  
  }).addTo(map)

  setFilterHandlers(filteredLayer);

  filteredLayer.addData(geojsonFacilities);
}

function setFilterHandlers(filteredLayer) {
  for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
      filteredLayer.clearLayers()
      updateCheckboxStates()
      filteredLayer.addData(geojsonFacilities)   
    }
  }
}

function updateCheckboxStates() {
  var checkboxStates = {
    serviceCategories: [],
    patientTypes: []
  }
  
  for (let input of document.querySelectorAll('input')) {
    if(input.checked) {
      switch (input.className) {
        case 'patient-type': checkboxStates.patientTypes.push(input.value); break
        case 'service-category': checkboxStates.serviceCategories.push(input.value); break
      }
    }
  }

  return checkboxStates;
}
