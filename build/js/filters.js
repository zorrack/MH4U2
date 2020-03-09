"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function createFilters(markers) {
  filtersSectionBinding.forEach(function (binding) {
    (0, _toConsumableArray2.default)(document.getElementsByClassName('filtercontrol ' + binding.filterClass)).forEach(function (element) {
      element.affectedMarkers = markers.filter(function (marker) {
        return marker.feature.properties[binding.featurePropertyName] === element.value;
      });
      /*let predicate;
      switch (binding.elementType) {
          case elementTypes.CHECKBOX: {
              predicate = function (element, binding, marker) {
                  return element.checked &&
                      marker.feature.properties[binding.featurePropertyName] === element.value;
              };
              break;
          }
          case elementTypes.DROPDOWN: {
              predicate = function (element, binding, marker) {
                  return element.value !== "---" &&
                      marker.feature.properties[binding.featurePropertyName] === element.value;
              };
              break;
          }
          default: predicate = () => true;
      }*/

      element.onchange = function () {
        return updateMarkers(markers);
      };
    });
  });
}

function updateCheckboxStates() {
  var checkboxStates = getCheckboxStatesObject();
  filtersSectionBinding.forEach(function (binding) {
    (0, _toConsumableArray2.default)(document.getElementsByClassName('filtercontrol ' + binding.filterClass)).forEach(function (element) {
      if (element.checked) {
        checkboxStates[binding.arrayName].push(element.value);
      }
    });
  });
  return checkboxStates;
} //Button deselecting all the filtering checkboxes


function clearCheckboxFilters(className, filters, sidebar, markers) {
  var checkboxes = document.getElementsByClassName(className);

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  updateMarkers(markers);
}