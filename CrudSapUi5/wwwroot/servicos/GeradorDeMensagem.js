sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox",
    "../servicos/RepositorioDeLivros"
], function(Object, MessageBox, RepositorioDeLivros) {
    'use strict';

    return Object.extend("sap.ui.demo.walkthrough.controller.GeradorDeMensagem", {

        paraConfirmarCadastro: function(){
           
            MessageBox.confirm("Deseja realmente cadastrar esse livro",{
                title: "Confirmação",
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.M.MessageBox.Action.CANCEL
                ],
                onClose: function(oAction){
                    if(oAction == 'OK'){
                        MessageBox.show("Livro Cadastrado")
                        // this._navegarParaRota(rota, null);
                    }

                }
            })
        },

        paraConfirmarEdicao: function(){
            let repositorio = new RepositorioDeLivros;
            MessageBox.confirm("Deseja realmente editar esse livro",{
                title: "Confirmação", 
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.m.MessageBox.Action.CANCEL
                ],
                onClose: function(confirmacao){
                    if(confirmacao === 'OK'){
                        // repositorio.editarLivro()
                        // this._navegarParaRota(rota, null)
                    }
                }
            })

        },

        paraConfirmarExclusao: function(){
            MessageBox.confirm("Deseja realmente deletar esse livro",{
                title: "Confirmação",
                actions: [
                    sap.m.MessageBox.Action.OK,
                    sap.m.MessageBox.Action.CANCEL
                ],
                onClose: function(confirmacao){
                    if(confirmacao === 'OK'){
                        this._navegarParaRota(rota, null)
                    }
                }
            })
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
		}


    })
    
});