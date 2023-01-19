let coordinates = [];
let map;
let line;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
  });

  // Add click event listener to the button
  const button = document.getElementById("get-location-button");
  button.addEventListener("click", (event) => {
    getLocation();
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Add the location coordinates to the coordinates array
        coordinates.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // If the coordinates array has 4 elements, display the path
        if (coordinates.length === 4) {
          // remove event listener
          button.removeEventListener("click", getLocation);
          // Create a new polyline
          line = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: "#0000FF",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          // Fit the map to the coordinates
          const bounds = new google.maps.LatLngBounds();
          coordinates.forEach((coordinate) => {
            bounds.extend(coordinate);
          });
          map.fitBounds(bounds);
          // Add the polyline to the map
          line.setMap(map);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// call the initMap on page load
initMap();
