"use strict";

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
  var codeSet = codeArr.map(function (codeType) {
    return codeType.data;
  }).flat().find(function (sheet) {
    return sheet.name === codesTab;
  });
  var codes = [];

  if (codeSet) {
    codeSet.elements.forEach(function (code) {
      var codeElement = {};
      codesProperties.forEach(function (codeProperty) {
        codeElement[codeProperty.name] = code[codeProperty.columnName];
      });
      codes.push(codeElement);
      arr.features.filter(function (element) {
        return element.properties.ac1 === code["Activity code"];
      }).forEach(function (element) {
        codesProperties.forEach(function (codeProperty) {
          element.properties[codeProperty.name] = code[codeProperty.columnName];
        });
      });
    });
  }

  return codes;
}