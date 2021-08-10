import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import photosAPI from '../../API/photosAPI'
import albumsAPI from '../../API/albumsAPI'
import './AlbumsList.scss'

const AlbumsList = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    const [userId, setUserId] = useState('');
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    let albumsIdArr = [];
    const history = useHistory();
   
    //useEffect(() => setUserId(userInfo?.id), [userInfo]) 


    useEffect( () => {



        const userId = userInfo?.id;
        const fetchPhotos = async () => {
        const albumsResponse = await albumsAPI.get(`?userId=${userId}`);
        //setAlbums(albumsResponse.data);
        albumsIdArr = albumsResponse.data.map(({id}) => `albumId=${id}`);

        const photosResponse = await photosAPI.get( albumsIdArr.length > 0 && `?${albumsIdArr.join('&')}`);
        setPhotos(photosResponse.data)

        console.log(albumsIdArr);
        }
        if (userInfo )  {
            fetchPhotos()
        } else {
            setPhotos([])
        }
       
    }, [userInfo, userId])
    return (
        <div>
            <h2>AlbumsList</h2>
            <h3> { userInfo?.name ? `Current user is ${userInfo.name}`   : "The user is not authorized. Please,log in" }</h3>
            <div>
            </div>
            { userId && <h4>User id is {userId}</h4>}
            <ul>
                {photos.map(({id, albumId, title, thumbnailUrl}) => (
                    <div key={id}>
                        <div className="album__link"
                        onClick={() => history.push(`/albums/${albumId}`)}
                        >Id: {id}, Album id: {albumId},</div> 
                        <div><b>title: </b>{title} </div>
                        <img src={thumbnailUrl} alt="thumbnail"></img>
                        <hr/>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AlbumsList
