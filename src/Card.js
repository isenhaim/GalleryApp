import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import {formingArray} from "./App"

function Card({name, albums, photos, setActive, getAlbumId}) {
    return (

        <div className="user__card">
            <div className="user__name">{name}</div>
            <div className="user__albums">
                    {albums.map((album, index) => {
                        return  (
                            <div className={"album"} key={album.id}>
                                <img key={index} id={album.id} className={"album__poster"} src={formingArray(photos, album.id, 'albumId')[0].thumbnailUrl}
                                     alt={album.title}
                                     onClick={(event) => {
                                         setActive(true);
                                         getAlbumId(parseInt(event.target.id));
                                     }}/>
                                <div className={"album__count"}>{formingArray(photos, album.id, 'albumId').length}</div>
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
