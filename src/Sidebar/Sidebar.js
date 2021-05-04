import React, { useState } from 'react';
import styled from "styled-components"
import {Link} from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {SidebarData} from "./SidebarData"
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

// style of the top navBar
const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    top: 0;
`;
// styles of the nav icons
const NavIcon = styled(Link)`
    margin-right: 2rem;
    font-size: 2rem;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
// style of the sidebar itself
const SidebarNav = styled.nav`
    background: #15171c;
    // width: 250px;
    width: 15vw;
    // width: fit-content;
    height: 110vh;
    // height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    // position: fixed;
    top: 0;
    right: ${({ sidebar }) => (sidebar ? '-100%' : '0')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

// render the sidebar along its logic
const Sidebar = (props) => {
    const [sidebar, setSidebar] = useState(false);
    // showSidbar will hide and show the sidebar after click on the icon
    const showSidebar = () => {
        
        setSidebar(!sidebar);
    }
    

    return(
        <>
        <IconContext.Provider value={{color: '#fff'}}>
        <Nav>
            <NavIcon>
                <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
        <label className="date_sidebar">
            {props.blessing}
            <br/>
            {props.fullDayAndDate}
               
          </label>
            <div className="on-nav">
                ברוכים הבאים למסך הניהול {props.secondTitle}
            </div>
            <a className="left_sidebar" href="https://skycleanerisrael.com/"><AiIcons.AiFillHome /></a>
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                <NavIcon>
                    <AiIcons.AiOutlineClose onClick={showSidebar} />
                </NavIcon>
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} pickAcomponent={props.pickAcomponent} />;
                })}
            </SidebarWrap>
        
        <div className="next-to-sidebar">
            <div className="inside-next">
                {/* The shoing of the component: */}
                <div className="back-home">
                <a href="https://skycleanerisrael.com/">חזרה לעמוד הבית</a>
                </div>
                {props.comp === "" ? <> {props.defaultComponent} </> : null}
                {props.comp}
                <br/>
                <br/>
            </div>
        </div>
        </SidebarNav>
        </IconContext.Provider>
        </>
    );
}

export default Sidebar