import { Outlet } from "react-router-dom";
import UHeader from "./UHeader";

const UAppLayout = () => {
  return (
    <div>
      <UHeader />
      <Outlet />
    </div>
  );
};

export default UAppLayout;
