import  {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EMAIL_REGEX } from '../util/constant';
import useRequest from "../hooks/useRequest";
import AuthLayout from '../Components/AuthLayout';

const Signup = () => {
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
      setError
  } = useForm();

  const { request: requestSignup, response: responseSignup }= useRequest();

  const onSubmit = (data) => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = data;

    if (password != confirmPassword) {
      setError("confirmPassword", { type: "manual" });
      return;
    }
    
    requestSignup("POST","auth/register",{name,email, password})
  }

  useEffect(() => {
    if(responseSignup){
      if(responseSignup?.status){
        navigate("/login")
        toast.success(responseSignup?.message);
      }
      else{
          toast.error(responseSignup?.message);
      }
    }
  },[responseSignup])

  return (
    <AuthLayout>
      <div className="login-header text-center">
        <h2 className="form-heading login-title">Create Account</h2>
      </div>
      <div className="rows">
        <form className="form_input_box" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12">
              <div className="form-group floating-group">
                <label className="floating-label">Name </label>
                <input
                  type="text"
                  name="name"
                  className="form-control floating-control"
                  placeholder="Enter Name"
                  {...register("name", {
                    required: true,
                    setValueAs: (v) => v.trim(),
                  })}
                />
                {errors?.name && errors?.name.type === "required" && (
                      <span className="invalid-feedback">
                          Name field is required.
                      </span>
                 )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group floating-group">
                <label className="floating-label">Email </label>
                <input
                  type="text"
                  name="email"
                  className="form-control floating-control"
                  placeholder="Enter email"
                  {...register("email", {
                    required: true,
                    pattern:
                    EMAIL_REGEX,
                    setValueAs: (v) => v.trim(),
                })}
                />
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
                    className="form-control floating-control"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                </div>
                {errors?.password && errors?.password?.type === "required" && (
                        <span className="invalid-feedback">
                            Password field is required.
                        </span>
                    )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group floating-group ">
                <label className="floating-label">Confirm Password</label>
                <div className="input_iconBox">
                  <input
                    type={"password"} 
                    className="form-control floating-control"
                    placeholder="Enter Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                </div>
                {errors?.confirmPassword && errors?.confirmPassword?.type === "required" && (
                        <span className="invalid-feedback">
                            Confirm password field is required.
                        </span>
                    )}
                {errors?.confirmPassword && errors?.confirmPassword?.type === "manual" && (
                    <span className="invalid-feedback">
                        Password and confirm password does not match
                    </span>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="button-box">
                <button type="submit" className="btn-primary w-100">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="position-relative">
          <div className="no-account">
            Already have an account?{" "}
            <Link to="/login" className="forgot-password">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>    
  );
};

export default Signup;
