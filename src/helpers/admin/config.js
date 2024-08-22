import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { SiPowerpages } from "react-icons/si";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";

export const menuItems = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: RiDashboardFill,
    },
    {
        name: "Leads Management",
        href: "/admin/leads",
        icon: SiGooglebigquery,
    },
    {
        name: "Projects",
        href: "/admin/projects",
        icon: SiPowerpages,
    },
    {
        name: "Workspace",
        href: "/admin/workspaces",
        icon: BsPersonWorkspace,
    },
];

export const logoutItem = {
    name: "Logout",
    icon: FaSignOutAlt,
};