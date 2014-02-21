(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('SplitViewStack', function($rootScope) {
		var SplitViewStack = Class.extend({
			splitViews: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.splitView = {};
				$rootScope.ons.splitView.setMainPage = this.setMainPage.bind(this);
				$rootScope.ons.splitView.setSecondaryPage = this.setSecondaryPage.bind(this);
				$rootScope.ons.splitView.toggle = this.toggle.bind(this);				
			},

			_findClosestSplitView: function($event) {
				// finding the right navigator
				var splitView;
				if ($event) {
					var splitViewElement = $rootScope.ons.upTo($event.target, 'ons-split-view');
					splitView = angular.element(splitViewElement).isolateScope();
				} else {
					splitView = this.splitViews[this.splitViews.length - 1];
				}

				return splitView;
			},

			_checkExistence: function() {
				if (this.splitViews.length == 0) {
					throw new Error('oops!! no navigator registerred');
				}
			},

			addSplitView: function(splitView) {
				this.splitViews.push(splitView);
			},

			setMainPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setMainPage(page);
			},

			setSecondaryPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setSecondaryPage(page);
			},

			toggle: function($event) {
				this._checkExistence();

				var splitView = this._findClosestSplitView($event);
				splitView.toggle();
			}
		});

		return new SplitViewStack();
	});
})();