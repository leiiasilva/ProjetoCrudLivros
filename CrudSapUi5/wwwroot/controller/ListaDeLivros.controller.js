sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../servicos/RepositorioDeLivros"

], function (Controller, JSONModel, Filter, FilterOperator, RepositorioDeLivros) {
	"use strict";

	const caminho = "sap.ui.demo.walkthrough.controller.ListaDeLivros";
	const nomeDaLista = "listaDeLivros";

	return Controller.extend(caminho, {

		rota: null,
		_repositorio: null,
		onInit: function () {
			const rotaTelaPrincipal = "overview";
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute(rotaTelaPrincipal).attachPatternMatched(this._ajustarRota, this);
			this._repositorio = new RepositorioDeLivros;
		},

		_ajustarRota: function () {
			this.buscarLivrosDoBancoDeDados();
		},

		buscarLivrosDoBancoDeDados: async function () { // verificar o then.. colocar async await
			await this._repositorio.buscarTodosOsLivros()
			let lista;
			let modelo = new JSONModel(lista);
			await this.getView().setModel(modelo, nomeDaLista)
				// .then(lista => {
				// 	let oModel = new JSONModel(lista);
				// 	this.getView().setModel(oModel, nomeDaLista)
				// })
		},

		aoClicarEmPesquisar: function (evento) {
			const consulta = "query";
			const items = "items";
			const filtroSelecionado = "nome";
			let livrosBuscados = []; 
			let parametroPesquisa = evento.getParameter(consulta);
			if (parametroPesquisa) {
				livrosBuscados.push(new Filter(filtroSelecionado, FilterOperator.Contains, parametroPesquisa));
			}
			let listaDeLivros = this.byId(nomeDaLista);
			let buscarLivro = listaDeLivros.getBinding(items);
			buscarLivro.filter(livrosBuscados);
		},


		aoClicarNoLivroDaLista: function (evento) {
			const codigoDoLivro = "codigo";
			const rotaDetalhes = "detalhes";
			let livroASerExibido = evento.getSource();
			this.rota.navTo(rotaDetalhes, {
				id: window.encodeURIComponent(livroASerExibido.getBindingContext(nomeDaLista).getProperty(codigoDoLivro))
			});
		},

		aoClicarEmAdicionar: function () {
			const rotaDeCadastro = "telaCadastro";
			this._navegarParaRota(rotaDeCadastro, null);
		},

		_navegarParaRota(nomeDaRota, parametroDaRota = null) {
			(parametroDaRota !== null) ?
			this.rota.navTo(nomeDaRota, {
				"id": parametroDaRota
			}): this.rota.navTo(nomeDaRota)
		}
	});
});