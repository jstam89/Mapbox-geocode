import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js"
import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"
import jsonp from "jsonp"

window.addEventListener('DOMContentLoaded', (event) => {

    mapboxgl.accessToken = "pk.eyJ1IjoianN0YW04OSIsImEiOiJjazM0aHZrYzEwcHA1M25tcTFqazdwb2VqIn0.rzGxx7REa-RM2nvR3t1v1Q";

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [5.86508001, 52.1327033],
        zoom: 6.5
    });

    map.on('load', () => {

        jsonp("https://api.routeradar.nl/api/v1/reports?query_type=overview", (error, data) => {
            if (error) {
                console.log('Looks like there was a problem. Status Code: ' + error);
            }
            let point = data.map(key => key.point.coordinates)

            point.forEach(point => {
                let el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker(el)
                    .setLngLat(point)
                    .addTo(map);
            });

            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl
                })
            );
        })
    });
});