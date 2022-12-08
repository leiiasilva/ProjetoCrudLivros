sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.ListaDeLivros", {
      
		botaoCadastrar : function (){ //ao clicar no botão cadastrar
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("telaCadastro");
		},

		botaoEditar: function(){
			alert("configurar botão");
		}, 

		botaoDeletar: function(){
			alert("configurar botão");
		}


	});
});

