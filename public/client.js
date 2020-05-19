let pin = null

const handlePinClick = (e) => {
    // console.log(e.target)
    let path = `/beers/${e.target.metadata.id}`
    axios.get(path).then(res => {
        console.log(res)
        document.body.innerHTML = res.data
    })
}

function getMap() {
    var map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(-37.8136, 
            144.9631),
        zoom: 9
    })
    var center = map.getCenter()

    const path = '/pubs'

    axios.get(path).then(res => {
        // console.log(res.data)
        
        let pubs = res.data
        
        pubs.forEach(pub => {
            console.log(pub)
            var location = {latitude: pub.lat, longitude: pub.long}

            //Create custom Pushpin
            pin = new Microsoft.Maps.Pushpin(location, {
            title: pub.pubname, 
            icon: pub.is_pub_ratedb? 'beer.png':'pub-icon.png',
            anchor: new Microsoft.Maps.Point(12,36)
        });

        pin.metadata = {
            id: pub.id
        }

        Microsoft.Maps.Events.addHandler(pin, 'click', handlePinClick)
        
        //Add the pushpin to the map
        map.entities.push(pin)
            
        });
        
    })

}