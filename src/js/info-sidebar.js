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
	`<h5 class="card-header text-center">Офіційна назва</h5> {{officialName}} 
	<h5 class="card-header text-center">Юридична адреса</h5> {{address}} 
	<h5 class="card-header text-center">Контакти</h5> {{phonenumber}} {{email}}
	<h5 class="card-header text-center">Цільове населення</h5> {{patienttype}}
	<h5 class="card-header text-center">Фахівці з психічного здоров'я</h5> {{mentalhealthworkers}}
	<h5 class="card-header text-center">Тип послуг</h4> {{activitycategory}}: {{activitycodename}}.
	{{subactivitycodename}}. </br>
	<p><small class="text-muted">Інформація актуальна станом на {{recorddate}}</small></p>`


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