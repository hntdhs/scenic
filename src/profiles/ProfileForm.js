import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import LimitedTextArea from "../common/LimitedTextArea";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    bio: currentUser.bio,
    userLocation: currentUser.userLocation,
    favoriteState: currentUser.favoriteState,
    profilePhoto: currentUser.profilePhoto,
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      bio: formData.bio,
      userLocation: formData.userLocation,
      favoriteState: formData.favoriteState,
      profilePhoto: formData.profilePhoto,
    };

    let username = currentUser.username;
    let updatedUser;

    try {
      updatedUser = await BywayApi.saveProfile(username, profileData);
    } catch (errors) {
      console.log('errors', errors)
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
    history.push("/profile");
  }

  /** Handle form data changing */
  function handleChange(name, value) {
    // console.log(evt)
    // const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div>
        <h2>Hi there, {currentUser.username}! This is where you create and edit your profile.</h2>
        <h3>Profile</h3>
            <form>
              <div>
                <label>Bio</label>
                <LimitedTextArea value={formData.bio} limit={200} onChange={(newValue) => {return handleChange('bio', newValue)}} />
              </div>
              <div>
                <label>Location</label>
                <LimitedTextArea value={formData.userLocation} limit={100} onChange={(newValue) => {return handleChange('userLocation', newValue)}} />
                {/* <input
                    name="userLocation"
                    value={formData.location}
                    onChange={handleChange}
                /> */}
                {/* there's two different input types so might need two versions of handleChange */}
              </div>
              <div>
                <label>Favorite state to travel to</label>
                <LimitedTextArea value={formData.favoriteState} limit={100} onChange={(newValue) => {return handleChange('favoriteState', newValue)}} />
              </div>
              <div>
                <label>Profile Photo</label>
                {/* <LimitedTextArea value={formData.profilePhoto} limit={1000} onChange={(newValue) => {return handleChange('profilePhoto', newValue)}} /> */}
                <input
                    name="profilePhoto"
                    value={formData.profilePhoto}
                    onChange={(event) => {return handleChange('profilePhoto', event.target.value)}}
                />
              </div>
              {/* switched profile photo back a regular input because limited text area doesn't make sense for a URL, but that means that the handleChange is going to be a little different for the different inputs. with a regular input the onChange uses an event, not newValue */}

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
      </div>
  );
}

export default ProfileForm;
