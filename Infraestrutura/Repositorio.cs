namespace ProjetoCrud
{
    public class Repositorio : IRepositorio<Livro>
    {
        protected List<Livro> ListaDeLivros = Singleton.Instance();
        public void Cadastrar(Livro livro)
        {
            livro.Codigo = Singleton.IdInserir();
            ListaDeLivros.Add(livro);
            
        }

        public void Editar(Livro livroEditado)
        {
            var IndiceAtual = ListaDeLivros.IndexOf(BuscarPorId(livroEditado.Codigo));
            ListaDeLivros[IndiceAtual] = livroEditado;
        }

        public void Deletar(int livroId)
        {
            Livro livro = BuscarPorId(livroId);
            ListaDeLivros.Remove(livro);
        }

        public Livro BuscarPorId(int Id)
        {
            var livroSelecionado = ListaDeLivros.First(x => x.Codigo == Id);
            return livroSelecionado;
        }

        public List<Livro> BuscarTodos()
        {
            return ListaDeLivros.ToList();
        }
    }
}

    

