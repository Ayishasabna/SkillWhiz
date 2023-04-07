import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { adminlogin } from "../../../redux/admin";
const NavbarAdmin = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleLogout=()=>{
        localStorage.removeItem("admintoken")
        navigate("/admin")
        dispatch(adminlogin(null))
    }
  return (
    <>
      <div className="navbar bg-neutral-600 text-neutral-content shadow-2xl">
      <div className="navbar-start">
        <label htmlFor="my-drawer-2" className="px-2 ">
          <img className="w-14 rounded-full" src={logo} alt="logo" />
        </label></div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-white">
                <img
                  alt="image"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a className="items-start flex-col">
                  <b></b>
                  Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavbarAdmin;