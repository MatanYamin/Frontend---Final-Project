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
            <div className="row9">
            <div className="column1">
            <img alt="" src="data:image/png;base64,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" />
            &nbsp;&nbsp;
            <img alt="" src="https://i.ibb.co/k3s9sLY/IM.png" />
            &nbsp;&nbsp;
            <img alt="" src="https://www.frogi.co.il/picserver/s3/2020/05/11/925c6c4ca4238a0b926.jpg" />
            </div>
            <div className="column2">
            <img alt="" src="https://i.ibb.co/nPZXMfY/EB.png" />
            &nbsp;&nbsp;
            <img alt="" src="https://i.ibb.co/sCD05LZ/CC.png" />
            &nbsp;&nbsp;
            <img alt="" src="https://haruv.org.il/wp-content/uploads/2018/10/%D7%9C%D7%95%D7%92%D7%95-%D7%A8%D7%99%D7%91%D7%95%D7%A2-%D7%A4%D7%95%D7%A0%D7%98-%D7%97%D7%93%D7%A93.png" />
            </div>
            </div>
        </div>
        <br/>
        <h1>ועוד מאות לקוחות מרוצים!</h1>
            <br/>
            <h2>פידבקים מלקוחותינו:</h2>
        <div className="thisImgFb">
        <img alt="" src="https://i.ibb.co/D8VDN0R/FEEDBACK.png" style={{width : '100%'}} />
            </div>
            <h1>אז למה אתם מחכים? צרו איתנו קשר ותזכו להיות חלק מלקוחותינו!
</h1>
        </div>
        <Footer />
        </>
    );
}

