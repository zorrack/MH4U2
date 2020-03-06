"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createFilters(markers) {
  filtersSectionBinding.forEach(function (binding) {
    _toConsumableArray(document.getElementsByClassName('filtercontrol ' + binding.filterClass)).forEach(function (element) {
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
    _toConsumableArray(document.getElementsByClassName('filtercontrol ' + binding.filterClass)).forEach(function (element) {
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