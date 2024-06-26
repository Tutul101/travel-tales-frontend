import React from "react";

import MainNavigation from "./shared/components/ui-elements/navigation/main-navigation";

import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <MainNavigation />
      <mian>
        <Outlet />
      </mian>
    </div>
  );
};

export default Root;
