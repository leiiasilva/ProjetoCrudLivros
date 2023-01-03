sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	'use strict';

	return Object.extend("sap.ui.demo.walkthrough.controller.RepositorioDeLivros", {

		buscarTodosOsLivros: async function () {
			let ObterTodosOsLivros;
			await fetch(`https://localhost:7278/CrudLivro`)
				.then(response => response.json())
				.then(data => ObterTodosOsLivros = data)
			return ObterTodosOsLivros;
		},

		buscarLivroPorId: function (idLivroBuscado) {
			let livroBuscado = fetch(`https://localhost:7278/CrudLivro/${idLivroBuscado}`)
				.then((response) => response.json())
				.then(data => livroBuscado = data)
			return livroBuscado;
		},


		cadastrarLivro: async function (livroAserSalvo) {
			let livroASerCadastrado = livroAserSalvo;
			let retorno = await fetch('https://localhost:7278/CrudLivro', {
				method: 'POST',
				headers: {
					'content-type': "application/json; charset=utf-8"
				},

				body: JSON.stringify({
					nome: livroASerCadastrado.nome,
					autor: livroASerCadastrado.autor,
					editora: livroASerCadastrado.editora,
					anoPublicacao: livroASerCadastrado.anoPublicacao,
				})
			})

			return await retorno.json();
		},

		editarLivro: async function (livroEditado) {
			let livroASerEditado = livroEditado;
			await fetch(`https://localhost:7278/CrudLivro/${livroASerEditado.codigo}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				body: JSON.stringify({
					nome: livroASerEditado.nome,
					autor: livroASerEditado.autor,
					editora: livroASerEditado.editora,
					anoPublicacao: livroASerEditado.anoPublicacao,
				})
			})
		},


		deletarLivro: async function (excluirLivro) {
			excluirLivro.codigo;
			await fetch(`https://localhost:7278/CrudLivro/${excluirLivro}`, {
				method: 'DELETE'
			})
		}

	});

});