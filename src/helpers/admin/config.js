import { MdContentCopy, MdDashboard, MdOrder } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";

export const menuItems = [
    {
        name: "Leads Management",
        href: "/admin/leads",
        icon: SiGoogleads,
    },
    {
        name: "Projects",
        href: "/admin/pades",
        icon: MdContentCopy,
    },
];

export const logoutItem = {
    name: "Logout",
    icon: FaSignOutAlt,
};