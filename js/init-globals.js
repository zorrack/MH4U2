function getCheckboxStatesObject() {
    let checkboxStates = {};
    filterSectionsBinding.forEach(section => {
            checkboxStates[section.arrayName] = [];
        }
    );

    return checkboxStates;
}
