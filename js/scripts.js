/**
 * ISS Co-ordinates
 * @date    2020.03.31
 * @summary Displays the current co-ordinates of the ISS.
 */

// Get output elements.
const lat  = document.getElementById( 'iss-lat' );
const long = document.getElementById( 'iss-long' );

const fetchCoords = () => {
  fetch ( 'http://api.open-notify.org/iss-now.json' )
    .then ( response => { 
      if ( response.status >= 200 && response.status <= 299 ) {
        return response.json();
      } else {
        // In the case of an error, clear the interval.
        clearInterval( checkCoords );
        // Show error text.
        const errorText = 'Error: Service not available.'
        lat.textContent = errorText;
        long.textContent = errorText;
        // Throw formal error.
        throw Error( response.statusText );
      }
    } )
    .then ( data => {
      // Update DOM.
      lat.textContent = data.iss_position.latitude;
      long.textContent = data.iss_position.longitude;
    } )
    .catch ( error => console.log( error ) )
}

// Check the co-ordinates at an interval.
let coordsInterval = setInterval( () => {
  // Fetch the coords and display in HTML.
  fetchCoords();
}, 5000 );

// Execute a fetch immediately.
fetchCoords();
