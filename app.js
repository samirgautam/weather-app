window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");  
    let degreeSection = document.querySelector(".degree-section");
    const degreeSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=2bc1d979a8604b818cc7320ba55502cf&include=minutely`;

            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(datafetched=>{
                
               // console.log(datafetched.data);
               // console.log(datafetched.data[0].temp);
               // console.log(datafetched.data[0].weather.description);

                const temperature = datafetched.data[0].temp;
                const description = datafetched.data[0].weather.description;
                const icon = datafetched.data[0].weather.icon;

                //set dom elements from the api
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = description;
            locationTimezone.textContent = datafetched.data[0].timezone;

            
            //formula for fahrenheit
            let fahrenheit = temperature * 1.8 + 32;

            //icon
            document.querySelector('.icon').src = "https://www.weatherbit.io/static/img/icons/"+icon+".png";

            //temperature change from c to f
            degreeSection.addEventListener('click',()=>{
                
                if(degreeSpan.textContent=== "°C"){
                    temperatureDegree.textContent =Math.floor(fahrenheit);
                    degreeSpan.textContent = "°F";
                }

                    else{
                        temperatureDegree.textContent = temperature;
                        degreeSpan.textContent = "°C";
                    }
            });

            

            });

        });
    }
  

});