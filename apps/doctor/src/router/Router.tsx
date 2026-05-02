import React from "react";
import AuthStack from "./Auth/AuthStack";
import BottomBarNavigation from "./App/BottomBarNavigation";
import { useRoute } from "./useRoute";

type RouteType = 'auth' | 'app';

const stack: Record<RouteType, React.ReactElement> = {
    auth: <AuthStack />,
    app: <BottomBarNavigation />,
}

const Router = () => {
    const route = useRoute();
    return stack[route];
}

export default Router;