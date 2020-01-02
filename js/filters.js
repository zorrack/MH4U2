function createFilters(facilitiesForFiltering, map) {

  updateCheckboxStates();

  filteredLayer = L.geoJSON(null, {
    filter: (feature) => {
      var isPatientTypeChecked = checkboxStates.patientTypes.includes(feature.properties.patienttype)
      var isServiceCategoryChecked = checkboxStates.serviceCategories.includes(feature.properties.ac1)
      console.log(isPatientTypeChecked && isServiceCategoryChecked);
      return isPatientTypeChecked && isServiceCategoryChecked //only true if both are true
    }
  }).addTo(map)
  filteredLayer.addData(facilitiesForFiltering)

  function updateCheckboxStates() {
    checkboxStates = {
      patientTypes: [],
      serviceCategories: []
    }
    
    for (let input of document.querySelectorAll('input')) {
      if(input.checked) {
        switch (input.className) {
          case 'patient-type': checkboxStates.patientTypes.push(input.value); break
          case 'service-category': checkboxStates.serviceCategories.push(input.value); break
        }
      }
    }
  }

  var funcUpdateCheckboxStates = updateCheckboxStates;

  for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs

    input.onchange = (e) => {
      console.log(e);
      filteredLayer.clearLayers()
      funcUpdateCheckboxStates()
      filteredLayer.addData(facilitiesForFiltering)   
    }
  }
}