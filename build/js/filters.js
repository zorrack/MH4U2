require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

define(["@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/instance/for-each"], function (_filter, _forEach) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _filter = _interopRequireDefault(_filter);
  _forEach = _interopRequireDefault(_forEach);

  function createFilters(markers) {
    (0, _forEach.default)(filtersSectionBinding).call(filtersSectionBinding, binding => {
      var _context;

      (0, _forEach.default)(_context = [...document.getElementsByClassName('filtercontrol ' + binding.filterClass)]).call(_context, element => {
        element.affectedMarkers = (0, _filter.default)(markers).call(markers, marker => marker.feature.properties[binding.featurePropertyName] === element.value);
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

        element.onchange = () => updateMarkers(markers);
      });
    });
  }

  function updateCheckboxStates() {
    var checkboxStates = getCheckboxStatesObject();
    (0, _forEach.default)(filtersSectionBinding).call(filtersSectionBinding, binding => {
      var _context2;

      (0, _forEach.default)(_context2 = [...document.getElementsByClassName('filtercontrol ' + binding.filterClass)]).call(_context2, element => {
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
});