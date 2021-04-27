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
    font-size: 18px;
    &:hover {
    background: #252831;
    border-right: 4px solid #632ce4;
    cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-right: 16px;
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-right: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
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
        props.pickAcomponent(item.path);
    }
    // when click inside submenu, the like the above
    const showComponentOnSubMenu = (index) => {
        props.pickAcomponent(item.subNav[index].path);
    }

    return(
        <>
            <SidebarLink onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel onClick={showComponent}>
                        {item.title}
                    </SidebarLabel>
                </div>
                    <div>
                        {/* below is the state when we have subMenu inside an item */}
                        {item.subNav && subNav ?
                        item.iconOpened : item.subNav ? item.iconClosed : null}
                    </div>
            </SidebarLink>
            {subNav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink key={index}>
                        {item.icon}
                        <SidebarLabel onClick={() => showComponentOnSubMenu(index)}>
                            {item.title}
                        </SidebarLabel>
                    </DropdownLink>
                )
            })}
            
        </>
    );
}

export default SubMenu