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

var listItemAttributes = {
	"role" : "presentation",
	"a role" : "menuitem",
	"tabindex" : "-1"
}

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

function createRegionNavigation(regionsTemplate, listItemAttributes){
    var list = document.createElement('ul');

    list.classList.add('dropdown-menu');
	list.setAttribute('role', 'menu');
	list.setAttribute('ria-labelledby', 'regionsDropdownMenu');

    regionsTemplate.forEach(element => {
    	if (element) {
			// Create the list item
			var listItem = document.createElement('li')
			listItem.classList.add('items')
			listItem.setAttribute('role', 'presentation')

			//TODO: create html attributes array
			// listItemAttributes.forEach(attr => {
			// 	listItem.setAttribute(attr)
			// })
			
			// Set list item content
			listItem.appendChild(document.createTextNode(element.district))
			list.appendChild(listItem);

			//Create ul for each district regions list
			var sublist = document.createElement('ul')
			sublist.classList.add('collapsed')
			listItem.appendChild(sublist);

				element.regions.forEach(el => {
					if(el) {
						// Create the sublist item
						var subListItem = document.createElement('li')
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

function toggleRegionNavigation(){

	let item = document.querySelectorAll('.items');
	console.log(item);
	item.forEach(el => {
		el.addEventListener('click', function () {
			el.classList.add('active-item');

			// appendRegionNavigationItem();

    		let subItems = el.firstElementChild;
    			if(subItems) {
					subItems.classList.toggle('collapsed');
    			}
  		});
	});
}

function appendRegionNavigationItem() {

	let activeItem = document.querySelectorAll('.active-item');
	activeItem.parentElement.appendChild(activeItem);
}