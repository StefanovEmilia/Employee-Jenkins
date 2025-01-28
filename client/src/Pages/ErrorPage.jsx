import { useRouteError } from "react-router-dom";

const ErrorPage = ({search}) => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      {search ? (
        <h1>No employee with this name: { search}</h1>
      ) : (
        <>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </>
      )}
    </div>
  );
};

export default ErrorPage;
