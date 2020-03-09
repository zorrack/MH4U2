require("core-js/modules/es.string.replace");

define([], function () {
  "use strict";

  var demoTemplateHtml = "<p>This is {{replace}} message";

  function getReplacedString(demoTemplateHtml, feature) {
    for (var property in feature.properties) {
      if (feature.properties.hasItsOwnProperty(property)) {
        return demoTemplateHtml.replace("{{" + property + "}}", feature.properties[property]);
      } else {
        return demoTemplateHtml;
      }
    }
  }

  var sidebarTemplate = "<h5 class=\"card-header text-center\">\u041E\u0444\u0456\u0446\u0456\u0439\u043D\u0430 \u043D\u0430\u0437\u0432\u0430</h5> {{officialName}} \n\t<h5 class=\"card-header text-center\">\u042E\u0440\u0438\u0434\u0438\u0447\u043D\u0430 \u0430\u0434\u0440\u0435\u0441\u0430</h5> {{address}} \n\t<h5 class=\"card-header text-center\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438</h5> {{phonenumber}} {{email}}\n\t<h5 class=\"card-header text-center\">\u0426\u0456\u043B\u044C\u043E\u0432\u0435 \u043D\u0430\u0441\u0435\u043B\u0435\u043D\u043D\u044F</h5> {{patienttype}}\n\t<h5 class=\"card-header text-center\">\u0424\u0430\u0445\u0456\u0432\u0446\u0456 \u0437 \u043F\u0441\u0438\u0445\u0456\u0447\u043D\u043E\u0433\u043E \u0437\u0434\u043E\u0440\u043E\u0432'\u044F</h5> {{mentalhealthworkers}}\n\t<h5 class=\"card-header text-center\">\u0422\u0438\u043F \u043F\u043E\u0441\u043B\u0443\u0433</h4> {{activitycategory}}: {{activitycodename}}.\n\t{{subactivitycodename}}. </br>\n\t<p><small class=\"text-muted\">\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430 \u0441\u0442\u0430\u043D\u043E\u043C \u043D\u0430 {{recorddate}}</small></p>";

  function populateInfoSidebar(e, sidebar) {
    var html = sidebarTemplate;

    for (var property in e.target.feature.properties) {
      html = html.replace("{{" + property + "}}", e.target.feature.properties[property]);
    }

    L.DomEvent.stopPropagation(e); //TODO: Add styles to sidebar content elements

    document.getElementById('sidebar-content').innerHTML = html;
    sidebar.show();
  }
});