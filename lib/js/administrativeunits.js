"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-integer");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdministrativeUnit = /*#__PURE__*/function () {
  function AdministrativeUnit(auId, auLevel, auDisplayName) {
    _classCallCheck(this, AdministrativeUnit);

    this.id = auId;
    this.level = parseInt(auLevel);
    this.displayName = auDisplayName;
    this.parentAu = null;
    this.childAus = [];
  }

  _createClass(AdministrativeUnit, [{
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
      return _toConsumableArray(new Set(this.childAus));
    }
  }]);

  return AdministrativeUnit;
}();