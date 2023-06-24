import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import { useToasts } from 'react-toast-notifications';


function SignupForm({ signup }) {
    const { addToast } = useToasts();
    const history = useHistory();
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
  
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );
    // question

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let result = await signup(formData);
            if (result.success) {
                history.push("/");
        //   adding new screen to navigation stack, we're saying go to this url next, adding it to the list of pages visited at the end and going to it
            } 
        } catch {
            if (errors.length > 0) {
                addToast(errors[0], { appearance: 'error' });
            }
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value}));
        // question
    }

    return (
        <div className="SignupForm">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <label>Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label>First name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>

            </form>
        </div>
    )




}

export default SignupForm;