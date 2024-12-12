import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TokenRedirect() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }

    navigate("/home", { replace: true });
  }, []);

  return <div>TokenRedirect page</div>;
}

export default TokenRedirect;
