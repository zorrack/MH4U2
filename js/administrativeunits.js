class AdministrativeUnit {
    constructor(auId, auLevel, auDisplayName) {
        this.id = auId;
        this.level = parseInt(auLevel);
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
        return [... new Set(this.childAus)];
    }

    set ParentAu(parentAdministrativeUnit) {
        this.parentAu = parentAdministrativeUnit;
    }

    addChildAdministrativeUnit(administrativeUnit) {
        if (administrativeUnit.constructor.name !== "AdministrativeUnit") {
            console.log("Error adding an administrative unit: ",
                administrativeUnit.constructor.name);
        } else {
            if (this._isUniqueChild(administrativeUnit)) {
                if (Number.isInteger(parseInt(administrativeUnit.level)) &&
                        parseInt(administrativeUnit.level) - 1 === this.level) {
                    this.childAus.push(administrativeUnit);
                    administrativeUnit.ParentAu = this;
                    console.log("Administrative unit " + administrativeUnit.DisplayName +
                        " is successfully added as a child of " + this.DisplayName);
                } else {
                    console.log("The level of child administrative unit is wrong: " + administrativeUnit.level)
                }
            } else {
                console.log("Administrative unit " + administrativeUnit.DisplayName +
                    " already exists");
            }
        }
    }

    debugDisplayAuTree () {
        console.log(indentString(this.DisplayName, this.Level));
        this.ChildAus.forEach(el => el.debugDisplayAuTree());
    }

    _isUniqueChild(administrativeUnit) {
        let unique = true;

        for (let i = 0; i < this.childAus.length; i++) {
            if (this.childAus[i] === administrativeUnit || this.childAus[i].displayName === administrativeUnit.displayName) {
                unique = false;
                break;
            }
        }

        return unique;
    }
}

