import HomePage from "./home";
import NotFoundPage from "./notfound";
import SettingPage from "./setting";

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
  {
    title: "setting",
    path: "/setting",
    element: <SettingPage />,
  },
];

export default pagesData;
