import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { SiPowerpages } from "react-icons/si";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaCalendarWeek } from "react-icons/fa";
import { SiAndroidauto } from "react-icons/si";

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
        name: "Leaves",
        href: "/admin/leaves",
        icon: FaCalendarWeek,
    }, {
        name: "Workspace",
        href: "/admin/workspaces",
        icon: BsPersonWorkspace,
    },
    , {
        name: "Automation",
        href: "/admin/automation",
        icon: SiAndroidauto,
    }
];

export const logoutItem = {
    name: "Logout",
    icon: FaSignOutAlt,
};


export const servicesOptions = [
    {
        id: 1,
        name: 'Digital Marketing'
    },
    {
        id: 2,
        name: 'Social Media Marketing'
    },
    {
        id: 3,
        name: "Business Solutions"
    },
    {
        id: 4,
        name: "IT Services"
    }
];

export const LeaveOption = [
    {
        id: 1,
        type: 'Full Day'
    },
    {
        id: 2,
        type: 'Half Day'
    }
];
 
 export const permanentholidays=[
    {
        id:1,
        name:"New Year's Day",
        date:"01-Jan-2024"

    },
    {
        id:2,
        name:"Republic Day",
        date:"26-Feb-2024"
    },
    {
        id:3,
        name:"Maha shivaratri",
        date:"08-Mar-2024" 
    },
    {
        id:4,
        name:"Holi",
        date:"25-Mar-2024" 
    },
    {
        id:5,
        name:"Good Friday",
        date:"08-Mar-2024" 
    },
    {
        id:6,
        name:"Maha shivaratri",
        date:"08-Mar-2024" 
    },
    {
        id:7,
        name:"independence day",
        date:"15-Aug-2024" 
    },
    {
        id:8,
        name:"Raksha Bandhan",
        date:"19-Aug-2024" 
    }, {
        id:9,
        name:"Gandhi Jayenti",
        date:"02-Oct-2024" 
    },
    {
        id:10,
        name:"Vijayadashami",
        date:"12-Oct-2024" 
    },
    {
        id:11,
        name:"Diwali",
        date:"01-Nov-2024" 
    },
    {
        id:12,
        name:"Christmas",
        date:"25-Dec-2024" 
    }
 ]



export const DoughnutChartData = [
    {
        lable: "mature",
        value: 32
    },
    {
        lable: "Premature",
        value: 45
    },
    {
        lable: "Dead",
        value: 23
    }
]

export const FollowUpChart = [
    {
        lable: "yes",
        value: 32
    },
    {
        lable: "no",
        value: 45
    },
]