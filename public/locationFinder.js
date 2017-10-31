
/*  const result = document.getElementById("result");
 */ 
/* let $submit = $('.submit'); */
let $auto = $('.auto')

function geoFindMe() {
  let latitude, longitude;
  if (!navigator.geolocation){
     result.innerHTML = "<p>Geolocation is not supported by your browser. Please specify your zipcode</p>";
    return;
  }
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $("#lat").val(latitude)
    $("#long").val(longitude)
    $("#latlongForm").submit();
    /* $.ajax({
        url: '/weather/search',
        type: 'POST',
        data: {
          latitude,
          longitude
        }
      }) */
    //make a get request to send latitude and longitude to 
  }

  const options = {
    enableHighAccuracy: true
  };

  const error = (err) => {
     console.log(err)
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}  
$auto.click(geoFindMe); 
/* $submit.click(geoFindMe);  */
//will create an alternative path later with instructions for zipcodes