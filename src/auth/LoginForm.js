import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import { ToastProvider, useToasts } from 'react-toast-notifications';


/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const { addToast } = useToasts();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //     "LoginForm",
  //     "login=", typeof login,
  //     "formData=", formData,
  //     "formErrors", formErrors,
  // );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    console.log(login)
    evt.preventDefault();
    try {
      let result = await login(formData);
      if (result.success) {
        history.push("/");
      } else {
        result.errors.forEach(i =>  addToast(i, { appearance: 'error' }));
      }
    } catch (errors) {
      if (errors.length > 0) {
        addToast(errors[0], { appearance: 'error' });
      }
      setFormErrors(errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div class="container text-center" id="app-name">
                <h1>NATIONAL SCENIC BYWAYS</h1>
            </div>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                  data-testid='username'
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                  data-testid='password'
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                data-testid='loginSubmit'
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
