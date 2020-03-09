define(["@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/instance/map", "@babel/runtime-corejs3/core-js-stable/instance/flat", "@babel/runtime-corejs3/core-js-stable/instance/find"], function (_filter, _forEach, _map, _flat, _find) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _filter = _interopRequireDefault(_filter);
  _forEach = _interopRequireDefault(_forEach);
  _map = _interopRequireDefault(_map);
  _flat = _interopRequireDefault(_flat);
  _find = _interopRequireDefault(_find);

  // var codesJson = [ ];
  // function getCodes(acCodes) {
  //     for (let i = 0; i < acCodes.length; i++) {
  //         let row = acCodes[i];
  //         let feature = {};
  //         for (let j = 0; j < codesProperties.length; j++) {
  //         	feature[codesProperties[j].name] = row[codesProperties[j].columnName];
  //         }
  // 		codesJson.push(feature);
  //     }
  // }
  function mergeCodes(arr, codeArr) {
    var _context, _context2;

    var codeSet = (0, _find.default)(_context = (0, _flat.default)(_context2 = (0, _map.default)(codeArr).call(codeArr, codeType => codeType.data)).call(_context2)).call(_context, sheet => sheet.name === codesTab);
    var codes = [];

    if (codeSet) {
      var _context3;

      (0, _forEach.default)(_context3 = codeSet.elements).call(_context3, code => {
        var _context4, _context5;

        var codeElement = {};
        (0, _forEach.default)(codesProperties).call(codesProperties, codeProperty => {
          codeElement[codeProperty.name] = code[codeProperty.columnName];
        });
        codes.push(codeElement);
        (0, _forEach.default)(_context4 = (0, _filter.default)(_context5 = arr.features).call(_context5, element => element.properties.ac1 === code["Activity code"])).call(_context4, element => {
          (0, _forEach.default)(codesProperties).call(codesProperties, codeProperty => {
            element.properties[codeProperty.name] = code[codeProperty.columnName];
          });
        });
      });
    }

    return codes;
  }
});