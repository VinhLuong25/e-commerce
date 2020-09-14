import React, { useState, useEffect } from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Common/Header/Header";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Footer from "./Common/Footer/Footer";
import { auth, handleUserProfile } from "./firebase/utils";
import ResetPassword from "./pages/ResetPassword";
import LatestProduct from "./pages/LatestProduct";
import ProductDetail from "./pages/ProductDetail";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./redux/productSlice";
import CartSlide from "./components/CartSlide";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(null);
    });
    return () => {
      authListener();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Header currentUser={currentUser} />
      <CartSlide />
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <Login />)}
          />

          <Route exact path="/recovery" component={ResetPassword} />
          <Route exact path="/latest-product" component={LatestProduct} />
          <Route
            exact
            path="/latest-product/:prodId"
            component={ProductDetail}
          />
        </Switch>
      </div>

      <div className="bottom-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
