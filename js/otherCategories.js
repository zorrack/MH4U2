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