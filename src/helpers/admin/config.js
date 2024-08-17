import { MdContentCopy, MdDashboard, MdOrder } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

export const menuItems = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: RiDashboardFill,
    },
    {
        name: "Leads Management",
        href: "/admin/leads",
        icon: SiGoogleads,
    },
    {
        name: "Projects",
        href: "/admin/projects",
        icon: MdContentCopy,
    },
];

export const logoutItem = {
    name: "Logout",
    icon: FaSignOutAlt,
};