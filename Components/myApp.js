import myBody from "../Components/myBody.js";
import myInfo from "../Components/myInfo.js";
import myTables from "../Components/myTables.js";
import myGrafics from "../Components/myGrafics.js";
import methos from "../Components/myMethos.js";

export default{
    showBody(){
        myBody.showBody();
        myInfo.showMyInfo();
        myTables.showMyTables();
        myGrafics.showMyGrafics();
        methos.showMethos();
    }
}