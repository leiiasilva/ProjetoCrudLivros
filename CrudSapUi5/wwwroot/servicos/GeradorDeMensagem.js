sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function (Object, MessageBox) {
    'use strict';

    const caminho = "sap.ui.demo.walkthrough.controller.GeradorDeMensagem";
    return Object.extend(caminho, {

        mensagemComFuncao: function (tipo, texto, funcao) {
            return new Promise((resolve, reject) => {
                const acao = 'OK';
                const mensagemAtencao = "warning";
                const mensagemConfirmacao = "confirm";
                let opcoes = {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: (escolha) => {
                        if (escolha === acao) {
                            funcao.call(this);
                        }
                        resolve();
                    }
                }
                if (tipo == mensagemAtencao)
                    MessageBox.warning(texto, opcoes);
                else if (tipo == mensagemConfirmacao)
                    MessageBox.confirm(texto, opcoes);
            });
        },

        mensagemErro: function (texto) {
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