import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import photosAPI from '../../Api/photosAPI';
import { getPageCount } from '../../Utils/pages';
import { getUrlParamsFromArr } from '../../Utils/urlParams';
import { getIdTitleAlbumsMap } from '../../Utils/maps'; 
import Loader from '../Shared/Loader/Loader';
import Error from '../Shared/Error/Error';

import './AlbumsList.scss';

const AlbumsList = () => {
    const { userInfo } = useSelector(state => state.userLogin);
    const { albums } = useSelector(state => state.albumList);
    const [totalPages, setTotalPages] = useState(0);
    const [limitPhotos] = useState(6);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState([]);
    const [fetching, setFetching] = useState(true);

    const history = useHistory();
    const idTitleAlbumsMap = getIdTitleAlbumsMap(albums);

    const scrollHandler = (e) => {
        const { scrollHeight, scrollTop } = e.target.documentElement;
        const { innerHeight: windowInnerHeight } = window;
        const isPageBottom = (scrollHeight - (scrollTop + windowInnerHeight)) < 0.5;
        if ((isPageBottom) && ((page < totalPages) || (totalPages === 0))) {
            setFetching(true);
        }
    }

    const fetchPhotos = async () => {
        setIsLoading(true)
        const photosResponse = await photosAPI.get(getUrlParamsFromArr(albums.map(el => el.id), 'albumId'),
            {
                params: { _limit: limitPhotos, _page: page }
            }
        );

        const totalCount = photosResponse.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limitPhotos));
        setPhotos([...photos, ...photosResponse.data]);
        setIsLoading(false);
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [])

    useEffect(() => {
        if (fetching) {
            try {
                fetchPhotos();
                setPage(page + 1);
            } catch (error) {
                setError(error);
            } finally {
                setFetching(false);
            }
        }

        return () => {
            setFetching(false);
        }
    }, [fetching])



    return (
        <div>
            { error && <Error errorMessage={error}/>}
            <h2>AlbumsList</h2>
            {userInfo
                ?
                <div>
                    {isLoading && <Loader />}
                    <ul>
                        {photos.map(({ id, albumId, title, thumbnailUrl }) => (
                            <div key={id}>
                                <div className="album__btn"
                                    onClick={() => history.push(`/albums/${albumId}`)}
                                >
                                Watch full album "{idTitleAlbumsMap[albumId]}"
                                </div>
                                <div className="album__title"><b>Photo: </b>{title} </div>
                                <img src={thumbnailUrl} alt="thumbnail"></img>
                                <hr />
                            </div>
                        ))}
                    </ul>
                </div>

                :
                <h3>The user is not authorized.<br/> Please,log in </h3>}
        </div>
    )
}

export default AlbumsList
