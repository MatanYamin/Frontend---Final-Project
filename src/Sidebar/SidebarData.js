import React from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
// import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"


// SidebarData will hold the names, icons and the components name to be open when clicked
export const SidebarData = [
    {
        title: "עמוד הבית",
        path: "/",
        icon: <AiIcons.AiFillHome />
    },

    {
        title: "תורים עתידיים",
        path: "ShowBookings",
        icon: <FaIcons.FaCalendar />

    },
    {
    title: "שירותים",
    path: "UpdateService",
    icon: <FaIcons.FaWrench />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
   
},
{
    title: "תוספים",
    path: "UpdateAddon",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
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
                path: "BlockDay",
                icon: <FaIcons.FaMinusCircle />
        },
        {
            title: "פתיחה של יום",
                path: "FreeDay",
                icon: <FaIcons.FaCalendarCheck />
        },
        {
            title: "חסימה של שעה",
                path: "BlockHour",
                icon: <FaIcons.FaClock />
        }
    ]
},
    {
        title: "ערים",
        path: "UpdateCity",
        icon: <FaIcons.FaBuilding />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "מחירים",
        path: "UpdatePrice",
        icon: <FaIcons.FaShekelSign />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
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
                path: "UploadMainImage",
                icon: <FaIcons.FaImage />
            },
            {
                title: "הוסף תמונה לגלרייה",
                path: "UploadGalleryImage",
                icon: <FaIcons.FaPhotoVideo />
            }
        ]
    },
    {
        title: "תיאור",
        path: "UpdateDescription",
        icon: <FaIcons.FaComment />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "ניהול מנהלים",
        path: "AddAdmin",
        icon: <FaIcons.FaUserCog />

    },
    {
        title: "התנתק",
        path: "Logout",
        icon: <FaIcons.FaSignOutAlt />

    }
]

export default SidebarData