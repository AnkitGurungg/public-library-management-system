import { Outlet } from "react-router-dom";
import UHeader from "./UHeader";
import UFooter from "./UFooter";
import ScrollToTop from "@/components/ScrollToTop";

const UAppLayout = () => {
  return (
    <div className="flex flex-col">
      <ScrollToTop />
      <UHeader />
      <div className="flex-1 overflow-auto mt-[4.5rem]">
        <Outlet />
        <UFooter />
      </div>
    </div>
  );
};

export default UAppLayout;
