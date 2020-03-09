"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AdministrativeUnit = /*#__PURE__*/function () {
  function AdministrativeUnit(auId, auLevel, auDisplayName) {
    (0, _classCallCheck2.default)(this, AdministrativeUnit);
    this.id = auId;
    this.level = parseInt(auLevel);
    this.displayName = auDisplayName;
    this.parentAu = null;
    this.childAus = [];
  }

  (0, _createClass2.default)(AdministrativeUnit, [{
    key: "addChildAdministrativeUnit",
    value: function addChildAdministrativeUnit(administrativeUnit) {
      if (administrativeUnit.constructor.name !== "AdministrativeUnit") {
        console.log("Error adding an administrative unit: ", administrativeUnit.constructor.name);
      } else {
        if (this._isUniqueChild(administrativeUnit)) {
          if (Number.isInteger(parseInt(administrativeUnit.level)) && parseInt(administrativeUnit.level) - 1 === this.level) {
            this.childAus.push(administrativeUnit);
            administrativeUnit.ParentAu = this;
          } else {
            console.log("The level of child administrative unit is wrong: " + administrativeUnit.level);
          }
        } else {
          console.log("Administrative unit " + administrativeUnit.DisplayName + " already exists");
        }
      }
    }
  }, {
    key: "debugDisplayAuTree",
    value: function debugDisplayAuTree() {
      console.log(indentString(this.DisplayName, this.Level));
      this.ChildAus.forEach(function (el) {
        return el.debugDisplayAuTree();
      });
    }
  }, {
    key: "_isUniqueChild",
    value: function _isUniqueChild(administrativeUnit) {
      var unique = true;

      for (var i = 0; i < this.childAus.length; i++) {
        if (this.childAus[i] === administrativeUnit || this.childAus[i].displayName === administrativeUnit.displayName) {
          unique = false;
          break;
        }
      }

      return unique;
    }
  }, {
    key: "Id",
    get: function get() {
      return this.id;
    }
  }, {
    key: "Level",
    get: function get() {
      return this.level;
    }
  }, {
    key: "DisplayName",
    get: function get() {
      return this.displayName;
    }
  }, {
    key: "ParentAu",
    get: function get() {
      return this.parentAu;
    },
    set: function set(parentAdministrativeUnit) {
      this.parentAu = parentAdministrativeUnit;
    }
  }, {
    key: "ChildAus",
    get: function get() {
      return (0, _toConsumableArray2.default)(new Set(this.childAus));
    }
  }]);
  return AdministrativeUnit;
}();