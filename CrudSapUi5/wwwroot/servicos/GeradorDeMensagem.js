sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function(Object, MessageBox) {
    'use strict';

    return Object.extend("sap.ui.demo.walkthrough.controller.GeradorDeMensagem", {

        paraConfirmarCadastro: function(){
            MessageBox.confirm("Deseja realmente cadastrar esse livro",{
                title: "Confirmação",
                onClose : null,
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