function createFilters(filters, sidebar, checkboxIsChecked) {
  for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
    	updateMarkers(filters, sidebar); 
    }
  }
}

function updateCheckboxStates() {
  checkboxStates = {
      patientTypes: [],
      serviceCategories: [],
      mentalHealthWorkers: []
  }
  for (let input of document.querySelectorAll('input')) {
      if(input.checked) {
      		switch (input.className) {
        			case 'patient-type-check': checkboxStates.patientTypes.push(input.value); break
        			case 'service-category': checkboxStates.serviceCategories.push(input.value); break
              case 'mental-health-worker': checkboxStates.mentalHealthWorkers.push(input.value); break
          }
      }
  }
}
//Button deselecting all the filtering checkboxes
function clearCheckboxFilters(className, filters, sidebar) {
    let checkboxes = document.getElementsByClassName(className);
    for(let i = 0; i < checkboxes.length ; i++) {
        checkboxes[i].checked = false;
    }
	updateMarkers(filters, sidebar)
	console.log('function clearCheckboxFilters status ' + checkboxIsChecked);
}

//TODO: implement filter by a given attribute value  
function filterByFeature(collection, predicate) {
    var result = new Array();
    var length = collection.length;
    for(var i = 0; i < length; i++) {
        if(predicate(collection[i]) == true) {
            result.push(collection[i]);
        }
    }
    return result;
    console.log(result);
}

