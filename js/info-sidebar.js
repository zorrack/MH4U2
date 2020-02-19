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

const sidebarTemplate = 
	`Офіційна назва {{officialName}} <br />
	Юридична адреса <br /> {{address}} <br />
	Контакти<br /> {{phonenumber}} {{email}} <br />
	Цільове населення <br /> {{patienttype}} <br />
	Фахівці з психічного здоров'я <br /> {{mentalhealthworkers}} <br />
	Тип послуг <br /> {{activitycategory}}: {{activitycodename}}.
	{{subactivitycodename}}. <br />
	Інформація актуальна станом на {{recorddate}}`;


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