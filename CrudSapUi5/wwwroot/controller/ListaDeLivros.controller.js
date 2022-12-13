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
			oRouter.getRoute("overview").attachPatternMatched(this.ajustarRota, this); //só será acionado para a rota que tiver um padrão correspondente
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
		botaoCadastrar : function (){ //ao clicar no botão cadastrar
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("telaCadastro");
		},
		

	});
});

