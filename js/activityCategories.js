var codesJson = [ ];

function getCodes(acCodes) {
    for (var i = 0; i < acCodes.length; i++) {
        var row = acCodes[i];
        var feature = {};

        for (var j = 0; j < codesProperties.length; j++) {
        	feature[codesProperties[j].name] = row[codesProperties[j].columnName];
        }
		codesJson.push(feature);
    }
};

function mergeCodes(arr, codeArr) {
	codeArr.forEach(code => 
		arr.features
		.filter(element => element.properties.ac1 == code.ac1)
		.forEach(element => codesProperties
				.forEach(codeProperty => element.properties[codeProperty.name] = code[codeProperty.name])));
}

