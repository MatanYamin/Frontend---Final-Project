import React from 'react';
import "../../App.css";
import '.././MiddleSection.css';
import Footer from "../Footer";


export default function About() {
    window.scrollTo(0, 0)
    // the about page.
    return(
        <>
            {/* <img className="img-about" alt="" src="https://i.ibb.co/NFSwNfM/favicon.png" /> */}
            <div className="aboutContent">
        חברתנו מספקת שירותי ניקיון אשר מתמחה בניקוי וחידוש כל סוגי מוצרי הטקסטיל ללקוחות מוסדיים ופרטיים.
        <br/>
        אנו נותנים פתרון יעיל וממוקד לניקוי ספות, כורסאות, כסאות פינת אוכל, מזרנים, שטיחים ומושבי רכבים לקוחותנו בעזרת צוות צעיר, מקצועי וישר.
        <br/>
        <b>היתרונות שלנו</b> <br/>
        • ברשותנו מכונות ניקוי מתקדמות, חומרים יעודיים וידידותיים לטקסטיל ולבריאות של לקוחותנו.
        <br/>
        • כחלק מהשירות שלנו אנו מספקים מכונות ייבוש לאחר הניקוי אשר מצמצמים את זמני ההמתנה בצורה משמעותית.
        <br/>
        • אמינות, מקצועיות ושירותיות זה שם המשחק - חשוב לנו בראש ובראשונה שהלקוחות שלנו יהיו מעורבים בתהליך, יקבלו את כל התשובות לשאלות ויהנו מיחס אדיב וישר.
        <br/>
        • חומרים אשר נותנים פתרונות תחזוקה שוטפת לשימוש ע''י הלקוח.
        <br/><br/>
        מטרתנו היא לתת לך ''ראש שקט'' בכל אשר קשור בניקיון, מאות לקוחותנו כבר נמצאים איתנו, במערכת יחסים ארוכת טווח ואמינה.
        <br/><br/><br/>
        <div className="amongClients">
            <b>בין לקוחותינו:</b>
            <br/>
            <br/>
            <img alt="" src="https://naraop.weboxcloud.com/Include/images/medica_full.png" />
            &nbsp;&nbsp;
            <img alt="" src=" https://lh3.googleusercontent.com/proxy/ZAF_Tny-ak_M5ux_jXTT1bUViuwpFimu-aROL3T2MEC_4H7JzO8BFlWqKIwqhfoCOrRN-kwJNRvZZSOvHCdE4cAWDFCBnschEQmIwYhWXH4OIkqLN01oYSl7jyrvE3dAomIloCZxhDOhSveKWZM_" />
            &nbsp;&nbsp;
            <img alt="" src="https://i.ibb.co/k3s9sLY/IM.png" />
            &nbsp;&nbsp;
            <img alt="" src="https://www.myzman.co.il/uploads/n/1589532857.9448.jpg" />
            &nbsp;&nbsp;
            <img alt="" src="https://i.ibb.co/nPZXMfY/EB.png" />
            &nbsp;&nbsp;
            <img alt="" src="https://i.ibb.co/sCD05LZ/CC.png" />
        </div>
            </div>
        <Footer />
        </>
    );
}

