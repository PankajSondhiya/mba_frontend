import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../configs/firebase.config";
import { queries } from "@testing-library/react";
import { CodeOutlined } from "@material-ui/icons";
import { AxiosInstance } from "../util/axiosInstance";
import { toast } from "react-toastify";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
const Passwordreset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [oobCode, setObbCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useFirebase();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("oobCode");
    if (code) {
      setObbCode(code);
    }
  }, [location]);

  async function resetpassowrd() {
    console.log(oobCode);
    try {
      await resetPassword(oobCode, newPassword);

      await AxiosInstance.put("/mba/api/v1/auth/resetpassword", {
        email: localStorage.getItem("vefication_email"),
        newPassword,
      });
      navigate("/login");
      toast.success("password reset successfull Kinldy login to continue");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="login-container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-5 d-flex flex-column justify-content-center align-items-center">
        <h4 className="mt-2"> Reset Password </h4>
        <div className="input-group  mb-3 d-flex justify-content-center align-items-center">
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div
            style={{ position: "absolute", right: "7px", zIndex: "100" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>
        <button className="btn btn-danger mb-3" onClick={resetpassowrd}>
          Change password
        </button>
      </div>
    </div>
  );
};

export default Passwordreset;
