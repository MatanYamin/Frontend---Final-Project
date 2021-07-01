import React, { useState } from 'react';
import styled from "styled-components"
import {Link} from "react-router-dom"

// style of the links
const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    // font-size: 18px;
    font-size: 1.1vw;
    &:hover {
    background: #252831;
    border-right: 4px solid #632ce4;
    cursor: pointer;
    }
    &:focus {
        border-right: 4px solid #632ce4;
        background: #252831;
        }
`;

const SidebarLabel = styled.span`
    margin-right: 1vw;
    font-size: 1vw;
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-right: 2rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    // font-size: 18px;
    font-size: 1.1vw;
    &:hover {
    background: #632ce4;
    cursor: pointer;
    }
`;

const SubMenu = ( props ) => {
    const [subNav, setSubNav] = useState(false);

    const item = props.item;
    // when open a sub menu
    const showSubnav = () => {
        setSubNav(!subNav);
    };
    // when click on option, will open a component with the right name
    const showComponent = () => {
        // incase its the father menu
        if(item.path !== "#"){
            props.pickAcomponent(item.path);
        }
    }
    // when click inside submenu, the like the above
    const showComponentOnSubMenu = (index) => {
        props.pickAcomponent(item.subNav[index].path);
    }

    return(
        <>
        {/* makes the whole div clickable for the component */}
            <div onClick={showComponent}>
            <SidebarLink onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>
                        {item.title}
                    </SidebarLabel>
                </div>
                    <div>
                        {/* below is the state when we have subMenu inside an item */}
                        {item.subNav && subNav ?
                        item.iconOpened : item.subNav ? item.iconClosed : null}
                    </div>
            </SidebarLink>
            </div>
            {subNav && item.subNav.map((item, index) => {
                return (
                    <div onClick={() => showComponentOnSubMenu(index)}>
                    <DropdownLink key={index} >
                        {item.icon}
                        <SidebarLabel>
                            {item.title}
                        </SidebarLabel>
                    </DropdownLink>
                    </div>
                )
            })}
            
        </>
    );
}

export default SubMenu