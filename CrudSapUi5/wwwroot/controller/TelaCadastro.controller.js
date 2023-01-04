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

	return Controller.extend("sap.ui.demo.walkthrough.controller.TelaCadastro", {

		rota: null,
		onInit: function () {
			this.rota = this.getOwnerComponent().getRouter();
			this.rota.attachRoutePatternMatched(this.ajustarRota, this);
		},

		ajustarRota: function (evento) {
			if (evento.getParameter("name") == "editarLivro") {
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

		adicionarLivro: async function (livroASerSalvo) {
			let repositorio = new RepositorioDeLivros;
			let result = await repositorio.cadastrarLivro(livroASerSalvo);
			this.rota.navTo(rotaDetalhes, {
				id: result.codigo
			});
		},


		editarLivro: async function (livroEditado) {
			let _repositorio = new RepositorioDeLivros;
			_repositorio.editarLivro(livroEditado);
			this.rota.navTo(rotaDetalhes, {
				id: livroEditado.codigo

			});
		},
		aoClicarEmSalvar: function () {
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

		_paraConfirmarCadastro: function(rota){
            MessageBox.confirm("Deseja realmente cadastrar esse livro",{
                title: "Confirmação",
				emphasizedAction: sap.m.MessageBox.Action.OK,
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.M.MessageBox.Action.CANCEL
                ],
                onClose: function(oAction){
                    if(oAction === 'OK'){
                        // MessageBox.show("Livro Cadastrado")
                        this._navegarParaRota(rota, null);
                    }
                }.bind(this)
            })
        },
	});
});