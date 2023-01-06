sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../servicos/RepositorioDeLivros",
	"../servicos/GeradorDeMensagem"

], function (Controller, JSONModel, RepositorioDeLivros, GeradorDeMensagem) {
	"use strict";

	const caminho = "sap.ui.demo.walkthrough.controller.Detalhes";
	const nomeDoModelo = "livro";
	const rotaDaLista = "overview";
	let mensagem = new GeradorDeMensagem;

	return Controller.extend(caminho, {

		rota: null,
		_repositorio: null, //propriedade
		onInit: function () {
			const rotaDetalhes = "detalhes";
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute(rotaDetalhes).attachPatternMatched(this._ajustarRota, this);
			this._repositorio =  new RepositorioDeLivros;
		},

		_ajustarRota: function (evento) {
			const parametro = "arguments";
			let mostrarDetalhes = evento.getParameter(parametro).id;
			this.buscarLivroDaLista(mostrarDetalhes);
		},

		buscarLivroDaLista: function (livroASerExibido) { // verificar para arrumar o then e usar async e await
			this._repositorio.buscarLivroPorId(livroASerExibido)
				.then(lista => {
					let modelo = new JSONModel(lista);
					this.getView().setModel(modelo, nomeDoModelo)
				})
		},

		aoClicarEmVoltar: function () {
			this.rota.navTo(rotaDaLista, {});
		},

		aoClicarEmEditar: async function () {
			const texto = "Deseja realmente editar esse Livro";
			const tipo = "confirm";
			let funcao = this._aoConfirmarEditar.bind(this);
			await mensagem.MensagemComFuncao(tipo, texto, funcao);
		},

		_aoConfirmarEditar: function () {
			const rotaEdicaoDeLivro = "editarLivro";
			let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this.rota.navTo(rotaEdicaoDeLivro, {
				id: idEditarLivro
			});
		},

		aoClicarEmDeletar: async  function () {
			const texto = "Deseja realmente deletar esse livro?";
			const tipo = "confirm";
			let funcao = this._aoConfirmarDeletar.bind(this);
			await mensagem.MensagemComFuncao(tipo, texto, funcao);
		},

		_aoConfirmarDeletar: async function () {
			let excluirLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this._repositorio.deletarLivro(excluirLivro);
			 await mensagem.mensagemDeSucesso("Livro deletado com sucesso");
			 this._navegarParaLista(rotaDaLista, null);

		},

		_navegarParaLista(nomeDaRota, codigo) { // verificar sobre a string 'codigo'
			if (codigo !== null) {
				this.rota.navTo(nomeDaRota, {
					"codigo": codigo
				});
			} else {
				this.rota.navTo(nomeDaRota)
			}
		},
	});
})