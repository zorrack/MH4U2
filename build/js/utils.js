"use strict";

function indentString(string, indentLevel) {
  var indentTemplate = "";

  for (var i = 0; i < indentLevel; i++) {
    indentTemplate += "    ";
  }

  return indentTemplate + string;
}