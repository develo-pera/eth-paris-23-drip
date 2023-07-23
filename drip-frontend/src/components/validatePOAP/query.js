const query = `query POAPs($address: Identity!, $eventId: String!) {
    Poaps(
      input: {filter: {owner: {_eq: $address}, eventId: {_eq: $eventId}}, blockchain: ALL, limit: 10}) 
      {
      Poap {
        eventId
        poapEvent {
          eventName
          eventURL
          startDate
          endDate
          country
          city
          contentValue {
            image {
              extraSmall
              large
              medium
              original
              small
            }
          }
        }
      }
    }
  }`;

export default query;
