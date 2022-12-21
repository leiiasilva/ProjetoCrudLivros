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
			this.exibirListaNaTela();
		},



		buscarLivrosDoBancoDeDados: async function () {
			let livroASerBuscado;
			await fetch(`https://localhost:7278/CrudLivro`)
				.then(response => response.json())
				.then(data => livroASerBuscado = data)
			return livroASerBuscado;
		},

		exibirListaNaTela: function () {
			var exibirLivro = this.buscarLivrosDoBancoDeDados();
			exibirLivro.then(lista => {
				let oModel = new JSONModel(lista);
				this.getView().setModel(oModel, "listaDeLivros");

			})


		},
		aoClicarEmAdicionar: function () { //ao clicar no botão cadastrar
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("telaCadastro")
		},

		aoClicarNoLivroDaLista: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detalhes", {
				id: window.encodeURIComponent(oItem.getBindingContext("listaDeLivros").getProperty("codigo"))
			});
		}

	});
});

