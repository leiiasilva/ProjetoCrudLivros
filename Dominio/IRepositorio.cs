namespace ProjetoCrud
{
    public interface IRepositorio
    {
        void Cadastrar(Livro livro);
        void Editar(Livro livro);
        void Deletar(int livroId);
        List<Livro> BuscarTodos();
        Livro BuscarPorId(int Id);
    }
}
