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

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let result = await signup(formData);
            if (result.success) {
                history.push("/");
        //   adding new screen to navigation stack, we're saying go to this url next, adding it to the list of pages visited at the end and going to it
            }  else {
                result.errors.forEach(i =>  addToast(i, { appearance: 'error' }));
            }
        } catch  (errors) {
           
            if (errors.length > 0) {
                addToast(errors[0], { appearance: 'error' });
            }
            setFormErrors(errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value}));
        // question
    }

    return (
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div class="container text-center" id="app-name">
                <h1>NATIONAL SCENIC BYWAYS</h1>
            </div>
            <h3 className="mb-3">Sign Up</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>First name</label>
                            <input
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

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
            </div>
        </div>
    )




}

export default SignupForm;