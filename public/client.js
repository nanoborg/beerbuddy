function getMap() {
    var map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(-37.8136, 
            144.9631),
        zoom: 9
    })
    var center = map.getCenter()

    const url = 'http://localhost:8080/api'

    axios.get(url).then(res => {
        // console.log(res.data)

        let pubs = res.data

        pubs.forEach(pub => {
            var location = {latitude: pub.lat, longitude: pub.long}

            //Create custom Pushpin
        var pin = new Microsoft.Maps.Pushpin(location, {
            title: pub.pubname, 
            icon: 'beer.png'
        });
    
        //Add the pushpin to the map
        map.entities.push(pin)
            
        })
        
    })

}