import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { SiPowerpages } from "react-icons/si";
import { SiGooglebigquery } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaCalendarWeek } from "react-icons/fa";
import { SiAndroidauto } from "react-icons/si";
import { VscTasklist } from "react-icons/vsc";
import { FaLaptopCode } from "react-icons/fa6";
import { SiSellfy } from "react-icons/si";
import { BsPersonFill } from "react-icons/bs";
import { SiAdobelightroom } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";

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
        name: "Quotation",
        href: "/admin/quotation",   
        icon: FaFilePdf,
    },
    {
        name: "Invoice",
        href: "/admin/invoice",   
        icon: FaFileInvoice,
    },
    {
        name: "Projects",
        href: "/admin/projects",
        icon: SiPowerpages,
    },

    {
        name: "attendance",
        href: "/admin/attendance",
        icon: FaCalendarWeek,

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
    {
        name: "Automation",
        href: "/admin/automation",
        icon: SiAndroidauto,
    },
    {
        name: "Daily Task",
        href: "/admin/dailytask",
        icon: VscTasklist,
        subItems: [
            { name: "IT", href: "/admin/dailytask/IT", icon: FaLaptopCode },
            { name: "Sales", href: "/admin/dailytask/Sales", icon: SiSellfy },
            { name: "HR/Admin", href: "/admin/dailytask/HR%2FAdmin", icon: BsPersonFill },
            { name: "Design/Social Media", href: "/admin/dailytask/Design%2FSocial%20Media", icon: SiAdobelightroom },
        ]
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

export const permanentholidays = [
    {
        id: 1,
        name: "New Year's Day",
        date: "01-Jan-2024"

    },
    {
        id: 2,
        name: "Republic Day",
        date: "26-Feb-2024"
    },
    {
        id: 3,
        name: "Maha shivaratri",
        date: "08-Mar-2024"
    },
    {
        id: 4,
        name: "Holi",
        date: "25-Mar-2024"
    },
    {
        id: 5,
        name: "Good Friday",
        date: "08-Mar-2024"
    },

    {
        id: 6,
        name: "Independence day",
        date: "15-Aug-2024"
    },
    {
        id: 7,
        name: "Raksha Bandhan",
        date: "19-Aug-2024"
    }, {
        id: 8,
        name: "Gandhi Jayenti",
        date: "02-Oct-2024"
    },
    {
        id: 9,
        name: "Vijayadashami",
        date: "12-Oct-2024"
    },
    {
        id: 10,
        name: " Choti Diwali ",
        date: "31-Oct-2024"
    },
    {
        id: 11,
        name: "Diwali",
        date: "01-Nov-2024"
    },
    {
        id: 12,
        name: "Christmas",
        date: "25-Dec-2024"
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