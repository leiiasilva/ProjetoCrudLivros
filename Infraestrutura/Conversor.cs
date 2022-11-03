using System.Data;

namespace ProjetoCrud
{
    public class Conversor
    {
        public static List<Livro> ConverterLivro(DataTable tabela)
        {
            var listaLivro = new List<Livro>();
            for (int i = 0; i < tabela.Rows.Count; i++)
            {
                Livro livro = new Livro()
                {
                    Codigo = Convert.ToInt32(tabela.Rows[i]["Codigo"]),
                    Nome = tabela.Rows[i]["nome"].ToString(),
                    Autor = tabela.Rows[i]["autor"].ToString(),
                    Editora = tabela.Rows[i]["editora"].ToString(),
                    AnoDaPublicacao = DateTime.Parse(tabela.Rows[i]["anopublicacao"].ToString())
                };
                listaLivro.Add(livro);
            }
            return listaLivro;
        }

        public static List<T> ConverterParaLista<T>(DataTable dt)
        {
            var columnNames = dt.Columns.Cast<DataColumn>().
                Select(c => c.ColumnName.ToLower()).
                ToList();

            var propriedade = typeof(T).GetProperties();
            return dt.AsEnumerable().Select(row => {
                var livro = Activator.CreateInstance<T>();
                foreach (var pro in propriedade)
                {
                    if (columnNames.Contains(pro.Name.ToLower()))
                    {
                        var value = row[pro.Name];
                        if (System.Convert.IsDBNull(value))
                        {
                            pro.SetValue(livro, null);
                        }
                        else
                        {
                            pro.SetValue(livro, row[pro.Name]);
                        }
                    }
                }
                return livro;
            }).ToList();
        }
    }
}
