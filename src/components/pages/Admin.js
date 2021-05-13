import React from 'react';
import AddAdmin from "../AddAdmin"
import UpdateService from "../UpdateService"
import UpdateAddon from "../UpdateAddon"
import UpdateDate from "../UpdateDate"
import UpdateCity from "../UpdateCity"
import UpdatePrice from "../UpdatePrice"
import ShowBookings from "../ShowBookings"
import UpdateDescription from "../UpdateDescription"
import UploadImage from "../UploadImage"
import BlockDay from "../BlockDay"
import BlockHour from "../BlockHour"
import FreeDay from "../FreeDay"
import UploadMainImage from "../UploadMainImage"
import UploadGalleryImage from "../UploadGalleryImage"
// import ExportCSVpage from "../ExportCSVpage"
import Sidebar from "../../Sidebar/Sidebar"
import GoogleMap from "../GoogleMap"
//Admin panel will hold all components that are able by the admin

class Admin extends React.Component {
    // Admin main page. will hold all functions to use for the admin
    constructor(props) {
        super(props);
        //"showing state" will help us show or hide a component "add admin" after clicking the button
        this.state = {
          date: new Date().getDay(),
          hourOfDay: new Date().getHours(),
          dayInMonth: new Date().getDate(),
          bless: ["בוקר טוב", "אחר הצהריים טובים", "ערב טוב", "לילה טוב"],
          blessNumber: 0,
          month: new Date().getMonth(),
          months: ["בינואר", "בפברואר", "במרץ", "באפריל", "במאי", "ביוני", "ביולי", "באוגוסט", "בספטמבר", "באוקטובר", "בנובמבר", "בדצמבר"],
          dayInWeek: ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"],
          showDelete: false,
          showUpdateService: false,
          showUpdateAddon: false,
          showDisableDate: false,
          showCity: false,
          showPrice: false,
          showFuture: false,
          showDescription: false,
          uploadImage: false,
          page: "",
          secondTitle: "",
          width: window.innerWidth
        };
        this.pickAcomponent = this.pickAcomponent.bind(this);
      }

      componentDidMount() {
        // this function findout wheter its morning, noon or evening
        this.whatTimeIsIt();    
      }

      componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }

      handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };

      pickAcomponent = (input) => {
        // this is a function that get a name of component and render it
        var page;

        switch (input) {
          case "ShowBookings":
            page = <ShowBookings />
            this.setState({
              secondTitle: "- הצגת תורים עתידיים"
            })
            break;
        
          case "AddAdmin":
            page = <AddAdmin
                    email={this.props.email}
                    setEmail={this.props.setEmail}
                    password={this.props.password}
                    setPassword={this.props.setPassword}
                    handleSingup={this.props.handleSingup}
                    />
            this.setState({
              secondTitle: "- הוספת מנהל"
            })
            break;

          case "UpdateService":
            page = <UpdateService />
            this.setState({
              secondTitle: "- עדכון שירות"
            })
            break;

          case "BlockDay":
            page = <BlockDay />
            this.setState({
              secondTitle: "- חסימת יום"
            })
            break;

          case "UploadMainImage":
            page = <UploadMainImage />
            this.setState({
              secondTitle: "- עדכון תמונה"
            })
            break;
            
          case "UploadGalleryImage":
            page = <UploadGalleryImage />
            this.setState({
              secondTitle: "- עדכון תמונה לגלרייה"
            })
            break;

          case "FreeDay":
            page = <FreeDay />
            this.setState({
              secondTitle: "- פתיחת יום"
            })
            break;

          case "BlockHour":
            page = <BlockHour />
            this.setState({
              secondTitle: "- חסימת שעה"
            })
            break;
         
          case "UpdateAddon":
            page = <UpdateAddon />
            this.setState({
              secondTitle: "- עדכון תוספים"
            })
            break;

          case "UpdateCity":
            page = <UpdateCity />
            this.setState({
              secondTitle: "- עדכון רשימת ערים"
            })
            break;

          case "UpdatePrice":
            page = <UpdatePrice />
            this.setState({
              secondTitle: "- עדכון מחירים"
            })
            break;

          case "UpdateDescription":
            page = <UpdateDescription />
            this.setState({
              secondTitle: "- עדכון תיאור"
            })
            break;

          case "GoogleMap":
            page = <GoogleMap />
            this.setState({
              secondTitle: ""
            })
            break;

          case "Logout":
            page = this.props.handleLogout()
            break;

          default:
            break;
        }

        this.setState({
          page: page
      });
      }

      whatTimeIsIt = () => {
        // by the time right now, we found out what to bless the manager
        if(this.state.hourOfDay >= 12 && this.state.hourOfDay <= 18){
          this.setState({
            blessNumber: 1
          })
        }
        else if(this.state.hourOfDay > 18 && this.state.hourOfDay <= 22){
          this.setState({
            blessNumber: 2
          })
        }
        else if(this.state.hourOfDay > 22 || this.state.hourOfDay <= 4){
          this.setState({
            blessNumber: 3
          })
        }
      }

      render() {
        //will update if there is a click
        const {showDelete} = this.state;
        const {showUpdateService} = this.state;
        const {showUpdateAddon} = this.state;
        const {showDisableDate} = this.state;
        const {showCity} = this.state;
        const {showPrice} = this.state;
        const {showFuture} = this.state;
        const {showDescription} = this.state;
        const {uploadImage} = this.state;
        const fullDayAndDate = this.state.dayInWeek[this.state.date] + ", " + this.state.dayInMonth + " " + this.state.months[this.state.month];
        const defaultComponent = <GoogleMap />;
        // alert(fullDayAndDate)

        // findout what is the width of the screen and that way to know if its belong to mobile or not
        const { width } = this.state;
        const isMobile = width <= 500;
        // This return is for desktop view and the next one is for mobile
        if(!isMobile){
        return(
          <>
            <div className="admin-container">
              {/* hiding navbar inside admin page */}
               <style 
               type="text/css">
               {`.navbar {display: none}`}
               </style>
               {/* {this.state.page} */}
               <Sidebar
                pickAcomponent={this.pickAcomponent}
                comp={this.state.page}
                logOut={this.props.handleLogout}
                defaultComponent={defaultComponent}
                secondTitle={this.state.secondTitle}
                // date={this.state.dayInWeek[this.state.date]}
                // month={this.state.months[this.state.month]}
                fullDayAndDate={fullDayAndDate}
                blessing={this.state.bless[this.state.blessNumber]}
                />
                </div>
                </>
          
        )}
        else{
          // this is for mobile display
           return(
        <div class="admin-main-container">
        <h1 className="admin-panel-title"> ברוכים הבאים למסך הניהול
         </h1>
         {/* Will show all future bookings and option to delete (delete will free the booking time to others) */}
         <button className="button-form2" onClick={() => this.setState({ showFuture: !showFuture })}>הצגת תורים עתידיים <i class="fas fa-table"></i></button>
        {this.state.showFuture ?
           <ShowBookings
           />
            :
           null
        }
         <div>
        {/* moving to change service: delete or add new one */}
        <button className="button-form" onClick={() => this.setState({ showUpdateService: !showUpdateService })}>עדכון שרות <i class="fas fa-concierge-bell"></i></button>
        {this.state.showUpdateService ?
           <UpdateService
           />
            :
           null
        }
        {/* moving to change addon: delete or add new one */}
        <button className="button-form2" onClick={() => this.setState({ showUpdateAddon: !showUpdateAddon })}>עדכון תוסף <i class="fas fa-cart-plus"></i></button>
        {this.state.showUpdateAddon ?
           <UpdateAddon
           />
            :
           null
        }
        {/* Admin can block a day/hour or free a day inside UpdateDate */}
        <button className="button-form" onClick={() => this.setState({ showDisableDate: !showDisableDate })}>עדכן זמינות <i class="fas fa-calendar-alt"></i></button>
        {this.state.showDisableDate ?
           <UpdateDate
           />
            :
           null
        }
        {/* Admin can add city to the list or delete one */}
         <button className="button-form2" onClick={() => this.setState({ showCity: !showCity })}>עדכן רשימת ערים <i class="fas fa-city"></i></button>
         {this.state.showCity ?
           <UpdateCity
           />
            :
           null
        }
        {/* Admin can change price for a certain product */}
        <button className="button-form" onClick={() => this.setState({ showPrice: !showPrice })}>עדכן מחיר <i class="fas fa-shekel-sign"></i></button>
         {this.state.showPrice ?
           <UpdatePrice
           />
            :
           null
        }
        <button className="button-form2" onClick={() => this.setState({ showDescription: !showDescription })}>עדכן תיאור לשרות <i class="fab fa-creative-commons-nd"></i> </button>
         {this.state.showDescription ?
           <UpdateDescription
           />
            :
           null
        }
        <button className="button-form" onClick={() => this.setState({ uploadImage: !uploadImage })}>הוסף תמונה לשרות  <i class="fas fa-images"></i> </button>
         {this.state.uploadImage ?
           <UploadImage
           />
            :
           null
        }
         {/* Adding new manager component after click */}
         <button className="button-form2" onClick={() => this.setState({ showDelete: !showDelete })}>הוספת מנהל <i class="fas fa-user-plus"></i></button>
        {/* Using "showing" for clicking a button */}
        {this.state.showDelete ?
        <>
           <AddAdmin
           email={this.props.email}
           setEmail={this.props.setEmail}
           password={this.props.password}
           setPassword={this.props.setPassword}
           handleSingup={this.props.handleSingup}
           />
         </>
            :
            null
         }
        <button className="button-form" onClick={this.props.handleLogout}>התנתק</button>
        {/* <button className="button-form2">אישור על סיום תור</button> */}
      </div>
         </div>
    );
        }
}
}

export default Admin