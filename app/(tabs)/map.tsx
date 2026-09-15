import { View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";

import { fetchAllEvents } from "../../services/eventsService";

interface LocationItem {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface EventData {
  eventId: string;
  eventTitle: string;
  eventDescription: string;
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);

  const [events, setEvents] = useState<EventData[]>([]);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(
    null,
  );

  const [selectedEvents, setSelectedEvents] = useState<EventData | null>(null);

  //   const fetchEvents = ()=>{
  //     setEvents(mockEvent)
  //   }

  const fetchEvents = () => {
    const eventsFromService = fetchAllEvents();
    setEvents(eventsFromService);
  };

  // USE EFFECT
  useEffect(() => {
    fetchEvents();
  }, []);


  // MY LOCATION{
  async function goToMyLocation(){
    try {
         const userCurrentLocation= await Location.getCurrentPositionAsync({})
         console.log(userCurrentLocation);
         
    const userRegion = {
        latitude: userCurrentLocation.coords.latitude,
        longitude: userCurrentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

      //animateToRegion → This moves the viewport programmatically
    mapRef.current?.animateToRegion(userRegion)
    setLocation(userCurrentLocation);

        console.log(userCurrentLocation.timestamp);
       
    } catch (error: any) {
        Alert.alert("Cannot get user location", error.message)
    }
  }

  const permissionToRequestUserLocation = async () => {
    try {
         const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status result:", status);
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      await goToMyLocation()

    } catch (error: any) {
      console.log(error.message);
    }
  };


  const locations: LocationItem[] = [
    {
      id: "1",
      title: "Campus Library",
      description: "Main campus library",
      latitude: 43.7615,
      longitude: -79.4111,
    },
    {
      id: "2",
      title: "Student Centre",
      description: "Student events and activities",
      latitude: 43.7602,
      longitude: -79.4095,
    },
  ];



  const locationCoordinates = locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));

  const eventCoordinates = events.map((event) => ({
    latitude: event.latitude,
    longitude: event.longitude,
  }));

  // all co-ordinates...
  const allCoordinates = [...locationCoordinates, ...eventCoordinates];

  function showEventsAndLocaionCoordinates() {
    if (locations.length > 0 && events.length > 0) {
      mapRef.current?.fitToCoordinates(allCoordinates, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 100,
          left: 50,
        },
        animated: true,
      });
    }
  }

  // asks the user for access to their location
  useEffect(() => {
    permissionToRequestUserLocation();
  }, []);

  // → This adjusts viewport to include multiple coordinates
  //   useEffect(() => {
  //     if (locations.length > 0 && events.length > 0) {
  //       mapRef.current?.fitToCoordinates(
  //         allCoordinates,
  //         {
  //           edgePadding: {
  //             top: 100,
  //             right: 50,
  //             bottom: 100,
  //             left: 50,
  //           },
  //           animated: true,
  //         },
  //       );
  //     }
  //   }, [events]);

  return (
    <View style={{ flex: 1 }}>
        <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <TouchableOpacity onPress={showEventsAndLocaionCoordinates}>
        <Text
          style={{
            color: "#0f256f",
            padding: 15,
            margin: 15,
            borderRadius: 15,
            backgroundColor: "#fca5a5",
            fontWeight: 700,
          
          }}
        >
          View all events
        </Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={goToMyLocation}>
        <Text
          style={{
            color: "#e7e8ec",
            padding: 15,
            margin: 15,
            borderRadius: 15,
            backgroundColor: "#641f1f",
            fontWeight: 700,
           
          }}
        >
          My Location
        </Text>
      </TouchableOpacity>
       </View>


      <MapView
        ref={mapRef}
        showsUserLocation
        zoomControlEnabled
        style={{ flex: 1, borderRadius: 40, marginBottom: 30 }}
        // region={
        //   location
        //     ? {
        //         latitude: location.coords.latitude,
        //         longitude: location.coords.longitude,
        //         latitudeDelta: 0.01,
        //         longitudeDelta: 0.01,
        //       }
        //     : undefined
        // }
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            onPress={() => {
              setSelectedLocation(location);
            }}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
          >
            <Callout>
              <View>
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  {location.title}
                </Text>

                <Text style={{ color: "blue" }}>{location.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {events.map((event) => (
          <Marker
            key={event.eventId}
            onPress={() => {
              setSelectedEvents(event);
            }}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.eventTitle}
            description={event.eventDescription}
          />
        ))}
      </MapView>

      {selectedLocation && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 20,
            right: 20,
            backgroundColor: "white",
            padding: 8,
            borderRadius: 15,
            elevation: 5,
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
        >
                        <Text style={{fontSize:17, fontWeight:"heavy", color:"#737373"}}>Location:</Text>

          <Text
            style={{
              color: "#111827",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {selectedLocation.title}
          </Text>
          <Text>{selectedLocation.description}</Text>
        </View>
      )}

      {selectedEvents && (
        <View  style={{
            position: "absolute",
            bottom: 20,
            left: 10,
            right: 10,
            backgroundColor: "white",
            padding: 1,
            borderRadius: 15,
            elevation: 5,
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}>
            <Text style={{fontSize:17, fontWeight:"heavy", color:"#737373"}}>Events:</Text>
          <Text style={{
              color: "#111827",
              fontSize: 20,
              fontWeight: "700",
            }}>{selectedEvents.eventTitle}
            </Text>
          <Text>{selectedEvents.eventDescription}</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
