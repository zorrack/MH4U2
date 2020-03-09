define(["@babel/runtime-corejs3/core-js-stable/set-timeout"], function (_setTimeout2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _setTimeout2 = _interopRequireDefault(_setTimeout2);
  L.Control.Loader = L.Control.extend({
    options: {},
    onAdd: function onAdd(map) {
      this.container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      this.loaderContainer = L.DomUtil.create('div', 'leaflet-loader-container', this._map._container);
      this.loaderBG = L.DomUtil.create('div', 'leaflet-loader-background', this.loaderContainer);
      this.loader = L.DomUtil.create('div', 'leaflet-loader', this.loaderBG);

      for (var i = 0; i < 3; i++) {
        L.DomUtil.create('div', '', this.loader);
      }

      this._map.dragging.disable();

      this._map.touchZoom.disable();

      this._map.doubleClickZoom.disable();

      this._map.scrollWheelZoom.disable();

      return this.container;
    },
    hide: function hide() {
      this.loaderBG.style.animation = "hideLoader 1s";
      this.loaderBG.style.webkitAnimationName = "hideLoader 1s";
      this.loaderBG.style.opacity = "0";

      var _this = this;

      (0, _setTimeout2.default)(function () {
        _this.loaderContainer.style.display = "none";
      }, 500);

      this._map.dragging.enable();

      this._map.touchZoom.enable();

      this._map.doubleClickZoom.enable();

      this._map.scrollWheelZoom.enable();
    }
  });

  L.control.loader = function (options) {
    var newControl = new L.Control.Loader(options);
    return newControl;
  };
});