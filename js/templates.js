let breadcrumbItemTemplate = `
    <div class="breadcrumbs-dropdown">
        <button class="dropbtn">
            <i class="fa fa-times-circle clearfilter"></i> <!-- //On click - clear this level -->
            {auDisplayName}
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="breadcrumbs-dropdown-content" id="{elementId}">
            {bcElements}
        </div>
    </div>
`;

function initBreadcrumbs(auRoot) {
    let rootElement = $("#breadCrumbRootLevel")
        .append($(breadcrumbItemTemplate.replace("{auDisplayName}", auRoot.DisplayName)
            .replace("{elementId}", "root")
            .replace("{bcElements}", buildChildrenHtml(auRoot))));
    rootElement.find($(".clearfilter")).remove();
    map.rootAdministrativeUnit.rootElement = rootElement;
}

function buildChildrenHtml(parentAu) {
    let childElements = "";

    parentAu.ChildAus.forEach(childAu => {
        childElements += "<li class='child'>" + childAu.DisplayName + "</li>";
    });

    return childElements;
}
// $("#breadCrumbRootLevel").append($(breadcrumbItemTemplate.replace("{bcElements}",
// `<li>Element 1</li>
// <li>Element 2</li>
// <li>Element 3</li>`)));