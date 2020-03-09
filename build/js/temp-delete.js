"use strict";

function createRegionNavigation(regionsTemplate) {
  var list = document.createElement('ul');
  regionsTemplate.forEach(function (element) {
    if (element) {
      // Create the list item (eg. Lvivska oblast)
      var listItem = document.createElement('li');
      listItem.classList.add('breadcrumb__toggle');
      listItem.setAttribute('value', element.district);
      listItem.classList.add('items'); // Set list item content

      listItem.appendChild(document.createTextNode(element.district));
      list.appendChild(listItem); //Create ul for each district regions list

      var sublist = document.createElement('ul'); //TODO: fix submenu toggling by class

      sublist.classList.add('submenu-collapsed', 'scrollable'); // //TODO: Create wrapper div to add custom scrollbar to breadcrumb dropdown
      // var dropdownWrapper = document.createElement('div')
      // dropdownWrapper.classList.add('dropdown-list')
      // listItem.appendChild(dropdownWrapper)
      // dropdownWrapper.appendChild(sublist);

      listItem.appendChild(sublist);
      element.regions.forEach(function (el) {
        if (el) {
          // Create the sublist item (eg. m. Chervonograd)
          var subListItem = document.createElement('li'); // subListItem.classList.add('breadcrumb__toggle')

          subListItem.classList.add('subitems');
          subListItem.setAttribute('value', el);
          subListItem.appendChild(document.createTextNode(el));
          sublist.appendChild(subListItem);
        }
      });
    }
  });
  return list;
}