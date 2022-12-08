using Microsoft.AspNetCore.Mvc;
using ProjetoCrud;

namespace CrudSapUi5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CrudLivroController : ControllerBase
    {
        private readonly IRepositorio _repositorio;

        public CrudLivroController(IRepositorio repositorio)
        {
            try
            {
                _repositorio = repositorio;
            }
            catch (Exception)
            {

                throw new Exception("Erro");
            }
             
        }

        [HttpGet]
        public ActionResult<List<Livro>> BuscarTodos()
        {
            try
            {
                List<Livro> listaLivros = _repositorio.BuscarTodos();

                return Ok(listaLivros);
            }
            catch (Exception)
            {

                throw new Exception("Erro ao buscar todos");
            }

           
        }

        [HttpGet("{id}")]
        public ActionResult<Livro> BuscarPorId(int id)
        {
            try
            {
                Livro livro = _repositorio.BuscarPorId(id);

                return Ok(livro);
            }
            catch (Exception)
            {

                throw new Exception ("Erro ao buscar por Id");
            }

            
        }

        [HttpPost]
        public ActionResult<Livro> Cadastrar(Livro livro)
        {
            try
            {
                _repositorio.Cadastrar(livro);
                return Ok(livro);
            }
            catch (Exception)
            {

                throw new Exception("Erro ao cadastrar livro");
            }

           
        }

        [HttpPut("{id}")]
        public ActionResult<Livro> Editar(Livro livro, int id)
        {
            try
            {
                livro.Codigo = id;
                _repositorio.Editar(livro);
                return Ok(livro);
            }
            catch (Exception)
            {

                throw new Exception("Erro ao editar livro");
            }

            
        }

        [HttpDelete("{id}")]
        public ActionResult<Livro> Deletar(int id)
        {
            try
            {
                _repositorio.Deletar(id);
                return Ok();
            }
            catch (Exception)
            {

                throw new Exception("Erro ao deletar livro");
            }
        }
    }
}