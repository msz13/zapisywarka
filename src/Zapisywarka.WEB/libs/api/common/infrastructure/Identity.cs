using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Infrastructure
{
    public class Identity : ValueObject, IIdentity, IComparable
    {
        public string Id { get; }

        public Identity()
        {
            Id = Guid.NewGuid().ToString();
        }

        public Identity(string id)
        {
            Id = id;
        }

        protected Identity(Guid id)
        {
            Id = id.ToString();
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Id;
        }

        public int CompareTo(object obj)
        {
            var otherIdentity = obj as IIdentity;
            return Id.CompareTo(otherIdentity.Id);
        }
    }


    public abstract class Identity2 : IEquatable<Identity2>, IIdentity
    {

        public Identity2()
        {
            Id = Guid.NewGuid().ToString();
        }

        public Identity2(string id)
        {
            Id = id;
        }

        protected Identity2(Guid id)
        {
            Id = id.ToString();
        }

        // currently for Entity Framework, set must be protected, not private.
        // will be fixed in EF 6.

        public string Id { get; protected set; }

        public bool Equals(Identity2 id)
        {
            if (ReferenceEquals(this, id)) return true;
            if (ReferenceEquals(null, id)) return false;
            return Id.Equals(id.Id);
        }

        public override bool Equals(object anotherObject)
        {
            return Equals(anotherObject as Identity2);
        }

        public override int GetHashCode()
        {
            return GetType().GetHashCode() * 907 + Id.GetHashCode();
        }

        public override string ToString()
        {
            return GetType().Name + " [Id=" + Id + "]";
        }
    }


}

