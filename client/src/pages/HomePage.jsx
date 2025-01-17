import { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import BannerRec from "../components/Home/BannerRec";
import JobPortalContent from "../components/Home/JobPortalContent";
import { useCookies } from "react-cookie";

function HomePage() {
  const [authToken, setAuthToken] = useState(null); // Initialize authToken as null
  const [cookies] = useCookies(["auth_token"]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [role, setRole] = useState(null);

  const decodeJWT = (auth_token) => {
    if (auth_token) {
      const [, payload] = auth_token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    }
    return null;
  };

  useEffect(() => {
    const tokenFromCookies = cookies.auth_token || null;
    setAuthToken(tokenFromCookies);
    setTimeout(() => setIsLoading(false), 500);

    if (tokenFromCookies) {
      const decodedToken = decodeJWT(tokenFromCookies);
      const role = decodedToken?.role;
      if (role === "company") {
        setRole(role);
        console.log("User ID from JWT:", role);
      }
    }
  }, [cookies.auth_token]);

  return (
    <div>
      {role ? <BannerRec /> : <Banner />}
      <JobPortalContent />
    </div>
  );
}

export default HomePage;
