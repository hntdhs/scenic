import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function FavoriteAByway({id}) {
    const { byway } = useParams();
    const { currentUser } = useContext(UserContext);

    // const [favorite, setFavorite] = useState(false);
    // might need state for changing status on page from something that can be favorited to something that has been favorited - parkFavorited, setParkFavorited

    const [favorite, setFavorite] = useState();

    // useEffect(() => {  
    //     async function favorite(currentUser, byway) {
    //         await BywayApi.favoriteAByway(byway);
    //         setFavorite(true);

    //     }
    //     favorite(currentUser, byway);
    // }, []);

    async function handleSubmit(evt) {
        await BywayApi.favoriteAByway(currentUser.username, id);
        setFavorite(id);
    }

    return (
        <div>
            <button onClick={handleSubmit}>
                Add this byway to your favorites
            </button>
        </div>
    )
}

export default FavoriteAByway;