namespace ProjetoCrud
{
    public interface IRepositorio<Livro>
    {
        void Cadastrar(Livro livro);
        void Editar(Livro livro);
        void Deletar(int livroId);
        List<Livro> BuscarTodos();
        Livro BuscarPorId(int Id);
    }
}
