sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
    
], function (Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		// var url= fetch(`https://localhost:7278/CrudLivro ${id}`).then(response=> response.json()).then(data => console.log(data));
		// console.log(url);

		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("telaCadastro").attachPatternMatched(this._onObjectMatched, this);
			
		},

		onObjectMatched: function (oEvent) {
            this.byId("rating").reset();
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "listaDeLivros"
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		}, 

		botaoSalvar: function(){
			var oModel =this.oView.getModel(),
				oData = oModel.getProperty("/listaDeLivros"),
				oFormData = this.byId("listaDeLivros").getModel().getData();

			oData.push(oFormData);
			oModel.setProperty("/listaDeLivros", oData);
			
			

			
		},

		botaoVoltar: function(){
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
