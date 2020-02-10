// Color coding used for the markers. Returns different colors depending on the string passed.
const markerColors = {
    '14': 'cadetblue',
    '3': 'darkblue',
    '4': 'gray',
    '15': 'lightgray',
    '16': 'purple'
};

function getCheckboxStatesObject() {
    let checkboxStates = {};
    filtersSectionBinding.forEach(section => {
            checkboxStates[section.arrayName] = [];
        }
    );

    return checkboxStates;
}
