define(["@babel/runtime-corejs3/core-js-stable/instance/map", "@babel/runtime-corejs3/core-js-stable/instance/includes", "@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/object/keys", "@babel/runtime-corejs3/core-js-stable/instance/find"], function (_map, _includes, _filter, _forEach, _keys, _find) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _map = _interopRequireDefault(_map);
  _includes = _interopRequireDefault(_includes);
  _filter = _interopRequireDefault(_filter);
  _forEach = _interopRequireDefault(_forEach);
  _keys = _interopRequireDefault(_keys);
  _find = _interopRequireDefault(_find);
  var dataURL = 'https://docs.google.com/spreadsheets/d/1owqbO4TlfVq3dw-Zyp-DxrooyCB0m1Hohstlha_o800/edit?usp=sharing';
  var acCodesURL = 'https://docs.google.com/spreadsheets/d/1jX20bMaNFLYijteEGjJBDNzpkVqTC_YP0mA2B1zpED4/edit?usp=sharing';

  function getData(tabletop, mappingData, configData) {
    var sheets = tabletop.sheets();
    createDataTypes(dataTypesTemplate, sheets);
    mappingData = (0, _find.default)(dataTypesTemplate).call(dataTypesTemplate, sheet => sheet.type === "[add]");
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
    var keys = (0, _keys.default)(sheets);
    (0, _forEach.default)(dataTypesTemplate).call(dataTypesTemplate, element => {
      var type = element.type;
      var match = (0, _filter.default)(keys).call(keys, sheet => (0, _includes.default)(sheet).call(sheet, type));
      var matchData = (0, _map.default)(match).call(match, function (key) {
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
});