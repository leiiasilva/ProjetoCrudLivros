//contem a configuração da aplicação 
sap.ui.define([
   "sap/ui/core/UIComponent", //Nosso componente herda da classe base sap.ui.core.UIComponent
   "sap/ui/model/json/JSONModel"
   

], function (UIComponent, JSONModel) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
       metadata : {
           interfaces: ["sap.ui.core.IAsyncContentCreation"],
           manifest: "json"
     },
      //A função init do componente é invocada automaticamente pelo OpenUI5 quando o componente é instanciado.
      init : function () {
         
         UIComponent.prototype.init.apply(this, arguments);

         this.getRouter().initialize();

       }
   });
});