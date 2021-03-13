import React from "react";
import axios from "axios";
// import Modal from "./Modal";
import Card from "./Card";
import "./App.css";
import "./Modal.css";

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
        photoId: 1
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

    photoGallery = () => {
        return <>
            <div className={'pic__block'}>
                <div>
                    <img
                        // src={this.state.photos.map((photo) => {return this.state.photoId === photo.id  && photo.albumId === this.state.albumId ? photo.url : null})}
                        src={"https://via.placeholder.com/600/92c952"}
                        alt=""/>
                </div>
                <div className={"pic__preview"}>
                    {this.state.photos.map((photo, index) => {
                        return parseInt(this.state.albumId) === parseInt(photo.albumId)
                            ? (
                                <img key={index} className={"pic__photo"} src={photo.thumbnailUrl} alt=""/>
                            )
                            : null;
                    })}
                </div>
            </div>
        </>
    };


    componentDidMount() {
        this.getData();
    }

    render() {
        const {isLoading, users, albums, photos, modalActive} = this.state;
        return (
            <div className={"section"}>
                <Modal active={modalActive} setActive={this.setActiveModal} children={this.photoGallery()}/>
                {isLoading
                    ? <div className={"loader"}>"Loading..."</div>
                    : users.map((user) => {
                        return (
                            <Card
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                albums={albums}
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