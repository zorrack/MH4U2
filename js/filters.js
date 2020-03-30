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
function clearCheckboxFilters(className, filters, sidebar, markers) {
    let checkboxes = document.getElementsByClassName(className);
    for(let i = 0; i < checkboxes.length ; i++) {
        checkboxes[i].checked = false;
    }
    updateMarkers(markers);
}
