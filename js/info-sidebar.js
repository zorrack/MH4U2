const demoTemplateHtml =
	`<p>This is {{replace}} message`;

function getReplacedString (demoTemplateHtml, feature) {
	for (var property in feature.properties) {
		if (feature.properties.hasItsOwnProperty(property)) {
			return demoTemplateHtml.replace("{{" + property + "}}", feature.properties[property]);
		} else {
			return demoTemplateHtml;
		}
	}
}

function populateInfoSidebar(e, sidebar) {

	let html = sidebarTemplate;
	for (var property in e.target.feature.properties) {
		html = html.replace("{{" + property + "}}", e.target.feature.properties[property]);
	}

	L.DomEvent.stopPropagation(e);
	//TODO: Add styles to sidebar content elements
	document.getElementById('sidebar-content').innerHTML = html;
	if(e.target.feature.properties.mh4uCooperation == 'Yes') {
		$(".official-name-header").prepend(mh4uCooperationBadge);
	}
	sidebar.show();
}