import { useContext } from "react";

import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import facebookLogo from "../assests/img/icons8-facebook-48.png";
import githubLogo from "../assests/img/icons8-github-50.png";
import googleLogo from "../assests/img/icons8-google-48.png";
import { authContext } from "../component/authentication/AuthContext";
import UseTitle from "../component/hook/useTitle";

export default function Login() {
  const { signIn, loginWithGithub, loginWithgoogle, setIsLoading } =
    useContext(authContext);

  const navigate = useNavigate();
  const location = useLocation();

  // redirect user to the where the user want to go before login

  const from = location.state?.from?.pathname || "/";

  // login functionality

  const handleLogIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((data) => {
        form.reset();
        const userData = { email: data?.user.email };

        fetch(`${process.env.REACT_APP_API_URL}/jwtgenerate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((d) => {
            localStorage.setItem("jwttoken", d.token);
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        console.log(err);
        // message error in the toast
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // login with google function

  const handleLoginWithGoogle = () => {
    loginWithgoogle()
      .then((data) => {

        const userData = { email: data?.user.email };

        fetch(`${process.env.REACT_APP_API_URL}/jwtgenerate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((d) => {
            localStorage.setItem("jwttoken", d.token);
            userSaveToDb(data?.user?.email,data?.user?.displayName || 'not available')
            
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // login with github function
  const handleLoginWithGithub = () => {
    loginWithGithub()
      .then((data) => {
        const userData = { email: data?.user.email };

        fetch(`${process.env.REACT_APP_API_URL}/jwtgenerate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((d) => {
            localStorage.setItem("jwttoken", d.token);
            userSaveToDb(data?.user?.email,data?.user?.displayName || 'not available')
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const userSaveToDb = (email,name) => {
    fetch(`${process.env.REACT_APP_API_URL2}/user`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({userEmail:email,
      userName:name})
    })
    .then(res => res.json())
    .then(data => {
      navigate(from, { replace: true });
      
    })
    .catch(er => toast.error(er))
}


  UseTitle('Log In')

  return (
    <>
      <div className="container mx-auto">
      <div className="hero h-[89vh] bg-base-200">
        <div className="hero-content flex-col w-[600px]">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <label className="text-center block">
              <NavLink
                to="/register"
                className="label-text-alt link link-hover text-xl"
              >
                Regsiter
              </NavLink>
            </label>
            <div className="mx-auto" id="or">
              or
            </div>

            <div className="mx-auto flex justify-center pb-5">
              <div className="go p-2 rounded-md">
                <button onClick={handleLoginWithGoogle}>
                  <img className="cursor-pointer" src={googleLogo} alt="" />
                </button>
              </div>
              <div className="fa p-2 rounded-md mx-4">
                <button>
                  <img className="cursor-pointer" src={facebookLogo} alt="" />
                </button>
              </div>
              <div className="git p-2 rounded-md">
                <button onClick={handleLoginWithGithub}>
                  <img className="cursor-pointer" src={githubLogo} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
}
