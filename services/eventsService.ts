
interface EventData {
    eventId: string,
    eventTitle: string,
    eventDescription: string,
     latitude: number,
    longitude: number
}


const mockEvents  = [
    {
          eventId: "1",
    eventTitle: "Toronto Tech Hunt",
    eventDescription: "All tech gurus are welcome.",
    latitude: 43.7630,
    longitude: -79.4070,
    },
{  
    eventId: "2",
    eventTitle: "Quebec Techies",
    eventDescription: "Showcase what you have got.",
    latitude: 43.7580,
    longitude: -79.4140,
    }
    
  ]


  export function fetchAllEvents(){
    return mockEvents
  }

//   export default mockEvent;



