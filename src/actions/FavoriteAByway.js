import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

function FavoriteAByway({id, callback}) {
    const { byway } = useParams();
    const { currentUser } = useContext(UserContext);

    // const [favorite, setFavorite] = useState(false);
    // might need state for changing status on page from something that can be favorited to something that has been favorited - parkFavorited, setParkFavorited

    const [favorite, setFavorite] = useState();
    const [hasBeenSet, setHasBeenSet] = useState(false);

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
        setHasBeenSet(true);
        callback(evt)
        // set state variable to true
    }

        return (
            <div>
                {hasBeenSet
                ? (
                <Alert messages={["Byway added to your favorites."]} />
                 ) : (
                <button data-testid="submit_favorite" onClick={handleSubmit}>
                    Add this byway to your favorites
                </button>
                 )}
            </div>
        )
}

export default FavoriteAByway;