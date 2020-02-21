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
	}
	// 	{
	// 	district : "Донецька область",
	// 	regions : ""
	// }
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
    regionsTemplate.forEach(element => {
    	if (element) {
			// Create the list item (eg. Lvivska oblast)
			var listItem = document.createElement('li')
			listItem.classList.add('breadcrumb__toggle')
			listItem.setAttribute('value', element.district);
			listItem.classList.add('items')

			// Set list item content
			listItem.appendChild(document.createTextNode(element.district))
			list.appendChild(listItem);

			//Create ul for each district regions list
			var sublist = document.createElement('ul')
			//TODO: fix submenu toggling by class
			sublist.classList.add('submenu-collapsed', 'scrollable')
			listItem.appendChild(sublist);

				element.regions.forEach(el => {
					if(el) {
						// Create the sublist item (eg. m. Chervonograd)
						var subListItem = document.createElement('li')
						// subListItem.classList.add('breadcrumb__toggle')
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

function toggleRegionNavigation() {

	let item = document.querySelectorAll('.items');

	item.forEach(el => {
		el.addEventListener('click', function () {
			el.classList.toggle('breadcrumb__toggle');
			//Assign value attribute because filtering is based on value attribute
			selectedAdministrativeUnit.district = el.getAttribute("value");
			console.log("Filter by district: " + selectedAdministrativeUnit.district);

			updateMarkers(map.markers);
		});
			// appendRegionNavigationItem();

		let subList = el.firstElementChild;
		if (subList) {
			subList.classList.toggle('submenu-collapsed');

			let subListItems = subList.children;
			for(let i = 0; i < subListItems.length ; i++) {
				subListItems[i].addEventListener('click', function () {
					//Assign value attribute because filtering is based on value attribute
					selectedAdministrativeUnit.region = subListItems[i].getAttribute("value");
					console.log("Filter by region: " + selectedAdministrativeUnit.region);
					updateMarkers(map.markers);
				});

			}
		}
  	});
}

// function appendRegionNavigationItem() {

// 	let activeItem = document.getElementsByClassName('.active-item');
// 	activeItem.parentElement.appendChild(activeItem);
// }