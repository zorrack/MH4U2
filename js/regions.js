let selectedAdministrativeUnit = [
	{
		district : "",
		region : ""
	}
];


var regions = [];
var regionsTemplate = [
	{
		district : "Львівська область",
		regions : regions
	},
		{
		district : "2 область",
		regions : regions
	}
];

//Returns list of unique regions
function getRegions(arr){
	return [... new Set(arr.map(data => data.properties.region))];
}

//TODO: populate regions array template, make sure that the regions match with districts
function populateRegionsTemplate(regList, arr) {
	arr.forEach(element => {
		if (element) {
			element.regions = regList;
		}	
	}
	)
}

function createRegionNavigation(regionsTemplate){
    var list = document.createElement('ul');

    list.classList.add('dropdown-menu');
	list.setAttribute('role', 'menu');
	list.setAttribute('ria-labelledby', 'regionsDropdownMenu');

    regionsTemplate.forEach(element => {
    	if (element) {
			// Create the list item
			var listItem = document.createElement('li')
			listItem.setAttribute('value', element.district);

			listItem.classList.add('items')
			listItem.setAttribute('role', 'presentation')
			// Set list item content
			listItem.appendChild(document.createTextNode(element.district))
			list.appendChild(listItem);

			//Create ul for each district regions list
			var sublist = document.createElement('ul')
			sublist.classList.add('submenu-collapsed')
			listItem.appendChild(sublist);

				element.regions.forEach(el => {
					if(el) {
						// Create the sublist item
						var subListItem = document.createElement('li')
						subListItem.classList.add('items')
						subListItem.setAttribute('value', el);
						subListItem.appendChild(document.createTextNode(el))
						sublist.appendChild(subListItem);
					}	
				}
				)
    	}
    }
	)
	return list;
}

function toggleRegionNavigation(selectedAdministrativeUnit){

	let item = document.querySelectorAll('.items');

	item.forEach(el => {
		el.addEventListener('click', function () {
			el.classList.toggle('active-item');
			selectedAdministrativeUnit.district = el.getAttribute("value");

			// appendRegionNavigationItem();

    		let subList = el.firstElementChild;
    			if(subList) {
					subList.classList.toggle('submenu-collapsed');

					let subListItems = subList.children;
					for(let i = 0; i < subListItems.length ; i++) {

						subListItems[i].addEventListener('click', function () {
							selectedAdministrativeUnit.region = subListItems[i].getAttribute("value");
						});

					}
    			}
  		});
	});
}

function appendRegionNavigationItem() {

	let activeItem = document.querySelectorAll('.active-item');
	activeItem.parentElement.appendChild(activeItem);
}