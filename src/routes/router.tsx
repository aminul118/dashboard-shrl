import AddEvent from "@/pages/Event/AddEvent";
import AddUpcomingEvent from "@/pages/Event/AddUpcomingEvent";
import ManageEvent from "@/pages/Event/ManageEvent";
import ManageUpcomingEvent from "@/pages/Event/ManageUpcomingEvent";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AddScrollingText from "@/pages/ScrollingText/AddScrollingText";
import ManageScrollingText from "@/pages/ScrollingText/ManageScrollingText";
import AddTeamMember from "@/pages/Team/AddTeamMember";
import ManageTeamMember from "@/pages/Team/ManageTeamMember";
import { createBrowserRouter } from "react-router";
import Verify from "@/pages/auth/Verify";
import Profile from "@/pages/auth/Profile";
import ManageUser from "@/pages/auth/ManageUser";
import AdminLayout from "./AdminLayout";

const router = createBrowserRouter([
  {
    path: "",
    Component: AdminLayout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "add-upcoming-event",
        Component: AddUpcomingEvent,
      },
      {
        path: "manage-upcoming-event",
        Component: ManageUpcomingEvent,
      },
      {
        path: "add-event",
        Component: AddEvent,
      },
      {
        path: "manage-event",
        Component: ManageEvent,
      },

      {
        path: "add-team-member",
        Component: AddTeamMember,
      },
      {
        path: "manage-team-member",
        Component: ManageTeamMember,
      },
      {
        path: "add-scrolling-text",
        Component: AddScrollingText,
      },
      {
        path: "manage-scrolling-text",
        Component: ManageScrollingText,
      },
      {
        path: "manage-user",
        Component: ManageUser,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "verify",
    Component: Verify,
  },
]);

export default router;
