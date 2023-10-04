import { useEffect } from "react";
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
import { NavLink } from "react-router-dom";

const CreateSpot = () => {
    const dispatch = useDispatch();

    //form inputs
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [errors, setErrors] = useState([])

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const spotData = { address, city, state, country, lat, lng, name, description, price}
        const imgData = {imgUrl}

        //errors
        let errors = []
        if(address.length > 100){
            errors.push("Address cannot be greater than 100 characters")
        }
        if(city.length > 100){
            errors.push("City cannot be greater than 100 characters")
        }
        if(state.length > 80){
            errors.push("State cannot be greater than 80 characters")
        }
        if(country.length > 256){
            errors.push("Country cannot be greater than 256 characters")
        }
        if(lat > 90 || lat < -90){
            errors.push("Latitude must be between -90 and 90")
        }
        if(lng > 180 || lat < -180){
            errors.push("Longitude must be between -180 and 80")
        }
        if(name.length > 256 || name.length < 2){
            errors.push("Name must be between 2 and 256 characters")
        }
        if(description.length > 2000 ||description.length < 2){
            errors.push("Description must be between 2 and 2000 characters")
        }
        if(price < 1){
            errors.push("Price must be higher than $1")
        }

        setErrors(errors)

        if(errors.length === 0) {
            const newSpot = dispatch(createSpot(spotData, imgData))
        }
    }

    return (
        <div>
        <h1>Create Spot Form</h1>
        <form onSubmit={handleSubmit}>
        <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        </form>
        </div>
    )
}

export default CreateSpot
