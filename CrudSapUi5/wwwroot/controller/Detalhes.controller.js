sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/RepositorioDeLivros",
	"../servicos/GeradorDeMensagem"

], function (Controller, JSONModel, MessageBox, RepositorioDeLivros, GeradorDeMensagem) {
	"use strict";

	const nomeDoModelo = "livro";
	const rotaDaLista = "overview";
	let mensagem = new GeradorDeMensagem;

	return Controller.extend("sap.ui.demo.walkthrough.controller.Detalhes", {

		rota: null,
		onInit: function () {
			const rotaDetalhes = "detalhes";
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.getRoute(rotaDetalhes).attachPatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			let mostrarDetalhes = evento.getParameter("arguments").id;
			this.buscarLivroDaLista(mostrarDetalhes);
		},

		buscarLivroDaLista: function (livroASerExibido) {
			let repositorio = new RepositorioDeLivros;
			repositorio.buscarLivroPorId(livroASerExibido)
				.then(lista => {
					let modelo = new JSONModel(lista);
					this.getView().setModel(modelo, nomeDoModelo)
				})
		},

		aoClicarEmVoltar: function () {
			this.rota.navTo(rotaDaLista, {});
		},

		aoClicarEmEditar: function () {
			const texto = "Deseja realmente editar esse Livro";
			const tipo = "confirm";
			let funcao = this._aoConfirmarEditar.bind(this);
			mensagem.MensagemComFuncao(tipo, texto, funcao)
		},

		_aoConfirmarEditar: function () {
			const rotaEdicaoDeLivro = "editarLivro";
			let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this.rota.navTo(rotaEdicaoDeLivro, {
				id: idEditarLivro
			});
		},

		aoClicarEmDeletar: function () {
			const texto = "Deseja realmente deletar esse livro?";
			const tipo = "confirm";
			let funcao = this._aoConfirmarDeletar.bind(this);
			mensagem.MensagemComFuncao(tipo, texto, funcao)
		},

		_aoConfirmarDeletar: function () {
			let excluirLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			let repositorio = new RepositorioDeLivros;
			repositorio.deletarLivro(excluirLivro)
				.then((resposta) => {
					if (resposta && resposta.status == 200) {
						mensagem.mensagemDeSucesso("Deletado com sucesso")
					} else {
						mensagem.MensagemErro("Falha ao deletar livro")
					}

				}, this._navegarParaLista(rotaDaLista, null))
		},

		_navegarParaLista(nomeDaRota, codigo) {
			let rota = this.getOwnerComponent().getRouter();
			if (codigo !== null) {
				rota.navTo(nomeDaRota, {
					"id": codigo
				})
			} else {
				rota.navTo(nomeDaRota)
			}
		},
	});
})