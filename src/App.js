import React from "react";
import axios from "axios";
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
        albumId: 1,
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




    componentDidMount() {
        this.getData();
    }

    formingArrayAlbums(arr, id) {
        let array = [];
        arr.map(item => item.userId === id ? array.push(item) : null);
        return array;
    }

    formingArrayPhotos(arr, id) {
        let array = [];
        arr.map(item => item.albumId === id ? array.push(item) : null);
        return array;
    }

    photoGallery = () => {
        let photosArray = this.formingArrayPhotos(this.state.photos, this.state.albumId);
        let url = photosArray[0] ? photosArray[0].url : '';
        return <>
            <div className={'pic__block'}>
                <div>
                    <img src={url} alt=""/>
                </div>
                <div className={"pic__preview"}>
                    {photosArray.map((item, index) => { return <img key={index} className={"pic__photo"} src={item.thumbnailUrl} alt=""/> })}
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
                                albums={this.formingArrayAlbums(albums, user.id)}
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