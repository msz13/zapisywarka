namespace Spike
{

    class Test
    {
        void ShouldByAbleSeeReport()
        {
            var expectedReport = new {
                name =  "Bochenek",
                quantity = 1
            }
            Offers.Create(
                new CreateOfferCommandBuilder().WithName("Poniedziałek")
                    .WithPosition(name: "Bochenek", quantity: 2)
                    .WithPosition(nameof: "Foremkowy", quantity: 3)
                    .Build();
            );

            Registration.Register(
                new RegistrationcommandBuilder().
                .WithPosition(name: "Bochenek", quantity: 1)
                .WithPosition(nameof: "Foremkowy", quantity: 2)
            )

            var report = Reporst.OfferSummary("Poniedziałek");
            report.ShouldEqual(expcetedReport);
        }


        [Test(Description = "Organizator zapisów tworzy ofertę")]
        public void ShouldCreateOfferwithValidParam()
        {

            John.wasAbleTo(
                CrateOffer.Withname().WithItems()
                OpenOffer.WithName(‘poniedziałek)
                MakeRegistration.ForItems(new[
                    new { Item: “chleb”, quantity: 3 },
                    new { Item: “bułki”, quantity: 3 },
                    new { Item: “bułki”, quantity: 3 },
                ])
            )

            Summary = John.asksFor(
                RegistrationSummary.withAPI()
                *
                Summay.shouldEqual(new
                {
                    Item = ““chleb”,
                    quantity = { 3}
                        },
                new = new {
                Item = ““bułki”, quantity = 6
                })   
                    
                    }

                    }
}