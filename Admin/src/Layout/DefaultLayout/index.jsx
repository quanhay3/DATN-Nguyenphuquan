import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useClearTokenMutation, useGetTokenQuery } from "../../services/auth.service";
import { message } from "antd";
import { deleteTokenAndUser, saveTokenAndUser } from "../../slices/authSlice";

const index = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch, error } = useGetTokenQuery();
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.userReducer);
  const [clearToken] = useClearTokenMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.body?.data.accessToken != "") {
       dispatch(saveTokenAndUser({ accessToken: data?.body.data?.accessToken, user: data?.body.data?.data }));
    } else if (!isLoading && data?.body?.data.accessToken == "" && Object.keys(auth?.user).length > 0) {
       dispatch(deleteTokenAndUser())
       clearToken();
    } else if (error?.data?.status === 400) {
       message.warning(error?.data?.message);
       dispatch(deleteTokenAndUser());
       clearToken();
       navigate('/login');
    }
  }, [data, isLoading]);

  useEffect(() => {
      if (data?.body?.data) {
        refetch()
      }
  }, [data?.body?.data, pathname, refetch])

  return (
    <div className="overflow-x-hidden">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default index;
