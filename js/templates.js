let breadcrumbItemTemplate = `
    <div class="breadcrumbs-dropdown">
        <button class="dropbtn">
            <i class="fa fa-times-circle clearfilter"></i> <!-- //On click - clear this level -->
            {auDisplayName}
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="breadcrumbs-dropdown-content" id="{elementId}">
        </div>
    </div>
`;

function initBreadcrumbs(auRoot) {
    map.breadcrumbs = [];
    let rootElement = $("#breadCrumbRootLevel")
        .append(buildMainLevel(auRoot));
    rootElement.find(".clearfilter").remove();
}

function buildMainLevel(auElement) {
    map.breadcrumbs.push(auElement);

    let element = $(breadcrumbItemTemplate.replace("{auDisplayName}", auElement.DisplayName)
            .replace("{elementId}", auElement.Id));
    auElement.jqElement = element;
    element.on("click", (ev) => {

    });

    let childrenContainer = element.find(".breadcrumbs-dropdown-content");

    if (childrenContainer) {
        auElement.ChildAus.forEach(auChildElement => {
            let childElement = $("<li></li>").text(auChildElement.DisplayName);
            childElement.on("click", (ev) => {
                if (map.breadcrumbs.length == auChildElement.Level) {
                    $("#breadCrumbRootLevel").append(buildMainLevel(auChildElement));
                } else {
                    while (map.breadcrumbs.length > auChildElement.Level) {
                        map.breadcrumbs[map.breadcrumbs.length - 1].jqElement.remove();
                        map.breadcrumbs.pop();
                    }
                    $("#breadCrumbRootLevel").append(buildMainLevel(auChildElement));
                }
            });
            childrenContainer.append(childElement);
        });
    }
    let clearFilterElement = element.find(".clearfilter");
    if (clearFilterElement) {
        clearFilterElement.on("click", (ev) => {
            console.log("Close level")
        });
    }

    return element;
}
function buildChildrenHtml(parentAu) {
    let childElements = "";

    parentAu.ChildAus.forEach(childAu => {
        childElements += "<li class='child' data-id=''>" + childAu.DisplayName + "</li>";
    });

    return childElements;
}
// $("#breadCrumbRootLevel").append($(breadcrumbItemTemplate.replace("{bcElements}",
// `<li>Element 1</li>
// <li>Element 2</li>
// <li>Element 3</li>`)));