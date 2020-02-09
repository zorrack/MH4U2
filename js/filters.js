function createFilters(markers) {

    filtersSectionBinding.forEach(binding => {
        [... document.getElementsByClassName('filtercontrol ' + binding.filterClass)].forEach(element => {
            element.affectedMarkers =
                markers.filter(marker => marker.feature.properties[binding.featurePropertyName] === element.value);

            let predicate;
            switch (binding.elementType) {
                case elementTypes.CHECKBOX: {
                    predicate = function (element, binding, marker) {
                        return element.checked &&
                            marker.feature.properties[binding.featurePropertyName] === element.value;
                    };
                    break;
                }
                case elementTypes.DROPDOWN: {
                    predicate = function (element, binding, marker) {
                        return element.value !== "---" &&
                            marker.feature.properties[binding.featurePropertyName] === element.value;
                    };
                    break;
                }
                default: predicate = () => true;
            }
            element.onchange = () => updateMarkers(markers);
        });
    });
  /*for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
    	updateMarkers(filters, sidebar); 
    }
  }*/
}

function updateCheckboxStates() {
    let checkboxStates = getCheckboxStatesObject();
    filtersSectionBinding.forEach(binding => {
        [... document.getElementsByClassName('filtercontrol ' + binding.filterClass)].forEach(element => {
                if (element.checked) {
                    checkboxStates[binding.arrayName].push(element.value);
                }
            }
        );
    });

    return checkboxStates;
}
//Button deselecting all the filtering checkboxes
function clearCheckboxFilters(className, filters, sidebar) {
    let checkboxes = document.getElementsByClassName(className);
    for(let i = 0; i < checkboxes.length ; i++) {
        checkboxes[i].checked = false;
    }
    updateMarkers();
}
