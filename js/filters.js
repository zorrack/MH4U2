function createFilters(filters, sidebar, checkboxIsChecked) {
  for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
    	updateMarkers(filters, sidebar); 
    }
  }
}

function updateCheckboxStates() {
    let checkboxStates = getCheckboxStatesObject();
    filterSectionsBinding.forEach(binding => {
        [... document.getElementsByClassName('filtercontrol ' + binding.filterClass)].forEach(element => {
                if (element.checked) {
                    checkboxStates[binding.arrayName].push(element.value);
                }
            }
        );
    });

  /*for (let input of document.querySelectorAll('input')) {
      if(input.checked) {
      		switch (input.className) {
        			case 'patient-type-check': checkboxStates.patientTypes.push(input.value); break
        			case 'service-category': checkboxStates.serviceCategories.push(input.value); break
              case 'mental-health-worker': checkboxStates.mentalHealthWorkers.push(input.value); break
              case 'is-inpatient-check': checkboxStates.inpatientOrOutpationed.push(input.value); break
              case 'boolean-category-check': checkboxStates.booleanCategories.push(input.value); break
          }
      }
  }*/
    return checkboxStates;
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
    let result = new Array();
    let length = collection.length;
    for(let i = 0; i < length; i++) {
        if(predicate(collection[i]) == true) {
            result.push(collection[i]);
        }
    }
    return result;
    console.log(result);
}

