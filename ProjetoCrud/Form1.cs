namespace ProjetoCrud
{
    public partial class Form1 : Form
    {
        //ALTERAR O REPOSITÓRIO PARA UTILIZAR INJEÇÃO DE DEPENDÊNCIA COM INTERFACE
        private readonly IRepositorio _repositorio;
        public Form1(IRepositorio repositorio)
        {
            InitializeComponent();
            _repositorio = repositorio;
            AtualizarLista();
        }

        private void AoClicarEmCadastrar(object sender, EventArgs e)
        {
            try
            {
                telaCadastro cadastro = new telaCadastro(null);
                cadastro.ShowDialog();

                if (cadastro.DialogResult == DialogResult.OK)
                {
                    _repositorio.Cadastrar(cadastro.livro);
                    MessageBox.Show("Livro cadastrado com sucesso!", "Mensagem do sistema");
                }
                AtualizarLista();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            try
            {
                var livroASerEditado = new Livro();

                if (dataGridView1.CurrentRow.Selected)
                {
                    livroASerEditado = dataGridView1.CurrentRow.DataBoundItem as Livro;
                    telaCadastro cadastro = new telaCadastro(livroASerEditado);
                    cadastro.ShowDialog();

                    if (cadastro.DialogResult == DialogResult.OK)
                    {
                        cadastro.livro.Codigo = livroASerEditado.Codigo;
                        _repositorio.Editar(cadastro.livro);
                        MessageBox.Show("Livro editado com sucesso!", "Mensagem do sistema");
                    }
                    AtualizarLista();
                }
                else
                {
                    MessageBox.Show("Selecione um livro para editar", "Mensagem do sistema");
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Não há livros para editar" , "Mensagem do sistema");
            }
        }

        private void AoClicarEmDeletar(object sender, EventArgs e)
        {
            try
            {
                if (dataGridView1.CurrentRow.Selected)
                {
                    if (DesejaDeletarOLivro())
                    {
                        int livroASerDeletado = Convert.ToInt32(dataGridView1.CurrentRow.Cells[0].Value);
                        _repositorio.Deletar(livroASerDeletado);
                        AtualizarLista();
                    }
                }
                else
                {
                    MessageBox.Show("Selecione um livro para deletar", "Mensagem do sistema");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Não há livro para deletar" , "Mensagem do sistema");
            }
        }
        private void AtualizarLista()
        {
            
            dataGridView1.DataSource = _repositorio.BuscarTodos();
            dataGridView1.ClearSelection();
        }

        private static bool DesejaDeletarOLivro()
        {
            return MessageBox.Show("Deseja realmente deletar este livro? ",
                "Mensagem do sistema", MessageBoxButtons.YesNo, MessageBoxIcon.Question,
                MessageBoxDefaultButton.Button2) == DialogResult.Yes;
        }
    }
}