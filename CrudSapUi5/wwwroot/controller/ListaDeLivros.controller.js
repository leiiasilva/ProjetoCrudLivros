sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.ListaDeLivros", {

		// onInit: function () {
		// 	var router = sap.ui.core.UIComponent.getRouterFor(this);
		// 	router.getRoute("telaCadastro").attachPatternMatched(this._Rota, this);
			
		// },

		// _Rota: function (oEvent) {
        //     this.byId().reset();
		// 	this.getView().bindElement({
		// 		path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").listaLivro),
		// 		model: "listaDeLivros"
		// 	});
		// },
		

		botaoCadastrar : function (){ //ao clicar no botão cadastrar
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("telaCadastro");
		},

		buscarLivros: function (){
			let livroASerBuscado = fetch(`https://localhost:7278/CrudLivro`)
			.then(response => response.json())
			.then(data => livroASerBuscado(data))
			.catch(console.error('erro', error));
			return livroASerBuscado;
		}

	});
});

