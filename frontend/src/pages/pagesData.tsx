import HomePage from "./home";
import NotFoundPage from "./notfound";

const pagesData: RouterType[] = [
  {
    title: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    title: "notfound",
    path: "*",
    element: <NotFoundPage />,
  },
];

export default pagesData;
