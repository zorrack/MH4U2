function buildServiceCategory(categoriesRoot, codes)
{
    let filteredCodes = codes.map(x => {
    return {
        codeValue: x.ac1,
        codeName: x.activitycodename
    }});
    let map = new Map()
    let distinctCodes = [];

    for (const element of filteredCodes) {
        if (!map.has(element.codeValue)) {
            map.set(element.codeValue, true);
            distinctCodes.push(element);
        }
    }

    let serviceCategory = [];

    distinctCodes.forEach(code => {
        serviceCategory.push({
            "filterProperty": "ac1",
            "filterDisplayName": code.codeName,
            "filterValueName": code.codeValue
        });
    });

    let categoriesParent = buildCategorySection(categoriesRoot, "Тип послуг", "Типпослуг");
    buildCheckboxFilters("Типпослуг", serviceCategory, categoriesParent);
}

function buildFacilityTypeCategory(categoriesRoot) {
    let facilityTypesCategory = [];
    let columnName = "амбулаторна чи стаціонарна";

    let validationTable = dataTypesTemplate.find(sheetType => sheetType.type === "[conf]")
        .data.find(table => table.name === validationTab);

    validationTable.elements.forEach(row => {
        let value = row[columnName].trim();
        if (value !== "") {
            facilityTypesCategory.push({
                "filterProperty": columnName,
                "filterDisplayName": row[columnName],
                "filterValueName": row[columnName]
            });
        }
    });

    let categoriesParent = buildCategorySection(categoriesRoot, "Тип закладу", "Типзакладу");
    buildCheckboxFilters("Типзакладу", facilityTypesCategory, categoriesParent);
};

function buildOtherCategories(categoriesRoot) {
    //"other-categories"

    Object.keys(otherCategories).forEach(category => {
        let categoryCanonicalName = category.replace(/ /g, "");
        let categoriesParent = buildCategorySection(categoriesRoot, category, categoryCanonicalName);
        buttonsJson.push({
            buttonId: `clear${categoryCanonicalName}FiltersBtn`,
            className: `${categoryCanonicalName}-check`
        });
        filtersSectionBinding.push({
            filterClass: `${categoryCanonicalName}-check`,
            arrayName: categoryCanonicalName,
            elementType: elementTypes.YESNO_CHECKBOX
        });
        buildCheckboxFilters(categoryCanonicalName, otherCategories[category], categoriesParent);
    });
}

function buildCategorySection(categoriesRoot, categoryName, categoryCanonicalName) {
        let categoryTemplate = filterCategoryTemplate
            .replace(/{categoryName}/g, categoryName)
            .replace(/{categoryCanonicalName}/g, categoryCanonicalName);
        let categoryObject = $(categoryTemplate);
        categoriesRoot.append(categoryObject);
        let categoriesParent = categoryObject.find(`#${categoryCanonicalName}Submenu .form-check`);
    return categoriesParent;
};

function buildCheckboxFilters(categoryName, categoryValues, parentElement) {
    categoryValues.forEach(value => {
        let modifiedTemplate = checkboxFilterItemTemplate
            .replace(/{categoryName}/g, categoryName)
            .replace(/{categoryItemLabel}/g, value.filterDisplayName)
            .replace(/{categoryItem}/g, value.filterValueName);
        parentElement.append($(modifiedTemplate));
    })
}


