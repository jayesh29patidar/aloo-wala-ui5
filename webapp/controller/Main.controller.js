// sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
// 	"use strict";

// 	return BaseController.extend("aloo.wala.controller.Main", {
// 		sayHello: function () {
// 			MessageBox.show("Hello World!");
// 		}
// 	});
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("aloo.wala.controller.Main", {

        onInit: function () {
            // // Sample Aloo Wala menu data
            // var oData = {
            //     dishes: [
            //         {
            //             name: "Aloo Samosa",
            //             category: "Fried",
            //             price: 25,
            //             isHealthy: false
            //         },
            //         {
            //             name: "Air-Fried Aloo Tikki",
            //             category: "Air-Fried",
            //             price: 40,
            //             isHealthy: true
            //         },
            //         {
            //             name: "Cheese Aloo Burger",
            //             category: "Fast Food",
            //             price: 80,
            //             isHealthy: false
            //         },
            //         {
            //             name: "Masala Aloo Chaat",
            //             category: "Snacks",
            //             price: 60,
            //             isHealthy: true
            //         }
            //     ]
            // };

            // var oModel = new JSONModel(oData);
            // this.getView().setModel(oModel);
        },

        onOpenAddDishDialog: function () {
            var oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "aloo.wala.view.AddDishDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCancelAddDish: function () {
            this.byId("idAddDishDialog").close();
        },

        onSaveDish: function () {
            var sName = this.byId("idDishName").getValue();
            var sCategory = this.byId("idDishCategory").getValue();
            var fPrice = parseFloat(this.byId("idDishPrice").getValue());
            var bHealthy = this.byId("idDishHealthy").getSelected();

            if (!sName || !sCategory || isNaN(fPrice)) {
                MessageToast.show("Please enter Name, Category and valid Price.");
                return;
            }

            // Get OData V4 list binding for /Dishes
            var oTable = this.byId("idDishesTable");
            var oListBinding = oTable.getBinding("items");

            // Create new entity via OData V4
            oListBinding.create({
                name: sName,
                category: sCategory,
                price: fPrice,
                isHealthy: bHealthy
            });

            MessageToast.show("Dish created via OData service.");
            this.onCancelAddDish();
        },

        // onSaveDish: function () {
        //     var oView = this.getView();
        //     var oModel = oView.getModel();
        //     var aDishes = oModel.getProperty("/dishes");

        //     var sName = this.byId("idDishName").getValue();
        //     var sCategory = this.byId("idDishCategory").getValue();
        //     var fPrice = parseFloat(this.byId("idDishPrice").getValue());
        //     var bHealthy = this.byId("idDishHealthy").getSelected();

        //     if (!sName || !sCategory || isNaN(fPrice)) {
        //         MessageToast.show("Please enter Name, Category and valid Price.");
        //         return;
        //     }

        //     aDishes.push({
        //         name: sName,
        //         category: sCategory,
        //         price: fPrice,
        //         isHealthy: bHealthy
        //     });

        //     oModel.setProperty("/dishes", aDishes);
        //     MessageToast.show("Dish added to Aloo Wala menu!");

        //     this.onCancelAddDish();
        // },

		// onSearch: function (oEvent) {
		// 	var sQuery = oEvent.getSource().getValue();
		// 	var oTable = this.byId("idDishesTable");
		// 	var oBinding = oTable.getBinding("items");

		// 	if (sQuery) {
		// 		var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
		// 		oBinding.filter([oFilter]);
		// 	} else {
		// 		oBinding.filter([]); // Clear filters
		// 	}
		// },

        



		// onCategoryFilter: function (oEvent) {
		// 	var sCategory = oEvent.getSource().getSelectedKey();
		// 	var oTable = this.byId("idDishesTable");
		// 	var oBinding = oTable.getBinding("items");

		// 	if (sCategory) {
		// 		var oFilter = new sap.ui.model.Filter("category", sap.ui.model.FilterOperator.EQ, sCategory);
		// 		oBinding.filter([oFilter]);
		// 	} else {
		// 		oBinding.filter([]);
		// 	}
		// },

		// onHealthyOnly: function (oEvent) {
		// 	var bPressed = oEvent.getSource().getPressed();
		// 	var oTable = this.byId("idDishesTable");
		// 	var oBinding = oTable.getBinding("items");

		// 	if (bPressed) {
		// 		var oFilter = new sap.ui.model.Filter("isHealthy", sap.ui.model.FilterOperator.EQ, true);
		// 		oBinding.filter([oFilter]);
		// 	} else {
		// 		oBinding.filter([]);
		// 	}
		// }

        onSearch: function (oEvent) {
            var sQuery = oEvent.getSource().getValue();
            var oTable = this.byId("idDishesTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];
            if (sQuery) {
                aFilters.push(new sap.ui.model.Filter("name",
                    sap.ui.model.FilterOperator.Contains, sQuery));
            }
            oBinding.filter(aFilters);
        },

        onCategoryFilter: function (oEvent) {
            var sCategory = oEvent.getSource().getSelectedKey();
            var oTable = this.byId("idDishesTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];
            if (sCategory) {
                aFilters.push(new sap.ui.model.Filter("category",
                    sap.ui.model.FilterOperator.EQ, sCategory));
            }
            oBinding.filter(aFilters);
        },

        onHealthyOnly: function (oEvent) {
            var bPressed = oEvent.getSource().getPressed();
            var oTable = this.byId("idDishesTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];
            if (bPressed) {
                aFilters.push(new sap.ui.model.Filter("isHealthy",
                    sap.ui.model.FilterOperator.EQ, true));
            }
            oBinding.filter(aFilters);
        }




    });
});
