const breadcrumbItemTemplate = `
    <div class="breadcrumbs-dropdown">
        <button class="dropbtn">
            <i class="fa fa-times-circle clearfilter"></i> <!-- //On click - clear this level -->
            {auDisplayName}
            <i class="fa fa-caret-down nextlevel"></i>
        </button>
        <div class="breadcrumbs-dropdown-content" id="{elementId}">
        </div>
    </div>
`;

const checkboxFilterItemTemplate = `
    <li>
        <div class="inputs" id="{categoryName}">
            <label>
                <input type="checkbox" class="filtercontrol {categoryName}-check" value="{categoryItem}" name="check"/>
                <span class="label-text">{categoryItem}</span>
            </label>
        </div>
    </li>
`;

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

// $("#breadCrumbRootLevel").append($(breadcrumbItemTemplate.replace("{bcElements}",
// `<li>Element 1</li>
// <li>Element 2</li>
// <li>Element 3</li>`)));