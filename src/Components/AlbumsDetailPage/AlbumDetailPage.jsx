import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import photosAPI from '../../Api/photosAPI';
import Loader from '../Shared/Loader/Loader';
import Error from '../Shared/Error/Error';
import { getPageCount } from '../../Utils/pages';
import { getIdTitleAlbumsMap } from '../../Utils/maps'; 

import './AlbumDetailPage.scss'

const AlbumDetailPage = () => {
    const [photos, setPhotos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limitPhotos] = useState(3);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const {albumId} = useParams();
    const { albums } = useSelector(state => state.albumList);
    const idTitleAlbumsMap = getIdTitleAlbumsMap(albums);

    const fetchPhotos = async () => {
            setIsLoading(true)
            const photosResponse = await photosAPI.get(`?albumId=${albumId}`,            {
                params: { _limit: limitPhotos, _page: page }
            });

            const totalCount = photosResponse.headers['x-total-count']
            setTotalPages(getPageCount(totalCount, limitPhotos))
            setPhotos([...photos, ...photosResponse.data])
            setIsLoading(false);
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [])

    useEffect(() => {
        if (fetching) {
            try {
                fetchPhotos()
                setPage(page + 1)
            } catch (error) {
                setError(error)
            } finally {
                setFetching(false)
            }
        }

        return () => {
            setFetching(false)
        }
    }, [fetching])

    const scrollHandler = (e) => {
        const { scrollHeight, scrollTop } = e.target.documentElement;
        const { innerHeight: windowInnerHeight } = window;
        const isPageBottom = (scrollHeight - (scrollTop + windowInnerHeight)) < 0.5;
        if ((isPageBottom) && ((page < totalPages) || (totalPages === 0))) {
            setFetching(true)
        }
    }

    return (
        <div>
            { error && <Error errorMessage={error}/>}
            {isLoading && <Loader />}
            <h2>Album detail page</h2>
            <h3 className="album__title">{idTitleAlbumsMap[albumId]}</h3>
            <ul>
                {photos.map(({id, title, url}) => (
                    <div key={id}>
                        <div className="item__title"><b>Photo: </b>{title} </div>
                        <img className="item__img" src={url} alt={title}></img>
                        <hr/>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AlbumDetailPage
