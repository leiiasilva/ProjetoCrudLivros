namespace ProjetoCrud
{
    public class Singleton
    {
        private static List<Livro> ListaDeLivros;

        public static List<Livro> Instance()
        {
            if (ListaDeLivros == null)
            {
                ListaDeLivros = new List<Livro>();
            }

            return ListaDeLivros;
        }

        public static int IdInserir()
        {
            var idInserir = (int)decimal.Zero;
            if (ListaDeLivros.Count != decimal.Zero)
            {
                idInserir = ListaDeLivros.Last().Codigo;
            }
            return ++idInserir;
        }
    }
}
