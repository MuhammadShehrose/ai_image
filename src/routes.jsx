import {
  HomeIcon,
  PhotoIcon,
  DocumentTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";

import { Home } from "@/pages/dashboard";
import EnhanceImage from "@/pages/dashboard/EnhanceImage";
import TextToImage from "@/pages/dashboard/TextToImage";
import Gallery from "@/pages/dashboard/Gallery";
import { SignIn, SignUp } from "@/pages/auth";

import PrivateRoute from "@/components/PrivateRoute"; // 👈 Make sure this file exists
import PublicRoute from "@/components/PublicRoute"; // 👈 Make sure this file exist s
import { TrashIcon } from "@heroicons/react/24/solid"; // 👈 new icon
import DeleteAccount from "@/pages/dashboard/DeleteAccount"; // 👈 new page

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   path: "/home",
      //   element: (
      //     <PrivateRoute>
      //       <Home />
      //     </PrivateRoute>
      //   ),
      // },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "gallery",
        path: "/gallery",
        element: (
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        ),
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "enhance image",
        path: "/enhance-image",
        element: (
          <PrivateRoute>
            <EnhanceImage />
          </PrivateRoute>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "text to image",
        path: "/text-to-image",
        element: (
          <PrivateRoute>
            <TextToImage />
          </PrivateRoute>
        ),
      },
      {
        icon: <TrashIcon {...icon} />,
        name: "delete account",
        path: "/delete-account",
        element: (
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        path: "/sign-in",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
    ],
  },
];

export default routes;
