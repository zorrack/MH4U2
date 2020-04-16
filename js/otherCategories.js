function buildOtherCategories() {
    //"other-categories"

    let categoriesRoot = $("#filterCategoriesUL");

    Object.keys(otherCategories).forEach(category => {
        let categoryCanonicalName = category.replace(/ /g, "");
        let categoryTemplate = filterCategoryTemplate
            .replace(/{categoryName}/g, category)
            .replace(/{categoryCanonicalName}/g, categoryCanonicalName);
        let categoryObject = $(categoryTemplate);
        categoriesRoot.append(categoryObject);
        buttonsJson.push({
            buttonId: `clear${categoryCanonicalName}FiltersBtn`,
            className: `${categoryCanonicalName}-check`
        });
        filtersSectionBinding.push({
            filterClass: `${categoryCanonicalName}-check`,
            arrayName: categoryCanonicalName
        });
        let categoriesParent = categoryObject.find(`#${categoryCanonicalName}Submenu .form-check`);
        buildCheckboxFilters(categoryCanonicalName, otherCategories[category], categoriesParent);
    });
}

function buildCheckboxFilters(categoryName, categoryValues, parentElement) {
    categoryValues.forEach(value => {
        let modifiedTemplate = checkboxFilterItemTemplate
            .replace(/{categoryName}/g, categoryName)
            .replace(/{categoryItem}/g, value.filterValueName);
        parentElement.append($(modifiedTemplate));
    })
}


// function buildPatientTypeCategories() {

//     let categoriesParent = $("#patientTypeCategoriesSubmenu .form-check");
//     buildCheckboxFilters("patient-type-categories", patientTypeCategories, categoriesParent);
// }
