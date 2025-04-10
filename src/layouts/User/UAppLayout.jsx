import { Outlet } from "react-router-dom";
import UHeader from "./UHeader";
import UFooter from "./UFooter";

const UAppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <UHeader />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <UFooter />
    </div>
  );
};

export default UAppLayout;
