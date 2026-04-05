
import Menubar from "./Menubar";
import { Children, useContext } from "react";
import AppContext from "../context/AppContext";
import SideBar from "./SideBar";

const Dashboard = ({children, activeMenu}) => {
  

  return (
    <div className="dashboard">
            <Menubar activeMenu={activeMenu} />
             <div className="flex">
                <div className="max-[1080px]:hidden">
                  {/* Sidebar component can be added here */}
                  <SideBar activeMenu={activeMenu} />
                </div>

                <div className="grow mx-5">{children}t</div>

              </div>
     </div>
  );
}

export default Dashboard;