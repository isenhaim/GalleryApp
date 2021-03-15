import React from "react";
import axios from "axios";
import Card from "./Card";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./App.css";

export function formingArray(arr, id, key) {
    let array = [];
    arr.map(item => item[key] === id ? array.push(item) : null);
    return array;
}

function Modal({active, setActive, children}) {
    return (
        <>
            {active ? <div className={'modal__overlay'} onClick={() => setActive(false)}>
                <div className={'modal__content'} onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div> : null}
        </>
    )
}


class App extends React.Component {
    state = {
        isLoading: true,
        albums: [],
        users: [],
        photos: [],
        modalActive: false,
        albumId: null,
        photoId: null,
        photo: 0,
    };

    getData = async () => {
        const albums = await axios.get(
            "https://jsonplaceholder.typicode.com/albums"
        );

        const users = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );

        const photos = await axios.get(
            "https://jsonplaceholder.typicode.com/photos"
        );

        this.setState({albums: albums.data, users: users.data, photos: photos.data, isLoading: false});
    };

    setActiveModal = (value) => {
        this.setState({modalActive: value})
    };

    getAlbumId = (value) => {
        this.setState({albumId: value})
    }

    componentDidMount() {
        this.getData();
    }

    // formingArrayAlbums(arr, id) {
    //     let array = [];
    //     arr.map(item => item.userId === id ? array.push(item) : null);
    //     return array;
    // }
    //
    // formingArrayPhotos(arr, id) {
    //     let array = [];
    //     arr.map(item => item.albumId === id ? array.push(item) : null);
    //     return array;
    // }

    imgPrev = () => {
        this.state.photo === 0
            ? this.setState({photo: 49})
            : this.setState({photo: this.state.photo - 1});
    };

    imgNext = () => {
        this.state.photo === 49
            ? this.setState({photo: 0})
            : this.setState({photo: this.state.photo + 1});
    };

    photoGallery = () => {
        let photosArray = formingArray(this.state.photos, this.state.albumId, 'albumId');
        let photo = formingArray(this.state.photos, this.state.albumId, 'albumId')[this.state.photo]
            ? formingArray(this.state.photos, this.state.albumId, 'albumId')[this.state.photo]
            : '';

        return <>
            <div className={'pic__block'}>
                <div className={"pic__main"}>
                    <div className={"pic__prev"} >
                        <button onClick={this.imgPrev}><FontAwesomeIcon icon={faArrowLeft} /></button>

                    </div>

                    <img src={photo.url} alt={photo.title}/>

                    <div className={"pic__next"} >
                        <button onClick={this.imgNext}><FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
                <div className={"pic__preview"}>
                    {photosArray.map((item, index) => {
                        return <img
                            key={index}
                            className={item.id === photo.id ? "pic__photo active" : "pic__photo"}
                            src={item.thumbnailUrl}
                            alt={item.title}
                            onClick={() => this.setState({photo: index})}
                        />
                    })}
                </div>
            </div>
        </>
    };

    render() {
        const {isLoading, users, albums, photos, modalActive} = this.state;

        return (
            <div className={"section"}>
                <Modal active={modalActive} setActive={this.setActiveModal} children={this.photoGallery()} />
                {isLoading
                    ? <div className={"loader"}>"Loading..."</div>
                    : users.map((user) => {
                        return (
                            <Card
                                key={user.id}
                                name={user.name}
                                albums={formingArray(albums, user.id, 'userId')}
                                photos={photos}
                                setActive={this.setActiveModal}
                                getAlbumId={this.getAlbumId}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default App;