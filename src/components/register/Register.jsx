import './register.scss';
import { useState } from "react";
import { postDataToBackendApi } from "../../utils/backend-api";
import CustomButton from "../custom/customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomInput from "../custom/customInput/CustomInput";

const Register = () => {
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		passwordAgain: ""
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
  const navigate = useNavigate();

	const handleInputChange = (e) => {
		setError(null);
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		})
	}

	const handleRegister = async(e) => {
		e.preventDefault();
		setLoading(true);
    setError(null);
		try{
			const res = await postDataToBackendApi("/user/create-user", inputs);
			console.log(res);
			setLoading(false);
      navigate("/user/home");

		}catch(errorMessage){
			console.log(errorMessage);
			setError(errorMessage);
			setLoading(false);
		}
	}

	const isFormValid = () => {
		return (
      inputs.name.length !== 0 
      && inputs.username.length !== 0 
      && inputs.email.length !== 0 
      && inputs.password.length !== 0 
      && inputs.passwordAgain.length !== 0
      && inputs.password === inputs.passwordAgain  
    )
	}

	return (
		<div className="register-container">
      <h1 className="heading">
        Register here. It's free.
      </h1>
			<form className="form" onSubmit={handleRegister}>
        <CustomInput 
          inputType={"text" }
          name={"name"}
          onChange={handleInputChange}
          value={inputs.name}  
          placeholder={"What do you want us to call you?"}
          label={'Display Name'}
          labelColor={'var(--orange)'}
        />
				<CustomInput 
					inputType="text" 
					name="username"
					onChange={handleInputChange}
					value={inputs.username}
					placeholder="Your favourite handle name?"
          label={'Your Username'}
          labelColor={'var(--orange)'}
				/>
				<CustomInput 
					inputType="email" 
					name="email"
					onChange={handleInputChange}
					value={inputs.email}
					placeholder="How can we contact you?" 
          label={'Your Email'}
          labelColor={'var(--orange)'}
				/>
				<CustomInput 
					inputType="password" 
					name="password"
					onChange={handleInputChange}
					value={inputs.password}
					placeholder="Shhh! Secret." 
          label={'Your Password'}
          labelColor={'var(--orange)'}
				/>
				<CustomInput 
					inputType="password" 
					name="passwordAgain"
					onChange={handleInputChange}
					value={inputs.passwordAgain}
					placeholder="Shhh! For the last time." 
          errorMessage={inputs.password !== inputs.passwordAgain && "Don't keep it a secret from yourself, passwords should match!"}
          label={'Re-enter Your Password'}
          labelColor={'var(--orange)'}
				/>

			  <div className="error-message-container">
          {error && <p className="error-message">* {error}</p>}
        </div>

				<CustomButton 
					text="Register" 
					type="PRIMARY"
					loading={loading}
					disabled={!isFormValid()}
          width={'100%'}
				></CustomButton>
			</form>
      <div className="action-buttons">
        <CustomButton
          text="Login here"
          type="SECONDARY"
          onClick={() => navigate("/user/login")}
          width={'100%'}
        />
      </div>
		</div>
	)
}

export default Register;