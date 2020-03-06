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
    let codeSet = codeArr.map(codeType => codeType.data).flat().find(sheet => sheet.name === codesTab);

    let codes = [];
    if (codeSet) {
        codeSet.elements.forEach(code => {
            let codeElement = {};
            codesProperties.forEach(codeProperty => {
                codeElement[codeProperty.name] = code[codeProperty.columnName];
            });
            codes.push(codeElement);

            arr.features
            .filter(element => element.properties.ac1 === code["Activity code"])
            .forEach(element => {
                codesProperties.forEach(codeProperty => {
                    element.properties[codeProperty.name] = code[codeProperty.columnName];
                });
            });        
        });
    }
    return codes;
}

