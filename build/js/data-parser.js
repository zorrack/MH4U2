"use strict";

var dataURL = 'https://docs.google.com/spreadsheets/d/1owqbO4TlfVq3dw-Zyp-DxrooyCB0m1Hohstlha_o800/edit?usp=sharing';
var acCodesURL = 'https://docs.google.com/spreadsheets/d/1jX20bMaNFLYijteEGjJBDNzpkVqTC_YP0mA2B1zpED4/edit?usp=sharing';

function getData(tabletop, mappingData, configData) {
  var sheets = tabletop.sheets();
  createDataTypes(dataTypesTemplate, sheets);
  mappingData = dataTypesTemplate.find(function (sheet) {
    return sheet.type === "[add]";
  });
  return mappingData;
}

;

function createRegions(mappingSheets) {
  var regions = [];

  for (var i = 0; i < mappingSheets.length; i++) {
    regions.push(mappingSheets.sheets[i]);
  }

  console.log("regions" + regions);
}

function createDataTypes(dataTypesTemplate, sheets) {
  var keys = Object.keys(sheets);
  dataTypesTemplate.forEach(function (element) {
    var type = element.type;
    var match = keys.filter(function (sheet) {
      return sheet.includes(type);
    });
    var matchData = match.map(function (key) {
      return sheets[key];
    });

    for (var i = 0; i < matchData.length; i++) {
      element.data.push(matchData[i]);
    }
  });
  console.log(dataTypesTemplate);
} ///TODO: tab naming template


var dataTypesTemplate = [{
  ///Region tab that should be added to map
  type: "[add]",
  name: "mapping data sheets",
  parse: true,
  addToMap: true,
  data: []
}, ///Region tab that should NOT be added to map
{
  type: "[hide]",
  name: "hidden mapping data sheets",
  parse: false,
  addToMap: false,
  data: []
}, {
  ///Tab with data other than facility locations that should be parsed
  ///(i.e. service coding tab)
  type: "[conf]",
  name: "mapping configuration sheets",
  parse: true,
  addToMap: false,
  data: []
}, {
  ///Tab with data other than facility locations that should NOT be parsed
  ///(i.e. instructions, spreadsheet validation ranges)
  type: "[info]",
  name: "database info sheets",
  parse: false,
  data: []
}];