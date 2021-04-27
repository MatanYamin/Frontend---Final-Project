import React from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
// import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"


// SidebarData will hold the names, icons and the components name to be open when clicked
export const SidebarData = [
    {
        title: "עמוד הבית",
        path: "home",
        icon: <AiIcons.AiFillHome />
    },

    {
        title: "תורים עתידיים",
        path: "ShowBookings",
        icon: <FaIcons.FaCalendar />

    },
    {
    title: "שירותים",
    path: "#",
    icon: <FaIcons.FaWrench />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: "הוספת שירות חדש",
            path: "UpdateService",
            icon: <FaIcons.FaPlus />
        },
        {
            title: "מחיקת שירות קיים",
            path: "UpdateService",
            icon: <FaIcons.FaTrash />
        }
    ]
},
{
    title: "תוספים",
    path: "#",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: "הוספת תוסף חדש",
            path: "#",
            icon: <FaIcons.FaPlus />
        },
        {
            title: "מחיקת תוסף קיים",
            path: "#",
            icon: <FaIcons.FaTrash />
        }
    ]
},
{
    title: "זמינות",
    path: "#",
    icon: <AiIcons.AiOutlineFieldTime />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: "חסימת יום שלם",
                path: "#",
                icon: <FaIcons.FaMinusCircle />
        },
        {
            title: "פתיחה של יום",
                path: "#",
                icon: <FaIcons.FaCalendarCheck />
        },
        {
            title: "חסימה של שעה",
                path: "#",
                icon: <FaIcons.FaClock />
        }
    ]
},
    {
        title: "ערים",
        path: "#",
        icon: <FaIcons.FaBuilding />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "הוספת עיר חדשה",
                path: "/overview/Reports1",
                icon: <FaIcons.FaPlus />
            },
            {
                title: "מחיקת עיר קיימת",
                path: "/overview/Reports2",
                icon: <FaIcons.FaTrash />
            }
        ]
    },
    {
        title: "מחירים",
        path: "#",
        icon: <FaIcons.FaShekelSign />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "שירות",
                path: "/overview/Reports1",
                icon: <FaIcons.FaEdit />
            },
            {
                title: "תוסף",
                path: "/overview/Reports2",
                icon: <FaIcons.FaEdit />
            }
        ]
    },
    {
        title: "תמונות",
        path: "#",
        icon: <FaIcons.FaImages />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "הוסף תמונה ראשית לשירות",
                path: "/overview/Reports1",
                icon: <FaIcons.FaImage />
            },
            {
                title: "הוסף תמונה לגלרייה",
                path: "/overview/Reports2",
                icon: <FaIcons.FaPhotoVideo />
            }
        ]
    },
    {
        title: "תיאור",
        path: "#",
        icon: <FaIcons.FaComment />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "שינוי תיאור לשירות",
                path: "/overview/Reports1",
                icon: <FaIcons.FaCommentDots />
            },
            {
                title: "שינוי תיאור לתוסף",
                path: "/overview/Reports2",
                icon: <FaIcons.FaCommentDots />
            }
        ]
    },
    {
        title: "ניהול מנהלים",
        path: "AddAdmin",
        icon: <FaIcons.FaUserCog />

    },
    {
        title: "התנתק",
        path: "/AdminLogin/Cars",
        icon: <FaIcons.FaSignOutAlt />

    }
]

export default SidebarData