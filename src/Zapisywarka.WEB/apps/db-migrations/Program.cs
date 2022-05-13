// See https://aka.ms/new-console-template for more information
using DbUp;

var connectionString = """HOST=postgres;USERNAME=postgres;PASSWORD=Password_01;DATABASE=zapisywarka""";
               /*  args.FirstOrDefault()
                ?? "Host=localhost;User=postgres;Password=Password_01;Database=zapisywarka";
             */
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