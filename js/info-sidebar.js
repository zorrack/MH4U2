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
	`<h5 class="card-header text-center">Офіційна назва</h5>
	<p class="official-name-header"> {{officialName}} </p>
	<h5 class="card-header text-center">Юридична адреса</h5> {{address}} 
	<h5 class="card-header text-center">Контакти</h5> {{phonenumber}} <a href={{email}} target="_blank">Ел. адреса / email</a> 
	<h5 class="card-header text-center">Цільове населення</h5> {{patienttype}}
	<h5 class="card-header text-center">Фахівці з психічного здоров'я</h5> {{mentalhealthworkers}}
	<h5 class="card-header text-center">Тип послуг</h4> {{activitycategory}}: {{activitycodename}}.
	{{subactivitycodename}}. </br>
	<p><small class="text-muted">Інформація актуальна станом на {{recorddate}}</small></p>`

const mh4uCooperationBadge = `<span class="badge badge-warning badge-pill"><i class="fa fa-certificate" aria-hidden="true"> Співпраця з MH4U</i></span>`;

function populateInfoSidebar(e, sidebar) {

	let html = sidebarTemplate;
	for (var property in e.target.feature.properties) {
		html = html.replace("{{" + property + "}}", e.target.feature.properties[property]);
	}

	L.DomEvent.stopPropagation(e);
	//TODO: Add styles to sidebar content elements
	document.getElementById('sidebar-content').innerHTML = html;
	if(e.target.feature.properties.mh4uCooperation == 'Так') {
		$(".official-name-header").prepend(mh4uCooperationBadge);
	}
	sidebar.show();
}