function getCheckboxStatesObject() {
    let checkboxStates = {};
    filtersSectionBinding.forEach(section => {
            checkboxStates[section.arrayName] = [];
        }
    );

    return checkboxStates;
}
