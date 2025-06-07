import  { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EMAIL_REGEX } from '../util/constant';
import useRequest from "../hooks/useRequest";
import AuthLayout from '../Components/AuthLayout';
import { authSuccess } from '../store/auth/action';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { request: requestLogin, response: responseLogin } = useRequest();

    const onSubmit = (data) => {
        const { email, password } = data;
        requestLogin("POST","auth/login",{email, password})
    }

    useEffect(() => {
        if(responseLogin){
            if(responseLogin?.status){
                const {_id, name, email} = responseLogin?.user ?? {};
                const accessToken = responseLogin?.accessToken;
                const refreshToken = responseLogin?.refreshToken;
                      toast.success(responseLogin?.message);
                      dispatch(
                          authSuccess({
                            id:_id,
                            name,
                            email,
                            accessToken,
                            refreshToken
                          })
                      );
                      localStorage.setItem("user", JSON.stringify({ id:_id, email, name,loggedIn:true }));
                      navigate("/dashboard");
            }
            else{
                toast.error(responseLogin?.message);
            }
        }
    },[responseLogin])
    
    return (
        <AuthLayout>
            <div className="login-header text-center">
                <h2 className="form-heading login-title">Login</h2>
            </div>
            <div className="rows">
                <form className="form_input_box" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group floating-group">
                                <label className="floating-label">Email </label>
                                <input type="text" name="email" {...register("email", {
                                        required: true,
                                        pattern:
                                        EMAIL_REGEX,
                                        setValueAs: (v) => v.trim(),
                                    })} className="form-control floating-control"
                                    placeholder="Enter email"/>

                                {errors?.email && errors?.email.type === "required" && (
                                    <span className="invalid-feedback">
                                         Email field is required.
                                    </span>
                                )}
                                {errors?.email && errors?.email.type === "pattern" && (
                                    <span className="invalid-feedback">
                                        Please enter a valid email.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group floating-group ">
                                <label className="floating-label">Password</label>
                                <div className="input_iconBox">
                                    <input 
                                        type={"password"} 
                                        name="password" className="form-control floating-control"
                                        placeholder="Enter password" 
                                        id="password" 
                                        {...register("password", {
                                            required: true,
                                           
                                        })}/>
                                </div>
                                {errors?.password && errors?.password?.type === "required" && (
                                        <span className="invalid-feedback">
                                             Password field is required.
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="button-box">
                                <button type="submit" className="btn-primary w-100">Sign In</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="position-relative">
                    <div className="no-account">
                        Are you new here? <Link to="/signup"  className="forgot-password">Create Account</Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login
