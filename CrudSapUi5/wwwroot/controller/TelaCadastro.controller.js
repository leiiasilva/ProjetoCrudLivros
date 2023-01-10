sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/RepositorioDeLivros",
	"../servicos/ValidacaoDeLivros",
	"../servicos/GeradorDeMensagem"

], function (Controller, JSONModel, MessageBox, RepositorioDeLivros, ValidacaoDeLivros, GeradorDeMensagem) {
	"use strict";

	const caminho = "sap.ui.demo.walkthrough.controller.TelaCadastro"
	const inputNome = 'inputNome';
	const inputAutor = 'inputAutor';
	const inputEditora = 'inputEditora';
	const nomeDmodeloo = 'livro';
	const rotaDaLista = "overview";
	const rotaDetalhes = "detalhes";
	let mensagem = new GeradorDeMensagem;

	return Controller.extend(caminho, {

		rota: null,
		_repositorio: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this._ajustarRota, this);
			this._repositorio = new RepositorioDeLivros;
		},

		_ajustarRota: function (evento) {
			const parametro = "arguments";
			const nomeParametro = "name";
			const rotaEditarLivro = "editarLivro";
			this.resetarTela();
			if (evento.getParameter(nomeParametro) == rotaEditarLivro) {
				let idEditar = window.decodeURIComponent(evento.getParameter(parametro).id);
				this.buscarLivro(idEditar)
			} else {
				this.getView().setModel(new sap.ui.model.json.JSONModel({}), nomeDmodeloo);
			}
		},

		buscarLivro: async function (livroASerBuscadoPorId) {
			let lista = await this._repositorio.buscarLivroPorId(livroASerBuscadoPorId)
			let modelo = new JSONModel(lista);
			this.getView().setModel(modelo, nomeDmodeloo)

		},

		aoClicarEmVoltar: function () {
			this.rota.navTo(rotaDaLista, {});
		},

		adicionarLivro: async function () {
			const mensagemCadastro = "confirmarCadastro"
			const texto = this.mensagemi18n(mensagemCadastro);
			const tipo = "confirm";
			let funcao = this._confirmacaoDeCadastro.bind(this)
			await mensagem.mensagemComFuncao(tipo, texto, funcao)
		},

		_confirmacaoDeCadastro: async function () {
			const statusHttpCriado = 201;
			const mensagemSucessoCadastro = "mensagemDeSucessoCadastro";
			const texto = this.mensagemi18n(mensagemSucessoCadastro);
			const mensagemFalhaCadastro = "mensagemDeErroCadastro";
			const textoErro = this.mensagemi18n(mensagemFalhaCadastro);
			let livroASerSalvo = this.getView().getModel(nomeDmodeloo).getData();
			let livroASerCadastrado = await this._repositorio.cadastrarLivro(livroASerSalvo);
			if (livroASerCadastrado && livroASerCadastrado.status == statusHttpCriado) {
				let livroCadastrado = await livroASerCadastrado.json();
				await mensagem.mensagemDeSucesso(texto);
				this.rota.navTo(rotaDetalhes, {
					id: livroCadastrado.codigo
				});
			} else {
				await mensagem.mensagemErro(textoErro)
			}
		},


		editarLivro: async function (livroEditado) {
			const statusHttpSucesso = 200;
			const mensagemDeSucessoEdicao = "mensagemDeSucessoEdicao";
			const texto = this.mensagemi18n(mensagemDeSucessoEdicao);
			const mensagemDeFalhaEdicao = "mensagemDeErroEdicao";
			const textoErro = this.mensagemi18n(mensagemDeFalhaEdicao);
			let resposta = await this._repositorio.editarLivro(livroEditado);
			if (resposta && resposta.status == statusHttpSucesso) {
				await mensagem.mensagemDeSucesso(texto);

			} else {
				await mensagem.mensagemErro(textoErro)
			}
			this.rota.navTo(rotaDetalhes, {
				id: livroEditado.codigo
			});
		},

		aoClicarEmSalvar: function () {
			this._validacaoDeCampos();
		},

		_validacaoDeCampos: function () {
			const mensagemValidacao = "validacaoDeCamposMensagem";
			const texto = this.mensagemi18n(mensagemValidacao);
			const inputData = "AnoPublicacao";
			let _validacaoLivro = new ValidacaoDeLivros;
			let telaCadastro = this.getView();
			let inputs = [
				telaCadastro.byId(inputNome),
				telaCadastro.byId(inputAutor),
				telaCadastro.byId(inputEditora),
			];

			let valorInputData = this.getView().byId(inputData);
			let erroDeValidacaoDeCampos = _validacaoLivro.validarCadastro(inputs, valorInputData).erroDeInput;
			let erroDeValidacaoDeData = _validacaoLivro.validarCadastro(inputs, valorInputData).erroDeData;
			let livroASerSalvo = this.getView().getModel(nomeDmodeloo).getData();

			!erroDeValidacaoDeCampos && !erroDeValidacaoDeData ?

				!livroASerSalvo.codigo ?
					this.adicionarLivro() :
					this.editarLivro(livroASerSalvo) :
				MessageBox.alert(texto);
		},

		aoClicarEmCancelar: function () {
			this._retornoDeNavegacao();
		},

		_retornoDeNavegacao: async function () {
			const mensagemCancelar = "mensagemCancelamento"
			const texto = this.mensagemi18n(mensagemCancelar);
			const tipo = "confirm";
			let funcao = this._navegarParaRota.bind(this)
			await mensagem.mensagemComFuncao(tipo, texto, funcao)
		},

		_navegarParaRota() {
			this.rota.navTo(rotaDaLista, {});
		},

		_limparCampoInput: function (entrada) {
			const estadoInicial = "None";
			entrada.setValueState(estadoInicial);
		},

		resetarTela: function () {
			const inputData = "AnoPublicacao";
			let tela = this.getView(),
				inputs = [
					tela.byId(inputNome),
					tela.byId(inputAutor),
					tela.byId(inputEditora),
					tela.byId(inputData)
				]
			inputs.forEach(x => {
				this._limparCampoInput(x);
			})
		},

		mensagemi18n: function (texto) {
			const modelo = "i18n";
			let i18n = this.getView().getModel(modelo).getResourceBundle();
			return i18n.getText(texto);
		}
	});
});