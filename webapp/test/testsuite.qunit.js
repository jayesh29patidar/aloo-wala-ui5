sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: aloo.wala",
		defaults: {
			page: "ui5://test-resources/aloo/wala/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "aloo/wala/",
				never: "test-resources/aloo/wala/"
			},
			loader: {
				paths: {
					"aloo/wala": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for aloo.wala"
			},
			"integration/opaTests": {
				title: "Integration tests for aloo.wala"
			}
		}
	};
});
