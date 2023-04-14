import { useState, Swal, axios } from "./import";

const OTP = ({ mobile }) => {
  const [otp, setOtp] = useState("");
  const handleOtp = (e) => {
    const trimValue = e.target.value.replace(/[^0-9]/g, "");
    if (trimValue.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const handleOTP = () => {
    if (otp.length < 6 || otp === "") {
      Swal.fire("Sorry", "Invalid Entry", "error");
    } else {
      axios
        .post("/expert/verify-otp", { otp: otp, mobile: mobile })
        .then((response) => {
          console.log("verified: " + response.data);
          if (response.data.status == "success") {
            Swal.fire("success", response.data.message, "success");
            const otpbox = document.getElementById("expert-otp");
            otpbox.checked = false;
          } else {
            Swal.fire("Sorry", "Wrong OTP", "error");
          }
        })
        .catch((error) => {
          Swal.fire("sorry", "Wrong OTP. kindly reset. " + error, "error");
        });
    }
  };
  return (
    <>
      <input type="checkbox" id="expert-otp" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full bg-orange-200">
          <label
            htmlFor="expert-otp"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-center p-5 text-3xl font-extrabold">Enter OTP</h1>
          <h1 className="text-center p-2 text-2xl font-bold">
            Enter the OTP sent to +91-{mobile}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <input
              className="m-2 border h-10 w-36 text-center form-control rounded border-slate-500 my-2 tracking-widest"
              min="0"
              type="number"
              onChange={handleOtp}
              value={otp}
            />
            <button onClick={handleOTP} className="btn m-2">
              {" "}
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default OTP;