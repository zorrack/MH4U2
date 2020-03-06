function indentString(string, indentLevel) {
    let indentTemplate = "";

    for (let i = 0; i < indentLevel; i++) {
        indentTemplate += "    ";
    }

    return indentTemplate + string;
}