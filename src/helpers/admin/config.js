import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { SiPowerpages } from "react-icons/si";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";
import { GiAutomaticSas } from "react-icons/gi";

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
    ,{
        name: "Automation",
        href: "/admin/automation",
        icon: GiAutomaticSas,
    }
];

export const logoutItem = {
    name: "Logout",
    icon: FaSignOutAlt,
};

export const DoughnutChartData = [
    {
        lable : "mature",
        value : 32
    },
    {
        lable : "Premature",
        value : 45
    },
    {
        lable : "Dead",
        value : 23
    }
]

export const FollowUpChart = [
    {
        lable : "yes",
        value : 32
    },
    {
        lable : "no",
        value : 45
    },
]