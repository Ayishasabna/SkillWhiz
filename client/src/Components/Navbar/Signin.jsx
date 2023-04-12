import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axios, login } from "../../import";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user";

const Signin = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState();
  const handleMobile = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 10) {
      setMobile(trimValue);
    }
  };
  const handleclick = () => {
    const modalCheckbox = document.getElementById("my-modal-3");
    modalCheckbox.checked = false;
  };
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    if (mobile === "" || password === "") {
      Swal.fire("sorry", "All fields are required!!", "error");
    } else {
      axios
        .post("/signin", {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          if (!response.data.auth) {
            dispatch(logout())
            Swal.fire("sorry", response.data.message, "error");
          } else {
            localStorage.setItem("token", response.data.token);
            dispatch(login(response.data));
            handleclick();
            Swal.fire("success", response.data.message, "success");
          }
        });
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative w-auto bg-gradient-to-r from-red-200 to-amber-400 shadow-inner shadow-black">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl font-extrabold text-center p-2">Sign In</h3>
          <div className=" p-5 ">
            <form onSubmit={handleLogin}>
              <h1 className="font-bold py-2">Mobile</h1>
              <input
                type="number"
                min="0"
                className="border rounded-md p-1"
                placeholder="+91-"
                onChange={handleMobile}
                value={mobile}
                required
              />
              <h1 className="font-bold py-2">Password</h1>
              <input
                type="password"
                className="border rounded-md p-1"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <p className="py-2">
                Not a member?{" "}
                <label
                  htmlFor="my-modal-6"
                  className="font-bold cursor-pointer"
                  onClick={handleclick}
                >
                  Signup
                </label>{" "}
              </p>
              <div className="p-3 flex justify-center">
                <button className="btn btn-outline font-extrabold">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
