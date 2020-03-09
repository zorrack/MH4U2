require("core-js/modules/es.string.replace");

define(["@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/instance/find"], function (_forEach, _find) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _forEach = _interopRequireDefault(_forEach);
  _find = _interopRequireDefault(_find);
  var breadcrumbItemTemplate = "\n    <div class=\"breadcrumbs-dropdown\">\n        <button class=\"dropbtn\">\n            <i class=\"fa fa-times-circle clearfilter\"></i> <!-- //On click - clear this level -->\n            {auDisplayName}\n            <i class=\"fa fa-caret-down nextlevel\"></i>\n        </button>\n        <div class=\"breadcrumbs-dropdown-content\" id=\"{elementId}\">\n        </div>\n    </div>\n";

  function initBreadcrumbs(auRoot) {
    map.breadcrumbs = [];
    var rootElement = $("#breadCrumbRootLevel").append(buildMainLevel(auRoot));
    (0, _find.default)(rootElement).call(rootElement, ".clearfilter").remove();
  }

  function buildMainLevel(auElement) {
    map.breadcrumbs.push(auElement);
    var element = $(breadcrumbItemTemplate.replace("{auDisplayName}", auElement.DisplayName).replace("{elementId}", auElement.Id));
    auElement.jqElement = element;
    element.on("click", ev => {});
    var childrenContainer = (0, _find.default)(element).call(element, ".breadcrumbs-dropdown-content");

    if (childrenContainer) {
      var _context;

      (0, _forEach.default)(_context = auElement.ChildAus).call(_context, auChildElement => {
        var childElement = $("<li></li>").text(auChildElement.DisplayName);
        childElement.on("click", ev => {
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
      var _context2;

      (0, _find.default)(_context2 = auElement.jqElement).call(_context2, ".nextlevel").remove();
    }

    var clearFilterElement = (0, _find.default)(element).call(element, ".clearfilter");

    if (clearFilterElement) {
      clearFilterElement.on("click", ev => {
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

});