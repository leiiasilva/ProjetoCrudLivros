sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/RepositorioDeLivros",
	"../servicos/ValidacaoDeLivros",
	"../servicos/GeradorDeMensagem"

], function (Controller, JSONModel, MessageBox, RepositorioDeLivros, ValidacaoDeLivros, GeradorDeMensagem) {
	"use strict";

	const inputNome = 'inputNome';
	const inputAutor = 'inputAutor';
	const inputEditora = 'inputEditora';
	const nomeDoModelo = 'livro';
	const rotaDaLista = "overview";
	const rotaDetalhes = "detalhes";
	let mensagem = new GeradorDeMensagem;

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this._ajustarRota, this);
		},

		_ajustarRota: function (evento) {
			const  nomeParametro = "name";
			const rotaEditarLivro = "editarLivro";
			this.resetarTela();
			if (evento.getParameter(nomeParametro) == rotaEditarLivro) {
				var idEditar = window.decodeURIComponent(evento.getParameter("arguments").id);
				this.buscarLivro(idEditar)
			} else {
				this.getView().setModel(new sap.ui.model.json.JSONModel({}), nomeDoModelo);
			}
		},


		buscarLivro: function (livroASerBuscadoPorId) {
			let repositorio = new RepositorioDeLivros;
			repositorio.buscarLivroPorId(livroASerBuscadoPorId)
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, nomeDoModelo)
				})
		},

		aoClicarEmVoltar: function () {
			this.rota.navTo(rotaDaLista, {});
		},

		adicionarLivro: function (livroASerSalvo) {
			const texto = "Deseja realmente cadastrar esse livro?";
			const tipo = "confirm";
			let funcao = this._paraConfirmarCadastro(livroASerSalvo)
			mensagem.MensagemComFuncao(tipo, texto, funcao)
		},


		_paraConfirmarCadastro: function (livroASerSalvo) {
			MessageBox.success("Livro cadastrado com sucesso", {
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (confirmacao) {
					if (confirmacao === 'OK') {
						this._confirmacaoDeCadastro(livroASerSalvo)
					}
				}.bind(this)
			})
		},

		_confirmacaoDeCadastro: async function (livroASerSalvo) {
			let repositorio = new RepositorioDeLivros;
			let result = await repositorio.cadastrarLivro(livroASerSalvo);
			this.rota.navTo(rotaDetalhes, {
				id: result.codigo
			});
		},


		editarLivro: function (livroEditado) {
			let _repositorio = new RepositorioDeLivros;
			_repositorio.editarLivro(livroEditado)
				.then(() => {
					mensagem.mensagemDeSucesso("Livro editado com sucesso")
				})
			this.rota.navTo(rotaDetalhes, {
				id: livroEditado.codigo
			});
		},

		aoClicarEmSalvar: function () {
			this._validacaoDeCampos();
		},

		_validacaoDeCampos: function(){
			const inputData = "AnoPublicacao";
			let _validacaoLivro = new ValidacaoDeLivros;
			let telaCadastro = this.getView();
			let inputs = [
				telaCadastro.byId(inputNome),
				telaCadastro.byId(inputAutor),
				telaCadastro.byId(inputEditora),
			];

			let valorInputData = this.getView().byId(inputData);
			let erroDeValidacaoDeCampos = _validacaoLivro.ValidarCadastro(inputs, valorInputData).erroDeInput;
			let erroDeValidacaoDeData = _validacaoLivro.ValidarCadastro(inputs, valorInputData).erroDeData;
			let livroASerSalvo = this.getView().getModel(nomeDoModelo).getData();

			!erroDeValidacaoDeCampos && !erroDeValidacaoDeData ?

				!livroASerSalvo.codigo ?
					this.adicionarLivro(livroASerSalvo) :
					this.editarLivro(livroASerSalvo) :
				MessageBox.alert("Preencha todos os campos");
		},

		aoClicarEmCancelar: function () {
			this._retornoDeNavegacao(rotaDaLista);
		},

		_retornoDeNavegacao: function (rota) {
			MessageBox.confirm("Ao voltar todas as informações serão perdidas. Deseja continuar?", {
				title: "Confirmação",
				emphasizedAction: sap.m.MessageBox.Action.OK,
				actions: [sap.m.MessageBox.Action.OK,
				sap.m.MessageBox.Action.CANCEL
				],
				onClose: function (confirmacao) {
					if (confirmacao === 'OK') {
						this._navegarParaRota(rota, null);
					}
				}.bind(this)
			});
		},

		_navegarParaRota(nomeDaRota, codigo) {
			let rota = this.getOwnerComponent().getRouter();
			if (codigo !== null) {
				rota.navTo(nomeDaRota, {
					"id": codigo
				})
			} else {
				rota.navTo(nomeDaRota)
			}
		},

		_limparCampoInput: function(entrada) {
			const estadoInicial = "None";
            entrada.setValueState(estadoInicial);
		},

		resetarTela: function (){
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
		}
	});
});