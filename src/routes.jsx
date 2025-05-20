import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  PhotoIcon,           // for image
  DocumentTextIcon,    // for text
  Squares2X2Icon       // for gallery
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import EnhanceImage from "@/pages/dashboard/EnhanceImage";
import TextToImage from "@/pages/dashboard/TextToImage";
import Gallery from "@/pages/dashboard/Gallery";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        // icon: <RectangleStackIcon {...icon} />,  // You can choose any icon
        icon: <PhotoIcon {...icon} />,  // You can choose any icon
        name: "enhance image",
        path: "/enhance-image",
        element: <EnhanceImage />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,  // You can choose any icon
        name: "text to image",
        path: "/text-to-image",
        element: <TextToImage />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "gallery",
        path: "/gallery",
        element: <Gallery />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    // title: "auth pages",
    layout: "auth",
    pages: [
      {
        // icon: <ServerStackIcon {...icon} />,
        // name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        // icon: <RectangleStackIcon {...icon} />,
        // name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
