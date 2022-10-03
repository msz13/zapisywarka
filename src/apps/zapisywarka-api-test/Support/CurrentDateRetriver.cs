using System;
using System.Collections.Generic;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace Zapisywarka.API.AcceptanceTests.Helpers;

public class CurrentDateRetriver : IValueRetriever
{
  public bool CanRetrieve(KeyValuePair<string, string> keyValuePair, Type targetType, Type propertyType)
  {
    return keyValuePair.Value == "Aktualna Data:Godzina:Minuta" ? true : false;
  }


  public object Retrieve(KeyValuePair<string, string> keyValuePair, Type targetType, Type propertyType)
  {
    return DateTime.Now.ToString("yyyy-MM-dd HH:ss");
  }
}

[Binding]
public static class CurrentDateRetriverSetUp
{
    [BeforeTestRun]
    public static void  SetUpCustomRetrivers() 
    {
      Service.Instance.ValueRetrievers.Register(new CurrentDateRetriver());
    }

}