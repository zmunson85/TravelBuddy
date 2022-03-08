import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'

//api data
import { getPlacesData } from './api';

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'



const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);


    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    //get exact geo location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);
    //a function that accepts another callback function, don't leave dependency array empty. getPlacesData() is Async so it requires .then() to be included
    //getPlacesData() will return data from the API, next set the data to state
    useEffect(() => {
        setIsLoading(true);


        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data);
                setIsLoading(false);
            })
    }, [coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default App;