using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;


namespace ProjetoCrud
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            //Um host é um objeto que encapsula os recursos de um aplicativo
            var host = CreateHostBuilder().Build();
            var servicoProvider = host.Services;
            var repositorio = servicoProvider.GetService<IRepositorio>();

            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            Application.Run(new Form1(repositorio));
        }
        public static IHostBuilder CreateHostBuilder()
        {
            return Host
                .CreateDefaultBuilder()
                .ConfigureServices((context, services) => { services.AddScoped<IRepositorio, RepositorioDB>(); });
        }

    }
}