sap.ui.define([
    "sap/m/MessageBox"
], function(MessageBox) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.GeradorDeMensagem", {

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
                    }

                }
            })
        }


    })
    
});