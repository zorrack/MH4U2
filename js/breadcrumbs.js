function createBreadcrumbs(){
	(function(win, doc) {
			'use strict';

			// Return if addEventListener isn't supported
			if (!win.addEventListener) {
				return;
			}

			// Store Variables
			var enhanceclass = 'cutsthemustard',
					breadcrumbNav = document.getElementById('js-breadcrumb'),
					breadcrumbToggleClass = 'breadcrumb__toggle',
					breadcrumbHoverClass = 'is-toggled';

			// Remove string quotes to normalize browser behavior
			var removeQuotes = function(string) {
					if (typeof string === 'string' || string instanceof String) {
						string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
					}
					return string;
			};

			// Get value of body generated content
			var checkBreadcrumbMedia = function() {
					var media = window.getComputedStyle(breadcrumbNav, ':after').getPropertyValue('content');
					return removeQuotes(media);
			};

			// Toggle className Helper Function
			var toggleClassName = function(element, toggleClass) {
					var reg = new RegExp('(\\s|^)' + toggleClass + '(\\s|$)');
					if (!element.className.match(reg)) {
						element.className += ' ' + toggleClass;
					} else {
						element.className = element.className.replace(reg, '');
					}
			};

			// Process event on Breadcrumb Nav
			var breadcrumbListener = function(ev) {
					ev = ev || win.event;
					var target = ev.target || ev.srcElement;
					if (target.className.indexOf(breadcrumbToggleClass) !== -1) {
						ev.preventDefault();
						toggleClassName(target.parentNode, breadcrumbHoverClass);
					}
			};

			// Add Enhancement Class
			doc.documentElement.className += ' ' + enhanceclass;

			// Fire checkMedia to get value
			checkBreadcrumbMedia();

			/**
			 * Do nothing if pointing device can relay a hover state
			 * Else, attach event listener to breadcrumb
			 */
			if (checkBreadcrumbMedia() === "hover") {
				return;
			} else {
				breadcrumbNav.addEventListener('click', breadcrumbListener, false);
			}

	}(this, this.document));

}
