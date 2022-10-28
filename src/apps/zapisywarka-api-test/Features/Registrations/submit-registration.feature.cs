﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (https://www.specflow.org/).
//      SpecFlow Version:3.9.0.0
//      SpecFlow Generator Version:3.9.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace ZapisywarkaClientAps.ZapisywarkaApi.Test.Features.Registrations
{
    using TechTalk.SpecFlow;
    using System;
    using System.Linq;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "3.9.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public partial class PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature : object, Xunit.IClassFixture<PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature.FixtureData>, System.IDisposable
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
        private string[] _featureTags = ((string[])(null));
        
        private Xunit.Abstractions.ITestOutputHelper _testOutputHelper;
        
#line 1 "submit-registration.feature"
#line hidden
        
        public PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature(PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature.FixtureData fixtureData, ZapisywarkaClientAps_ZapisywarkaApi_Test_XUnitAssemblyFixture assemblyFixture, Xunit.Abstractions.ITestOutputHelper testOutputHelper)
        {
            this._testOutputHelper = testOutputHelper;
            this.TestInitialize();
        }
        
        public static void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Features/Registrations", "Przyjmowanie zapisu przez koordynatora zapisów", "    Aby ułatwić zbieranie zapisów poprzez różne kanały i źródła, osoba przyjmując" +
                    "a zapisy,\n    może przyjąć rezerwację, w imieniu klienta, który składa go osobiś" +
                    "cie, telefonicznie lub przez media społecznościowe.", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        public static void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        public virtual void TestInitialize()
        {
        }
        
        public virtual void TestTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioInitialize(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioInitialize(scenarioInfo);
            testRunner.ScenarioContext.ScenarioContainer.RegisterInstanceAs<Xunit.Abstractions.ITestOutputHelper>(_testOutputHelper);
        }
        
        public virtual void ScenarioStart()
        {
            testRunner.OnScenarioStart();
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        public virtual void FeatureBackground()
        {
#line 8
    #line hidden
        }
        
        void System.IDisposable.Dispose()
        {
            this.TestTearDown();
        }
        
        [Xunit.SkippableFactAttribute(DisplayName="Koordynator zapisów poprawnie przyjmuje zapis")]
        [Xunit.TraitAttribute("FeatureTitle", "Przyjmowanie zapisu przez koordynatora zapisów")]
        [Xunit.TraitAttribute("Description", "Koordynator zapisów poprawnie przyjmuje zapis")]
        [Xunit.TraitAttribute("Category", "api")]
        [Xunit.TraitAttribute("Category", "gh-76")]
        public virtual void KoordynatorZapisowPoprawniePrzyjmujeZapis()
        {
            string[] tagsOfScenario = new string[] {
                    "api",
                    "gh-76"};
            System.Collections.Specialized.OrderedDictionary argumentsOfScenario = new System.Collections.Specialized.OrderedDictionary();
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Koordynator zapisów poprawnie przyjmuje zapis", null, tagsOfScenario, argumentsOfScenario, this._featureTags);
#line 22
        this.ScenarioInitialize(scenarioInfo);
#line hidden
            bool isScenarioIgnored = default(bool);
            bool isFeatureIgnored = default(bool);
            if ((tagsOfScenario != null))
            {
                isScenarioIgnored = tagsOfScenario.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((this._featureTags != null))
            {
                isFeatureIgnored = this._featureTags.Where(__entry => __entry != null).Where(__entry => String.Equals(__entry, "ignore", StringComparison.CurrentCultureIgnoreCase)).Any();
            }
            if ((isScenarioIgnored || isFeatureIgnored))
            {
                testRunner.SkipScenario();
            }
            else
            {
                this.ScenarioStart();
#line 8
    this.FeatureBackground();
#line hidden
                TechTalk.SpecFlow.Table table3 = new TechTalk.SpecFlow.Table(new string[] {
                            "Nazwa"});
                table3.AddRow(new string[] {
                            "Chleb wiejski"});
                table3.AddRow(new string[] {
                            "Chleb foremkowy z żurawiną"});
                table3.AddRow(new string[] {
                            "Chleb foremkowy z oliwkami"});
#line 23
            testRunner.Given("Dostępny jest formularz zapisów, zawierającą następujące pozycje:", ((string)(null)), table3, "Given ");
#line hidden
                TechTalk.SpecFlow.Table table4 = new TechTalk.SpecFlow.Table(new string[] {
                            "Nazwa",
                            "Ilość"});
                table4.AddRow(new string[] {
                            "Chleb wiejski",
                            "1"});
                table4.AddRow(new string[] {
                            "Chleb foremkowy z żurawiną",
                            "3"});
#line 28
            testRunner.Given("Jan, przyjmujący zapisy, za pomocą dostępnego formularza rezerwuje dla klienta na" +
                        "stępujące pozycje:", ((string)(null)), table4, "Given ");
#line hidden
                TechTalk.SpecFlow.Table table5 = new TechTalk.SpecFlow.Table(new string[] {
                            "Hasło odbioru",
                            "Uwagi"});
                table5.AddRow(new string[] {
                            "Szczeciński",
                            "Odbierze żona Joanna"});
#line 32
            testRunner.And("wprowadza dane rezerwacji:", ((string)(null)), table5, "And ");
#line hidden
#line 35
            testRunner.When("Zatwierdza rezerwację", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line hidden
#line 36
            testRunner.Then("Rezerwacja jest zapisana i zawiera powyższe pozycje", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
                TechTalk.SpecFlow.Table table6 = new TechTalk.SpecFlow.Table(new string[] {
                            "Data złożenia",
                            "Numer rezerwacji"});
                table6.AddRow(new string[] {
                            "Aktualna Data:Godzina:Minuta",
                            "ABC-2022"});
#line 37
            testRunner.And("Dodatkowe dane:", ((string)(null)), table6, "And ");
#line hidden
            }
            this.ScenarioCleanup();
        }
        
        [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "3.9.0.0")]
        [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
        public class FixtureData : System.IDisposable
        {
            
            public FixtureData()
            {
                PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature.FeatureSetup();
            }
            
            void System.IDisposable.Dispose()
            {
                PrzyjmowanieZapisuPrzezKoordynatoraZapisowFeature.FeatureTearDown();
            }
        }
    }
}
#pragma warning restore
#endregion
