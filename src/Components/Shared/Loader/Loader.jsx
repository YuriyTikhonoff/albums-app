import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import './Loader.scss'


const Loader = () => {
    return (
        <div className="loader__container">
            <ClipLoader color={'#4545b9'} size={150} />
        </div>
    )
}

export default Loader
