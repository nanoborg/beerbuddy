let pin = null;
let loc = null;
let map = null;
let searchManager = null;

const btnAddLocation = document.querySelector('.add-by-location')
const btnAddAddress = document.querySelector('.add-by-address')

const handlePinClick = (e) => {
    // console.log(e.target)
    let path = `/beers/${e.target.metadata.id}`;
    location = path;
    // axios.get(path).then(res => {
    //     console.log(res)
    //     document.body.innerHTML = res.data
    // })
};

function reverseGeocode(loc) {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the reverseGeocode function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            reverseGeocode(loc);
        });
    } else {
        var searchRequest = {
            location: loc,
            callback: function (curLoc) {
                //Tell the user the name of the result.
                console.log(curLoc.address.addressLine)
                // return r.name
                // alert(r.name);
                let path = `/pubs/new?address=${curLoc.address.addressLine}&lat=${loc.latitude}&long=${loc.longitude}&postCode=${curLoc.address.postalCode}&suburb=${curLoc.address.locality}`
                // console.log(path)
                location = path;
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                // alert("Unable to reverse geocode location.");
                // return "address not found"
                let path = `/pubs/new?address=address not found&lat=${loc.latitude}&long=${loc.longitude}`
                // console.log(path)
                location = path;
            }
        };

        //Make the reverse geocode request.
        searchManager.reverseGeocode(searchRequest);
    }
}

function getMap() {
        map = new Microsoft.Maps.Map("#map", {
        center: new Microsoft.Maps.Location(-37.8136, 144.9631),
        zoom: 9,
    });
    var center = map.getCenter();

    const path = "/pubs";

    axios.get(path).then((res) => {
        // console.log(res.data)

        let pubs = res.data;

        pubs.forEach((pub) => {
            console.log(pub);
            var location = { latitude: pub.lat, longitude: pub.long };

            //Create custom Pushpin
            pin = new Microsoft.Maps.Pushpin(location, {
                title: pub.pubname,
                icon: pub.is_pub_ratedb ? "beer.png" : "pub-icon.png",
                anchor: new Microsoft.Maps.Point(12, 36),
            });

            pin.metadata = {
                id: pub.id,
            };

            Microsoft.Maps.Events.addHandler(pin, "click", handlePinClick);

            //Add the pushpin to the map
            map.entities.push(pin);
        });
    });
}


const handleAddLocation = (e) => {
    console.log('button location')
    navigator.geolocation.getCurrentPosition(function (position) {
        loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );
        
        // console.log('location: ',loc)
        // console.log('lat: ', position.coords.latitude)
        // console.log('long: ', position.coords.longitude)
        
        // map.center = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude)
            
        // console.log('map center :', map.center)

        reverseGeocode(loc)
    });
}

const handleAddAddress = (e) => {
    console.log('button address')
}

btnAddLocation.addEventListener('click', handleAddLocation)
btnAddAddress.addEventListener('click', handleAddAddress)