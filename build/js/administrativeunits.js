require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

define(["@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/number/is-integer", "@babel/runtime-corejs3/core-js-stable/set", "@babel/runtime-corejs3/core-js-stable/parse-int"], function (_forEach, _isInteger, _set, _parseInt2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _forEach = _interopRequireDefault(_forEach);
  _isInteger = _interopRequireDefault(_isInteger);
  _set = _interopRequireDefault(_set);
  _parseInt2 = _interopRequireDefault(_parseInt2);

  class AdministrativeUnit {
    constructor(auId, auLevel, auDisplayName) {
      this.id = auId;
      this.level = (0, _parseInt2.default)(auLevel);
      this.displayName = auDisplayName;
      this.parentAu = null;
      this.childAus = [];
    }

    get Id() {
      return this.id;
    }

    get Level() {
      return this.level;
    }

    get DisplayName() {
      return this.displayName;
    }

    get ParentAu() {
      return this.parentAu;
    }

    get ChildAus() {
      return [...new _set.default(this.childAus)];
    }

    set ParentAu(parentAdministrativeUnit) {
      this.parentAu = parentAdministrativeUnit;
    }

    addChildAdministrativeUnit(administrativeUnit) {
      if (administrativeUnit.constructor.name !== "AdministrativeUnit") {
        console.log("Error adding an administrative unit: ", administrativeUnit.constructor.name);
      } else {
        if (this._isUniqueChild(administrativeUnit)) {
          if ((0, _isInteger.default)((0, _parseInt2.default)(administrativeUnit.level)) && (0, _parseInt2.default)(administrativeUnit.level) - 1 === this.level) {
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

    debugDisplayAuTree() {
      var _context;

      console.log(indentString(this.DisplayName, this.Level));
      (0, _forEach.default)(_context = this.ChildAus).call(_context, el => el.debugDisplayAuTree());
    }

    _isUniqueChild(administrativeUnit) {
      var unique = true;

      for (var i = 0; i < this.childAus.length; i++) {
        if (this.childAus[i] === administrativeUnit || this.childAus[i].displayName === administrativeUnit.displayName) {
          unique = false;
          break;
        }
      }

      return unique;
    }

  }
});