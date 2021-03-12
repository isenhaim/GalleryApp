import React from "react";
import axios from "axios";
// import Albums from "./Albums";
import Card from "./Card";
import "./App.css";

class App extends React.Component {
    state = {
        isLoading: true,
        albums: [],
        users: [],
        photos: [],
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

    componentDidMount() {
        this.getData();
    }

    render() {
        const {isLoading, users, albums, photos} = this.state;
        console.log(albums);
        return (
            <div className={"section"}>
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
                            />
                        )
                    })
                }
            </div>
        );
    }

}

export default App;

// (user) =>
//                 function(user) {

//                   albums.map((album) => {
//                     return user.id === album.userId ? 
//                       <div>
//                       <Albums
//                         key={album.id}
//                         id={album.id}
//                         userId={album.userId}
//                         title={album.title}
//                       />
//                       </div>
//                     : ''
//                   })
//                 }