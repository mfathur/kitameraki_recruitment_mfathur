import { NavigateFunction, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate: NavigateFunction = useNavigate();

  const redirectToHomePage = (): void => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">Page Not Found</h1>
      <p>We're sorry, the page you requested could not be found.</p>
      <p>Please go back to the home page.</p>
      <button
        onClick={redirectToHomePage}
        className="btn btn-lg btn-contained mt-4 rounded-full"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
