sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../servicos/RepositorioDeLivros"

], function (Controller, JSONModel, Filter, FilterOperator, RepositorioDeLivros) {
	"use strict";

	const nomeDaLista = "listaDeLivros";
	return Controller.extend("sap.ui.demo.walkthrough.controller.ListaDeLivros", {

		rota: null,
		onInit: function () {
			const rotaTelaPrincipal = "overview";
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute(rotaTelaPrincipal).attachPatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function () {
			this.buscarLivrosDoBancoDeDados();
		},

		buscarLivrosDoBancoDeDados: function () {
			let repositorio = new RepositorioDeLivros;
			repositorio.buscarTodosOsLivros()
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, nomeDaLista)
				})
		},

		aoClicarEmPesquisar: function (evento) {
			const filtroSelecionado = "nome";
			let livrosBuscados = []; 
			let parametroPesquisa = evento.getParameter("query");
			if (parametroPesquisa) {
				livrosBuscados.push(new Filter(filtroSelecionado, FilterOperator.Contains, parametroPesquisa));
			}
			let listaDeLivros = this.byId(nomeDaLista);
			let buscarLivro = listaDeLivros.getBinding("items");
			buscarLivro.filter(livrosBuscados);
		},

		aoClicarEmAdicionar: function () {
			const rotaDeCadastro = "telaCadastro";
			this._navegarParaRota(rotaDeCadastro, null);
		},

		aoClicarNoLivroDaLista: function (evento) {
			const codigoDoLivro = "codigo";
			const rotaDetalhes = "detalhes";
			let livroASerExibido = evento.getSource();
			this.rota.navTo(rotaDetalhes, {
				id: window.encodeURIComponent(livroASerExibido.getBindingContext(nomeDaLista).getProperty(codigoDoLivro))
			});
		},

		_navegarParaRota(nomeDaRota, parametroDaRota = null) {
			let rota = this.getOwnerComponent().getRouter();
			(parametroDaRota !== null) ?
			rota.navTo(nomeDaRota, {
				"id": parametroDaRota
			}): rota.navTo(nomeDaRota)
		}
	});
});