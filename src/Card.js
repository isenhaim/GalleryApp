import React from "react";
import PropTypes from "prop-types";
import "./Card.css";


function Card({name, albums, photos, setActive, getAlbumId}) {

    function formingArrayPhotos(arr, id) {
        let array = [];
        arr.map(item => item.albumId === id ? array.push(item) : null);
        return array;
    }

    return (

        <div className="user__card">
            <div className="user__name">{name}</div>
            <div className="user__albums">
                    {albums.map((album, index) => {
                        return  (
                            <div className={"album"} key={album.id}>
                                <img key={index} id={album.id} className={"album__poster"} src={formingArrayPhotos(photos, album.id)[0].thumbnailUrl}
                                     alt={album.title}
                                     onClick={(event) => {
                                         setActive(true);
                                         getAlbumId(parseInt(event.target.id));
                                     }}/>
                                <div className={"album__count"}>{formingArrayPhotos(photos, album.id).length}</div>
                                <div className={"album__title"}>{album.title}</div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}


Card.propTypes = {
    name: PropTypes.string.isRequired,
    albums: PropTypes.array.isRequired,
    photos: PropTypes.array.isRequired,
    setActive: PropTypes.func.isRequired,
    getAlbumId: PropTypes.func.isRequired,
};

export default Card;
