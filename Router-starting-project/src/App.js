import { Children } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/Products";
import Root from "./pages/Root";

//Another aproach
// const routeDefinition = createRoutesFromElements(
//   <Route>
//     <Route path= '/' element= {<HomePage/>} />
//     <Route path= '/products' element= {<ProductsPage/>} />
//   </Route>
// )
//const router = createBrowserRouter(routeDefinition);

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      //index means its the base page from that parent
      { index: true, element: <HomePage/>},
      { path: 'products', element: <ProductsPage/>},
      { path: 'products/:id', element: <ProductDetail/>},
    ]
  },

]);



function App() {
  return <RouterProvider router={router} />;
}

export default App;
