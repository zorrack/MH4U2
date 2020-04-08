function buildOtherCategories() {
    //"other-categories"

    let categoriesParent = $("#otherCategoriesSubmenu .form-check");
    buildCheckboxFilters("other-categories", otherCategories, categoriesParent);
}

function buildCheckboxFilters(categoryName, categoryValues, parentElement) {
    categoryValues.forEach(value => {
        let modifiedTemplate = checkboxFilterItemTemplate
            .replace(/{categoryName}/g, categoryName)
            .replace(/{categoryItem}/g, value);
        parentElement.append($(modifiedTemplate));
    })
}


// function buildPatientTypeCategories() {

//     let categoriesParent = $("#patientTypeCategoriesSubmenu .form-check");
//     buildCheckboxFilters("patient-type-categories", patientTypeCategories, categoriesParent);
// }
