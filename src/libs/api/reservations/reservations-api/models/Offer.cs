namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class OfferItem
  {
    public OfferItem()
    {
    }


    public OfferItem(int position, string name)
    {
      Position = position;
      Name = name;
    }

    public int Position { get; set; }
    public string Name { get; set; }
  }

  public class Offer
  {

    public Guid Id { get; private set; }

    public ICollection<OfferItem> Items { get; private set; }


    public Offer(Guid id, ICollection<OfferItem> items)
    {
      Id = id;
      Items = items;
    }

    public Offer()
    {
    }


    internal void VerifyIfContainsOfferItems(IEnumerable<ReserveItems.ReserveItemDto.ReservationItem> reservationItems)
    {
      reservationItems.ToList().ForEach(item =>
      {
        var offerItemExists = Items.Any(offerItem => offerItem.Position == item.OfferItemId);
        if (!offerItemExists)
        {
          throw new OfferItemNotFoundException(item.OfferItemId);
        }
      });

    }


  }
}
