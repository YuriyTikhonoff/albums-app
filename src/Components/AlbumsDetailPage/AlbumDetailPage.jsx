import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AlbumDetailPage = () => {
    const [photos, setPhotos] = useState([]);
    const {albumId} = useParams();
    console.log('AlbumId ', albumId)


    useEffect( () => {

        const fetchPhotos = async () => {
            const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            console.log(photosResponse.data)
            setPhotos(photosResponse.data)
            
        }
        fetchPhotos()
    }, [albumId])
    return (
        <div>
            <h2>Album detail page</h2>
            <ul>
                {photos.map(({id, albumId, title, url}) => (
                    <div key={id}>
                        <div className="album__link">Id: {id}, Album id: {albumId},</div> 
                        <div><b>title: </b>{title} </div>
                        <img src={url}></img>
                        <hr/>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AlbumDetailPage
