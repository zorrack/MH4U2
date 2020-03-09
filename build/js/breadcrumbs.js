require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

define(["@babel/runtime-corejs3/core-js-stable/instance/index-of"], function (_indexOf) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _indexOf = _interopRequireDefault(_indexOf);

  function createBreadcrumbs() {
    (function (win, doc) {
      'use strict'; // Return if addEventListener isn't supported

      if (!win.addEventListener) {
        return;
      } // Store Variables


      var enhanceclass = 'cutsthemustard',
          breadcrumbNav = document.getElementById('js-breadcrumb'),
          breadcrumbToggleClass = 'breadcrumb__toggle',
          breadcrumbHoverClass = 'is-toggled'; // Remove string quotes to normalize browser behavior

      var removeQuotes = function removeQuotes(string) {
        if (typeof string === 'string' || string instanceof String) {
          string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
        }

        return string;
      }; // Get value of body generated content


      var checkBreadcrumbMedia = function checkBreadcrumbMedia() {
        var media = window.getComputedStyle(breadcrumbNav, ':after').getPropertyValue('content');
        return removeQuotes(media);
      }; // Toggle className Helper Function


      var toggleClassName = function toggleClassName(element, toggleClass) {
        var reg = new RegExp('(\\s|^)' + toggleClass + '(\\s|$)');

        if (!element.className.match(reg)) {
          element.className += ' ' + toggleClass;
        } else {
          element.className = element.className.replace(reg, '');
        }
      }; // Process event on Breadcrumb Nav


      var breadcrumbListener = function breadcrumbListener(ev) {
        var _context;

        ev = ev || win.event;
        var target = ev.target || ev.srcElement;

        if ((0, _indexOf.default)(_context = target.className).call(_context, breadcrumbToggleClass) !== -1) {
          ev.preventDefault();
          toggleClassName(target.parentNode, breadcrumbHoverClass);
        }
      }; // Add Enhancement Class


      doc.documentElement.className += ' ' + enhanceclass; // Fire checkMedia to get value

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
    })(this, this.document);
  }
});