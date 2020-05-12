import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js"
import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"

window.addEventListener('DOMContentLoaded', (event) => {

    mapboxgl.accessToken = "pk.eyJ1IjoianN0YW04OSIsImEiOiJjazM0aHZrYzEwcHA1M25tcTFqazdwb2VqIn0.rzGxx7REa-RM2nvR3t1v1Q";

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [5.86508001, 52.1327033], //the Netherlands
        zoom: 6.5
    });

    map.on('load', () => {

        navigator.geolocation.getCurrentPosition(position => {
            let el = document.createElement('div');
            el.className = 'location';

            new mapboxgl.Marker(el)
                .setLngLat({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                .addTo(map);
        })

        fetch('/reports.json')
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return
                }
                response.json()
                    .then(data => {
                        let point = data.map(key => key.point.coordinates)

                        point.forEach(point => {
                            let el = document.createElement('div');
                            el.className = 'marker';

                            new mapboxgl.Marker(el)
                                .setLngLat(point)
                                .addTo(map);
                        })
                    }).catch((error) => {
                    console.log(error)
                })
            })
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            }),
        );
    });
});