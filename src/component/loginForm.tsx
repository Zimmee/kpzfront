import React, { useState } from "react";

interface IProps {
  onLoadFromUser(username: string): void;
  onLoadFromId(id: string): void;
}
const initialValues = {
  username: '',
  id: ''
}

const LoginForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initialValues);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...initialValues, [name]: value });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue.id !== '') {
      props.onLoadFromId(formValue.id)
    } else {
      props.onLoadFromUser(formValue.username)
    }
  };

  return (
    <div className="user-form">
      <h1>Load calendar</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formValue.username}
            onChange={onInputChange}
          />

        </div>
        <p>OR</p>
        <div className="form-row">
          <label>Calendar ID</label>
          <input
            type="text"
            name="id"
            value={formValue.id}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <button>Load</button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
