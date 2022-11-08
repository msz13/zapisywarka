// See https://aka.ms/new-console-template for more information
using DbUp;
using Microsoft.Extensions.Configuration;
  

//var conn = "HOST=postgres;USERNAME=postgres;PASSWORD=Password_01;DATABASE=zapisywarka"; 

var configuration = new ConfigurationBuilder().AddEnvironmentVariables().Build();

var connectionString = $"HOST={configuration["DB_HOST"]};PORT={configuration["DB_PORT"]};USERNAME={configuration["DB_USER"]};PASSWORD={configuration["DB_PASSWORD"]};DATABASE={configuration["DB_NAME"]}";

Console.WriteLine(connectionString);
EnsureDatabase.For.PostgresqlDatabase(connectionString);

var upgrader = DeployChanges.To
    .PostgresqlDatabase(connectionString)
    // .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
    .WithScriptsFromFileSystem("./scripts/")
    .LogToConsole()
    .Build();
var result = upgrader.PerformUpgrade();
if (!result.Successful)
{
  Console.ForegroundColor = ConsoleColor.Red;
  Console.WriteLine(result.Error);
  Console.ResetColor();
  return -1;
}
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine(value: "Success!");
Console.ResetColor(); 


return 0;
