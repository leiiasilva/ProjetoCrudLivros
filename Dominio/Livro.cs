using LinqToDB.Mapping;

namespace ProjetoCrud
{
    public class Livro 
    {
        [PrimaryKey, Identity]
        public int Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Autor { get; set; }
        public string? Editora { get; set; }
        public DateTime AnoPublicacao { get; set; }
    }
}
