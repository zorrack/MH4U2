function populateInfoSidebar(e, sidebar) {

	let html = sidebarTemplate;
	for (var property in e.target.feature.properties) {
		html = html.replace("{{" + property + "}}", e.target.feature.properties[property]);
	}

	L.DomEvent.stopPropagation(e);
	//TODO: Add styles to sidebar content elements
	document.getElementById('sidebar-content').innerHTML = html;
	sidebar.show();
}