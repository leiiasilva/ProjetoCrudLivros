sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../servicos/Repositorio.controller",
	"../servicos/Validacao.controller"


], function (Controller, History, JSONModel, MessageBox, Repositorio, Validacao) {
	"use strict";

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
				this.getView().setModel(new sap.ui.model.json.JSONModel({}), "livro");
			}
		},


		buscarLivro: function (livroASerBuscadoPorId) {
			const nomeDoModelo = "livro";
			let repositorio = new Repositorio;
			repositorio.buscarLivroPorId(livroASerBuscadoPorId)
				.then(lista => {
					let oModel = new JSONModel(lista);
					this.getView().setModel(oModel, nomeDoModelo)
				})
		},


		aoClicarEmVoltar: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.rota.navTo("overview", {});
			}
		},


		adicionarLivro: function (livroAserSalvo) {
			let repositorio = new Repositorio;
			repositorio.cadastrarLivro(livroAserSalvo);
			this.rota.navTo("overview", {
				id: livroAserSalvo.codigo

			});
		},


		editarLivro: async function (livroEditado) {
			let _repositorio = new Repositorio;
			_repositorio.editarLivro(livroEditado);
			this.rota.navTo("detalhes", {
				id: livroEditado.codigo

			});
		},

		aoClicarEmSalvar: function () {
			var salvarLivro = this.getView().getModel("livro").getData();
			var telaCadastro = this.getView(),
				inputs = [ 
				telaCadastro.byId("inputNome"),
				// telaCadastro.byId("inputAutor"),
				// telaCadastro.byId("inputEditora"),

				],
				validacao = false;
				inputs.forEach(function (input) {
					validacao = this.validarCampo(input) || validacao;
				}, this);

				if (!validacao){
					if (!!salvarLivro.codigo) {
						this.editarLivro(salvarLivro)
						alert("EDITADO")
					} else {
						this.adicionarLivro(salvarLivro)
						alert("cadastrado")
					}

				} else{
					MessageBox.alert("Todos os campos devem ser preenchidos");
				}




			// if (!!salvarLivro.codigo) {
			// 	this.editarLivro(salvarLivro)
			// 	alert("EDITADO")
			// } else {
			// 	this.adicionarLivro(salvarLivro)
			// 	alert("cadastrado")
			// };

		},

		// validacaoData: function(){
		// 	let validacao = new Date();
		// 	validacao = this.byId("AnoPublicacao").setInitialFocusedDateValue(new Date(2017, 5, 13));
		// }

		validarCampo: function (input){
			var condicao = 'None';
			var validacao = false;
			var oBinding = input.getBinding("value");
	
			let dataMinima = new Date(1860, 1, 1).toISOString();
			let dataMaxima = new Date().toISOString();
			var inputData = this.getView().byId("AnoPublicacao").getValue();
	
			if(inputData.length == 0){
				condicao = "Error"
				validacao = true;
				
			}else{
				var dataFormatada = new Date(inputData).toISOString();
			}			
			try {
				oBinding.getType().validateValue(input.getValue());
				if(dataFormatada > dataMinima && dataFormatada < dataMaxima){
					validacao = false;
					condicao = "None";
				}else{
					validacao = true;
					condicao = "Error";
				}
			} catch (oException) {
				condicao = "Error";
				validacao = true;
			}
			input.setValueState(condicao);
			return validacao;
		}


	});
});

