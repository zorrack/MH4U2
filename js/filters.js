function createFilters(markers) {

    filtersSectionBinding.forEach(binding => {
        [... document.getElementsByClassName('filtercontrol ' + binding.filterClass)].forEach(element => {
            element.affectedMarkers =
                markers.filter(marker => marker.feature.properties[binding.featurePropertyName] === element.value);
            element.onchange = () => updateMarkers(markers);
        });
    });
}

function updateCheckboxStates() {
    let checkboxStates = getCheckboxStatesObject();
    filtersSectionBinding.forEach(binding => {

        let buttonJsonElement = buttonsJson.find(buttonBinding => 
            buttonBinding.className === binding.filterClass);
        if (typeof buttonJsonElement !== "undefined") {
            $('#' + buttonJsonElement.buttonId).prop('disabled', true);
        }
        //Activate the Clear Filter button for a category of the checked checkbox 
        [... document.getElementsByClassName('filtercontrol ' + binding.filterClass)].forEach(element => {
                if (element.checked) {
                    checkboxStates[binding.arrayName].push(element.value);
                }
            }
        );
        if (checkboxStates[binding.arrayName].length > 0) {
            if (typeof buttonJsonElement !== "undefined") {
                $('#' + buttonJsonElement.buttonId).prop('disabled', false);
            }
        }
    });

    return checkboxStates;
}
//Button deselecting all the filtering checkboxes
function clearCheckboxFilters(className, filters, sidebar, markers) {
    let checkboxes = document.getElementsByClassName(className);
    for(let i = 0; i < checkboxes.length ; i++) {
        checkboxes[i].checked = false;
    }
    updateMarkers(markers);
}
