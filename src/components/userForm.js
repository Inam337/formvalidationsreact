import React, { Component } from "react";
import { validateFields } from "./Validation/validator";
import classnames from "classnames";

const initialState = {
  fullname: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  usertype: {
    value: "Select Type",
    validateOnChange: false,
    error: "",
  },
  email: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  password: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  termcheckbox: {
    value: "",
    validateOnChange: false,
    error: "",
    isChecked: true,
  },
  checked: true,
  submitCalled: false,
  allFieldsValidated: false,
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  handleCheck() {
    this.setState({ checked: !this.state.checked });
  }
  /*
   * validates the field onBlur if sumbit button is not clicked
   * set the validateOnChange to true for that field
   * check for error
   */
  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]["validateOnChange"] === false &&
      this.state.submitCalled === false
    ) {
      this.setState((state) => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value),
        },
      }));
    }
    return;
  }

  /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState((state) => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]["validateOnChange"] ? validationFunc(fieldVal) : "",
      },
    }));
    if (document.getElementById("termcheckbox").checked) {
      // box is
      document.getElementById("termcheckbox").value = "on";
    } else {
      // box is
      document.getElementById("termcheckbox").value = "off";
    }
  }

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  handleSubmit(evt) {
    evt.preventDefault();

    // validate all fields
    const { fullname, usertype, email, password, termcheckbox } = this.state;
    const fullnameError = validateFields.validateFullname(fullname.value);
    const usertypeError = validateFields.validateUsertype(usertype.value);
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    const termcheckboxError = validateFields.validateCheckBox(
      termcheckbox.value
    );
    if (
      [
        fullnameError,
        usertypeError,
        emailError,
        passwordError,
        termcheckboxError,
      ].every((e) => e === false)
    ) {
      // no errors submit the form
      console.log("success");

      // clear state and show all fields are validated
      this.setState({ ...initialState, allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState((state) => ({
        fullname: {
          ...state.fullname,
          validateOnChange: true,
          error: fullnameError,
        },
        usertype: {
          ...state.usertype,
          validateOnChange: true,
          error: usertypeError,
        },
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError,
        },
        termcheckbox: {
          ...state.termcheckbox,
          validateOnChange: true,
          error: termcheckboxError,
        },
      }));
    }
  }
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    const {
      fullname,
      usertype,
      email,
      password,
      termcheckbox,
      allFieldsValidated,
    } = this.state;

    return (
      <div className="form-main col-md-4 offset-md-4 col-lg-4 offset-lg-4 mt-4 mb-4 text-left">
        <div className="Form col-md-12 col-lg-12">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="text-center">Form Validation React</h4>
            </div>

            <div className="card-body">
              {allFieldsValidated && (
                <p className="text-success">
                  Success, All fields are validated
                </p>
              )}

              {/* Form Starts Here */}
              <form
                onSubmit={(evt) => this.handleSubmit(evt)}
                autoComplete="off"
              >
                {/* Fullname field */}
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname.value}
                    placeholder="Enter full name"
                    className={classnames(
                      "form-control",
                      { "is-valid": fullname.error === false },
                      { "is-invalid": fullname.error }
                    )}
                    onChange={(evt) =>
                      this.handleChange(validateFields.validateFullname, evt)
                    }
                    onBlur={(evt) =>
                      this.handleBlur(validateFields.validateFullname, evt)
                    }
                  />
                  <div className="invalid-feedback">{fullname.error}</div>
                </div>
                {/* EmaUser Type field */}
                <div className="form-group">
                  <label>User Type</label>
                  <select
                    name="usertype"
                    value={this.state.value}
                    required
                    className={classnames(
                      "form-control",
                      { "is-valid": usertype.error === false },
                      { "is-invalid": usertype.error }
                    )}
                    onChange={(evt) =>
                      this.handleChange(validateFields.validateUsertype, evt)
                    }
                    onBlur={(evt) =>
                      this.handleBlur(validateFields.validateUsertype, evt)
                    }
                  >
                    <option value="Select Type">Select Type</option>
                    <option value="Consumer">Consumer</option>
                    <option value="Business">Business</option>
                  </select>
                  <div className="invalid-feedback">{usertype.error}</div>
                </div>
                {/* Email field */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={email.value}
                    placeholder="Enter your email"
                    className={classnames(
                      "form-control",
                      { "is-valid": email.error === false },
                      { "is-invalid": email.error }
                    )}
                    onChange={(evt) =>
                      this.handleChange(validateFields.validateEmail, evt)
                    }
                    onBlur={(evt) =>
                      this.handleBlur(validateFields.validateEmail, evt)
                    }
                  />
                  <div className="invalid-feedback">{email.error}</div>
                </div>

                {/* Password field */}
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password.value}
                    placeholder="Enter your password"
                    className={classnames(
                      "form-control",
                      { "is-valid": password.error === false },
                      { "is-invalid": password.error }
                    )}
                    onChange={(evt) =>
                      this.handleChange(validateFields.validatePassword, evt)
                    }
                    onBlur={(evt) =>
                      this.handleBlur(validateFields.validatePassword, evt)
                    }
                  />
                  <div className="invalid-feedback">{password.error}</div>
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="termcheckbox"
                    name="termcheckbox"
                    value=""
                    className={classnames(
                      "termcheckbox",
                      { "is-valid": termcheckbox.error === false },
                      { "is-invalid": termcheckbox.error }
                    )}
                    onChange={(evt) =>
                      this.handleChange(validateFields.validateCheckBox, evt)
                    }
                    onBlur={(evt) =>
                      this.handleBlur(validateFields.validateCheckBox, evt)
                    }
                  />
                  &nbsp;Term & Conditions
                  <div className="invalid-feedback">{termcheckbox.error}</div>
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block"
                  onMouseDown={() => this.setState({ submitCalled: true })}
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
}
export default Form;
