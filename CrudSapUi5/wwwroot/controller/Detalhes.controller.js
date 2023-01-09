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
		_repositorio: null, 
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

		buscarLivroDaLista: async function (livroASerExibido) { 
			let lista = await this._repositorio.buscarLivroPorId(livroASerExibido)
			let modelo = new JSONModel(lista);
				this.getView().setModel(modelo, nomeDoModelo)
				
		},

		aoClicarEmVoltar: function () {
			this.rota.navTo(rotaDaLista, {});
		},

		aoClicarEmEditar: async function () {
			const mensagemDeConfirmacao = "confirmacaoEdicao";
			const texto = this.mensagemi18n(mensagemDeConfirmacao);
			const tipo = "confirm";
			let funcao = this._aoConfirmarEditar.bind(this);
			await mensagem.mensagemComFuncao(tipo, texto, funcao);
		},

		_aoConfirmarEditar: function () {
			const rotaEdicaoDeLivro = "editarLivro";
			let idEditarLivro = this.getView().getModel(nomeDoModelo).getData().codigo
			this.rota.navTo(rotaEdicaoDeLivro, {
				id: idEditarLivro
			});
		},

		aoClicarEmDeletar: async  function () {
			const confirmacao = "confirmarExclusao";
			const texto = this.mensagemi18n(confirmacao);
			const tipo = "confirm";
			let funcao = this._aoConfirmarDeletar.bind(this);
			await mensagem.mensagemComFuncao(tipo, texto, funcao);
		},

		_aoConfirmarDeletar: async function () {
			const statusHttp = 200;
			let resposta;
			const mensagemSucesso = "mensagemDeSucessoExclusao";
			const texto = this.mensagemi18n(mensagemSucesso);
			let excluirLivro = this.getView().getModel(nomeDoModelo).getData().codigo+2
			resposta = await this._repositorio.deletarLivro(excluirLivro);
			if(resposta && resposta.status == statusHttp){
			 	await mensagem.mensagemDeSucesso(texto);
				 this._navegarParaLista(rotaDaLista, null);
			}else{
				await mensagem.mensagemErro("Falha ao deletar livro");
			}
			
			// this._navegarParaLista(rotaDaLista, null);

		},

		_navegarParaLista(nomeDaRota, codigo) { 
			if (codigo !== null) {
				this.rota.navTo(nomeDaRota, {
					id: codigo
				});
			} else {
				this.rota.navTo(nomeDaRota)
			}
		},

		mensagemi18n: function(texto) {
			const modelo = "i18n";
			let i18n = this.getView().getModel(modelo).getResourceBundle();
			return i18n.getText(texto);
		}
	});
})