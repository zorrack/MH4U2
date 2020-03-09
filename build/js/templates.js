"use strict";

var breadcrumbItemTemplate = "\n    <div class=\"breadcrumbs-dropdown\">\n        <button class=\"dropbtn\">\n            <i class=\"fa fa-times-circle clearfilter\"></i> <!-- //On click - clear this level -->\n            {auDisplayName}\n            <i class=\"fa fa-caret-down nextlevel\"></i>\n        </button>\n        <div class=\"breadcrumbs-dropdown-content\" id=\"{elementId}\">\n        </div>\n    </div>\n";

function initBreadcrumbs(auRoot) {
  map.breadcrumbs = [];
  var rootElement = $("#breadCrumbRootLevel").append(buildMainLevel(auRoot));
  rootElement.find(".clearfilter").remove();
}

function buildMainLevel(auElement) {
  map.breadcrumbs.push(auElement);
  var element = $(breadcrumbItemTemplate.replace("{auDisplayName}", auElement.DisplayName).replace("{elementId}", auElement.Id));
  auElement.jqElement = element;
  element.on("click", function (ev) {});
  var childrenContainer = element.find(".breadcrumbs-dropdown-content");

  if (childrenContainer) {
    auElement.ChildAus.forEach(function (auChildElement) {
      var childElement = $("<li></li>").text(auChildElement.DisplayName);
      childElement.on("click", function (ev) {
        if (map.breadcrumbs.length == auChildElement.Level) {
          $("#breadCrumbRootLevel").append(buildMainLevel(auChildElement));
        } else {
          while (map.breadcrumbs.length > auChildElement.Level) {
            map.breadcrumbs[map.breadcrumbs.length - 1].jqElement.remove();
            map.breadcrumbs.pop();
          }

          $("#breadCrumbRootLevel").append(buildMainLevel(auChildElement));
        }

        updateMarkers(map.markers);
      });
      childrenContainer.append(childElement);
    });
  }

  if (auElement.ChildAus.length === 0) {
    auElement.jqElement.find(".nextlevel").remove();
  }

  var clearFilterElement = element.find(".clearfilter");

  if (clearFilterElement) {
    clearFilterElement.on("click", function (ev) {
      while (map.breadcrumbs.length > auElement.Level) {
        map.breadcrumbs[map.breadcrumbs.length - 1].jqElement.remove();
        map.breadcrumbs.pop();
      }

      updateMarkers(map.markers);
    });
  }

  return element;
} // $("#breadCrumbRootLevel").append($(breadcrumbItemTemplate.replace("{bcElements}",
// `<li>Element 1</li>
// <li>Element 2</li>
// <li>Element 3</li>`)));