sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function (Object, MessageBox) {
    'use strict';

    return Object.extend("sap.ui.demo.walkthrough.controller.GeradorDeMensagem", {

        MensagemComFuncao: function (tipo, texto, funcao) {
            if (tipo == "warning")
                MessageBox.warning(texto, this._funcaoPorEscolha(funcao));
            else if (tipo == "confirm")
                MessageBox.confirm(texto, this._funcaoPorEscolha(funcao));
        },

        MensagemErro: function (texto) {
            MessageBox.error(texto);
        },

        _funcaoPorEscolha: function (funcao) {
            return {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: (escolha) => {
                    if (escolha === 'OK')
                        funcao.call(this);
                }
            }
        },

        mensagemDeSucesso: function (texto) {
            MessageBox.success(texto)

        },
    })

});