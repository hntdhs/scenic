import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";

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
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div>
        <h3>Profile</h3>
            <form>
              <div>
                <label>Bio</label>
                <input
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Location</label>
                <input
                    name="userLocation"
                    value={formData.location}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Favorite state to travel to</label>
                <input
                    name="favoriteState"
                    value={formData.favoriteState}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Profile Photo</label>
                <input
                    name="profilePhoto"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                />
              </div>
              {/* <div>
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div> */}

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
