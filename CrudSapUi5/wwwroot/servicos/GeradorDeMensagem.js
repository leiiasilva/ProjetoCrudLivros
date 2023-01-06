sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function (Object, MessageBox) {
    'use strict';

    const extensao = "sap.ui.demo.walkthrough.controller.GeradorDeMensagem";
    

    return Object.extend(extensao, {

        MensagemComFuncao: function (tipo, texto, funcao) {
            return new Promise((resolve, reject) => {
                const acao = 'OK';

                let opcoes = {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: (escolha) => {
                        if (escolha === acao){
                            funcao.call(this);
                        }
                        resolve();
                    }
                }

                if (tipo == "warning")
                    MessageBox.warning(texto, opcoes);
                else if (tipo == "confirm")
                    MessageBox.confirm(texto, opcoes);
            });
        },

        MensagemErro: function (texto) {
            return new Promise((resolve, reject) => {
                MessageBox.error(texto, {
                    onClose: resolve
                });
            });
        },

        mensagemDeSucesso: function (texto) {
            return new Promise((resolve, reject) => {
                MessageBox.success(texto, {
                    onClose: resolve
                });
            });
        },
    })

});