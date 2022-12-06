sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {

		// onInit: function () {
		// 	var oRouter = this.getOwnerComponent().getRouter();
		// 	oRouter.getRoute("telaCadastro").attachPatternMatched(this._onObjectMatched, this);
		// },

		// _onObjectMatched: function (oEvent) {
        //     this.byId("telaCadastro").reset();
		// 	this.getView().bindElement({
		// 		path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
		// 		model: "invoice"
		// 	});
		// },

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}

	});
});
