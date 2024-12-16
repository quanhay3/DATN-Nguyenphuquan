import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import privateRouter from "./routers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {privateRouter.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route?.children && route.children.length > 0 ? (
                  route.children.map((routeChild, idx) => {
                    return (
                      <Route
                        key={idx}
                        path={routeChild.path}
                        element={routeChild.element}
                      ></Route>
                    );
                  })
                ) : (
                  <></>
                )}
              </Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
