import React from 'react';
import "../../App.css";
import '.././MiddleSection.css';
import Footer from "../Footer";


export default function About() {
    // the about page.
    return(
        <>
        <div className="about">
            <img class="img-about" src="https://i.ibb.co/NFSwNfM/favicon.png"></img>
    <h1>קצת על החברה</h1>
    <br/>
    <h3>סקיי קלינר הוקמה בשנת 2018 ויושבת בבר כוכבא, רמת גן</h3>
     <br/>
     <h3>החברה מתמחה בניקוי או רענון רהיטים פנימיים וחיצוניים</h3>
     <br/>
     <h3>לסקיי-קלינר יש ציוד בשווי אלפי שקלים לטיפול במקרים אלה</h3>
     <br/>
     <h3>אנחנו נגיע אליכם לכל מקום ונעבוד עם כל מוצר שתרצו!</h3>
     <br/>
        </div>
        <Footer />
        </>
    );
}
