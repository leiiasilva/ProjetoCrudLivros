sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.ListaDeLivros", {

		onInit: function () {
			this.getOwnerComponent();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("overview").attachPatternMatched(this.ajustarRota, this); 
		},
		
		ajustarRota: function () {
			this.mostrarLista();
			
		},


		buscarLivros: async function (){
			let livroASerBuscado;
			 await fetch(`https://localhost:7278/CrudLivro`)
			.then(response => response.json())
			.then(data => livroASerBuscado = data)
			return livroASerBuscado;
		},

		mostrarLista: function(){
			 var exibirLista = this.buscarLivros();
			 exibirLista.then(lista => {
				let oModel = new JSONModel(lista);
				this.getView().setModel(oModel, "listaDeLivros");
				
			 })
				

		},
		botaoCadastrar : function (oEvent){ //ao clicar no botão cadastrar
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("telaCadastro")
		},
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detalhes", {
				id: window.encodeURIComponent(oItem.getBindingContext("listaDeLivros").getProperty("codigo"))
			});
		}

	});
});

