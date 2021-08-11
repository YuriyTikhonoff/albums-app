import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import photosAPI from '../../Api/photosAPI'
import albumsAPI from '../../Api/albumsAPI'
import {getPageCount} from '../../Utils/pages'
import Loader from '../Shared/Loader/Loader';
import { useObserver } from '../../Hooks/useObserver'

import './AlbumsList.scss'

const AlbumsList = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    const [userId, setUserId] = useState('');
    const [albums, setAlbums] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [limitPhotos, setLimitPhotos] = useState(6)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState([]);

    const lastElement = useRef();
    const history = useHistory();
   
    //useEffect(() => setUserId(userInfo?.id), [userInfo]) 
    const fetchPhotos = async () => {
        const albumsResponse = await albumsAPI.get(`?userId=${userId}`);
        let albumsIdArr = albumsResponse.data.map(({id}) => `albumId=${id}`);

        const photosResponse = await photosAPI.get( albumsIdArr.length > 0 && `?${albumsIdArr.join('&')}`,
            {
                params: { _limit: limitPhotos, _page: page }
            }
        );
       
        console.log('x-total-count ', photosResponse.headers['x-total-count'] )
        const totalCount = photosResponse.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limitPhotos))    

        setPhotos([...photos, ...photosResponse.data])

        console.log(albumsIdArr);
    }

    useEffect( () => {
        const userId = userInfo?.id;



        if (userInfo )  {
            try {
                setIsLoading(true)
                fetchPhotos()
            } catch(error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        } else {
            setPhotos([])
        }
       
        console.log(lastElement.current)
    }, [userInfo, userId])


    
    useObserver(lastElement, page < totalPages , isLoading, () => setPage(page + 1));

    useEffect(() => {
        console.log(`Fetch new batch of photos`)
    }, [page])


    return (
        <div>
            <h2>AlbumsList</h2>
            <h3> { userInfo?.name ? `Current user is ${userInfo.name}`   : "The user is not authorized. Please,log in" }</h3>
            <div>
            </div>
            { userId && <h4>User id is {userId}</h4>}
            { isLoading && <Loader/>}
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
                <h4>Current page is {page} from {totalPages}</h4>
                <button onClick={() => setPage(page + 1)}>More</button>
                <div className="observable-item" ref={lastElement} >sdsdsd3</div> 
            </ul>
        </div>
    )
}

export default AlbumsList
