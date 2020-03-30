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
	`<h5 class="card-header text-center">Офіційна назва</h5> {{officialName}} 
	<h5 class="card-header text-center">Юридична адреса</h5> {{address}} 
	<h5 class="card-header text-center">Контакти</h5> {{phonenumber}} {{email}}
	<h5 class="card-header text-center">Цільове населення</h5> {{patienttype}}
	<h5 class="card-header text-center">Фахівці з психічного здоров'я</h5> {{mentalhealthworkers}}
	<h5 class="card-header text-center">Тип послуг</h4> {{activitycategory}}: {{activitycodename}}.
	{{subactivitycodename}}. </br>
	<p><small class="text-muted">Інформація актуальна станом на {{recorddate}}</small></p>`;


// $("#breadCrumbRootLevel").append($(breadcrumbItemTemplate.replace("{bcElements}",
// `<li>Element 1</li>
// <li>Element 2</li>
// <li>Element 3</li>`)));