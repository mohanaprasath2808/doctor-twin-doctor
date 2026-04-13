import React from "react";
import AuthStack from "./Auth/AuthStack";
import AppStack from "./App/AppStack";
import { useRoute } from "./useRoute";

type RouteType = 'auth' | 'app';

const stack: Record<RouteType, React.ReactElement> ={
    auth: <AuthStack />,
    app: <AppStack />,
}

const Router = () => {
    const route = useRoute();
    return stack[route];
}

export default Router;