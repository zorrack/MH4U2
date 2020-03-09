require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

define(["@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/instance/map", "@babel/runtime-corejs3/core-js-stable/set"], function (_forEach, _map, _set) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _forEach = _interopRequireDefault(_forEach);
  _map = _interopRequireDefault(_map);
  _set = _interopRequireDefault(_set);
  var selectedAdministrativeUnit = [{
    district: "",
    region: ""
  }];
  var regions = [];
  var regionsTemplate = [{
    district: "Львівська область",
    regions: regions
  }, {
    district: "Донецька область",
    regions: "Донецьк"
  }]; //Returns list of unique regions

  function getRegions(arr) {
    return [...new _set.default((0, _map.default)(arr).call(arr, data => data.properties.region))];
  } //TODO: populate regions array template, make sure that the regions match with districts


  function populateRegionsTemplate(regList, arr) {
    (0, _forEach.default)(arr).call(arr, element => {
      if (element) {
        element.regions = regList;
      }
    });
  }

  function createRegionNavigation(regionsTemplate) {
    var list = document.createElement('ul');
    (0, _forEach.default)(regionsTemplate).call(regionsTemplate, element => {
      if (element) {
        var _context;

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
        (0, _forEach.default)(_context = element.regions).call(_context, el => {
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

  function toggleRegionNavigation() {
    var item = document.querySelectorAll('.items');
    (0, _forEach.default)(item).call(item, el => {
      el.addEventListener('click', function () {
        el.classList.toggle('breadcrumb__toggle'); //Assign value attribute because filtering is based on value attribute

        selectedAdministrativeUnit.district = el.getAttribute("value");
        selectedAdministrativeUnit.region = "";
        console.log("Filter by district: " + selectedAdministrativeUnit.district);
        appendBreadcrumb(el);
        console.log("Appended" + selectedAdministrativeUnit.district);
        updateMarkers(map.markers);
      });
      var subList = el.firstElementChild;

      if (subList) {
        (function () {
          var subListItems = subList.children;

          var _loop = function _loop(i) {
            subListItems[i].addEventListener('click', function (e) {
              //Assign value attribute because filtering is based on value attribute
              selectedAdministrativeUnit.region = subListItems[i].getAttribute("value");
              console.log("Filter by region: " + selectedAdministrativeUnit.region);
              appendBreadcrumb(subListItems[i]);
              console.log("Appended" + subListItems[i]);
              updateMarkers(map.markers);
              e.stopPropagation();
            });
          };

          for (var i = 0; i < subListItems.length; i++) {
            _loop(i);
          }
        })();
      }
    });
  }

  function appendBreadcrumb(item) {
    var selectedItem = item; //Get all the existing breadcrumb class elements, where breadcrumbItems[0] is the "Districts: all" element

    var breadcrumbItems = document.getElementsByClassName('breadcrumb'); //Get the first and the last breadcrumb class element
    // let rootItem = document.getElementsByClassName('breadcrumb');

    var rootItem = breadcrumbItems[0]; //TODO: get parent item instead of last item

    var lastItem = breadcrumbItems[breadcrumbItems.length - 1];
    lastItem.style.color = "red";
    var newBreadcrumb;
    var breadcrumb = selectedItem.cloneNode(true);

    if (breadcrumbItems.length > 1) {
      lastItem.classList.remove('breadcrumb');
      newBreadcrumb = lastItem.parentNode.replaceChild(breadcrumb, lastItem); // lastItem.parentNode.removeChild(lastItem);
      // // lastItem.innerHTML = '';
      // newBreadcrumb = lastItem.parentNode.appendChild(breadcrumb);
    } else {
      newBreadcrumb = rootItem.appendChild(breadcrumb);
    }

    newBreadcrumb.classList.add('breadcrumb');
    breadcrumb.firstElementChild.classList.toggle('submenu-collapsed');
  } // function appendBreadcrumb(element) {
  // 	let selectedItem = element;
  // 	let target = element.parentElement;
  // 	let breadcrumb = selectedItem.cloneNode(true);
  // 	target.appendChild(breadcrumb);
  // }

});