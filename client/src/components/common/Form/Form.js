import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

const Form = (props) => {
  const {
    submitHandler,
    onUsernameChange,
    onPasswordChange,
    formType,
    canSubmit
  } = props;

  const passwordLabel = formType === 'register' 
    ? 'Password (must be at least 8 characters long, with at least one letter and one number)'
    : 'Password';

  return (
    <form className="form-body" onSubmit={submitHandler}>
       <h3>{formType === 'login' ? 'Sign In' : 'Sign Up'}</h3>
        <div className="form-group">
            <label>Username (ex: jmetz93)</label>
            <input type="username" className="form-control" placeholder="Enter email" onChange={(e) => onUsernameChange(e.target.value)} />
        </div>
        <div className="form-group">
            <label>{passwordLabel}</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => onPasswordChange(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={canSubmit}>{formType === 'login' ? 'Log In' : 'Register'}</button>
        {formType === 'register' && <p className="forgot-password text-right">
          Already registered <Link to='/login'>sign in?</Link>
        </p>}
    </form>
  )
}

export default Form;