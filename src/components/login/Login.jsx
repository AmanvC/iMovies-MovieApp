import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../custom/customButton/CustomButton";
import CustomInput from "../custom/customInput/CustomInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [ error, setError ] = useState(null);
  const { login, userLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setError(null);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    const msg = await login(inputs.username, inputs.password);
    if(msg.length > 0){
      setError(msg);
    }else{
      setError(null);
    }
  }

  const isFormValid = () => {
    return inputs.username.length > 0 && inputs.password.length > 0;
  }

	return (
		<div className="login-form-container">
      <h1 className="heading">
        Login to iMovies
      </h1>
      <form onSubmit={handleLogin}>
        <CustomInput 
          inputType={"text" }
          placeholder={"Welcome back, ...?"}
          label={"Username"}
          labelColor={'var(--orange'}
          name={"username"}
          onChange={handleOnChange}
          value={inputs.username}  
        />
        <CustomInput 
          inputType={"password"} 
          placeholder={"Shhh! Keep it a secret."}
          label={"Password"}
          labelColor={'var(--orange'}
          name={"password"}
          onChange={handleOnChange}
          value={inputs.password}
        />

        <div className="error-message-container">
          {error && <p className="error-message">* {error}</p>}
        </div>

        <CustomButton 
          text="Login" 
          type="PRIMARY"
          disabled={!isFormValid()}
          loading={userLoading}
          width={'100%'}
        />
      </form>
      <div className="action-buttons">
        <CustomButton
          text="Forgot password?"
          type="SECONDARY"
          width={'auto'}
          disabled={true}
        />
        <CustomButton
          text="Create new account"
          type="SECONDARY"
          onClick={() => navigate("/user/register")}
          width={'auto'}
        />
      </div>
    </div>
	)
}

export default Login;