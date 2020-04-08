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