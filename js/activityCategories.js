var codesJson = [ ];

function getCodes(acCodes) {
    for (let i = 0; i < acCodes.length; i++) {
        let row = acCodes[i];
        let feature = {};

        for (let j = 0; j < codesProperties.length; j++) {
        	feature[codesProperties[j].name] = row[codesProperties[j].columnName];
        }
		codesJson.push(feature);
    }
}

function mergeCodes(arr, codeArr) {
	codeArr.forEach(code => 
		arr.features
		.filter(element => element.properties.ac1 == code.ac1)
		.forEach(element => codesProperties
				.forEach(codeProperty => element.properties[codeProperty.name] = code[codeProperty.name])));
}

