sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	'use strict';

	const url = `https://localhost:7278/CrudLivro`;
	const conteudo = "application/json; charset=utf-8";
	const caminho = "sap.ui.demo.walkthrough.controller.RepositorioDeLivros";
	return Object.extend(caminho, {

		buscarTodosOsLivros: async function () {
			let ObterTodosOsLivros;
			await fetch(url)
				.then(response => response.json())
				.then(data => ObterTodosOsLivros = data)
			return ObterTodosOsLivros;
		},

		buscarLivroPorId: function (idLivroBuscado) {
			const urlLivroBuscadoPorId = `${url}/${idLivroBuscado}`;
			let livroBuscado = fetch(urlLivroBuscadoPorId)
				.then((response) => response.json())
				.then(data => livroBuscado = data)
			return livroBuscado;
		},

		cadastrarLivro: async function (livroAserSalvo) {
			let retorno = await fetch(url, {
				method: 'POST',
				headers: {
					'content-type': conteudo
				},

				body: JSON.stringify({
					nome: livroAserSalvo.nome,
					autor: livroAserSalvo.autor,
					editora: livroAserSalvo.editora,
					anoPublicacao: livroAserSalvo.anoPublicacao,
				})
			})
			return retorno;
		},

		editarLivro: async function (livroEditado) {
			let livroASerEditado = livroEditado;
			const urlPut = `${url}/${livroASerEditado.codigo}`;
			return await fetch(urlPut, {
				method: 'PUT',
				headers: {
					"Content-Type": conteudo
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
			const urlDelete = `${url}/${excluirLivro}`
			excluirLivro.codigo;
			return await fetch(urlDelete, {
				method: 'DELETE'
			})
		}
	});

});