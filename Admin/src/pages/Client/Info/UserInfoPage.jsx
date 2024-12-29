import { Image, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTokenAndUser, updateInfoUser } from "../../../slices/authSlice";
import { useForm } from "react-hook-form";
import { useUpdateInfoMutation } from "../../../services/user.service";
import { useClearTokenMutation } from "../../../services/auth.service";
import Loading from "../../../components/Loading/Loading";

const UserInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [updateUser] = useUpdateInfoMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clearToken] = useClearTokenMutation();
  const onHandleLogout = () => {
    dispatch(deleteTokenAndUser());
    clearToken();
    navigate("/login");
  };
  useEffect(() => {
    if (!auth.user || !auth.accessToken) {
      navigate("/");
    }
  }, [auth]);
  useEffect(() => {
    setValue("userName", auth.user.userName);
    setValue("email", auth.user.email);
    setValue("phoneNumber", auth.user.phoneNumber);
    setValue("address", auth.user.address);
    setValue("avatar", auth.user.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const object = {
        id: auth?.user?._id,
        data: data,
      };
      await updateUser(object)
        .unwrap()
        .then((res) => {
          res;
          message.success("Cập nhật thông tin thành công");
          dispatch(updateInfoUser(data));
        })
        .catch((err) => {
          if (
            err.data.message == "Refresh Token is invalid" ||
            err.data.message ==
              "Refresh Token is expired ! Login again please !"
          ) {
            onHandleLogout();
          }
        });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(err.data.message);
    }
  };
  if (loading) return <Loading sreenSize="lg" />;
  return (
    <>
      <div className="main">
        <section className="section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]">
          <div className=" mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative">
            <span>
              <Link to="/">Trang chủ</Link> / Thông tin tài khoản
            </span>
          </div>
        </section>
        <section className="section-userinfo py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]">
          <div className=" mx-auto px-[15px]     lg:w-[970px]  md:w-[750px] relative">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="userinfo-content gap-y-[10px] shadow-lg flex flex-wrap p-[20px] rounded-[10px] bg-white w-full">
                <Image className="rounded-full" src={auth?.user?.avatar}></Image>
                <div className="input-wrap flex  max-sm:flex-wrap max-sm:gap-y-[10px] justify-between w-full">
                  <div className="w-[48%] max-sm:w-full">
                    <label>
                      <span className="input-name">Họ và tên</span>
                      <input
                        type="text"
                        {...register("userName", {
                          required: "Họ và tên là trường bắt buộc",
                        })}
                        className="w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[10px]"
                      />
                    </label>
                    {errors?.userName && (
                      <p className="error-message text-[13px] text-red-500">
                        {errors?.userName?.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="w-[48%] max-sm:w-full ">
                    <label>
                      <span className="input-name">Email</span>
                      <input
                        type="text"
                        {...register("email", {
                          required: "Email là trường bắt buộc",
                          validate: {
                            validEmail: (value) => {
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              if (!emailRegex.test(value)) {
                                return "Email không hợp lệ";
                              }
                            },
                          },
                        })}
                        className="w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[10px]"
                      />
                    </label>
                    {errors?.email && (
                      <p className="error-message text-[13px] text-red-500">
                        {errors?.email?.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="input-wrap flex justify-between w-full max-sm:gap-y-[10px] max-sm:flex-wrap">
                  <div className="w-[48%] max-sm:w-full">
                    <label>
                      <span className="input-name">Địa chỉ</span>
                      <input
                        type="text"
                        {...register("address")}
                        className="w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[10px]"
                      />
                    </label>
                    {errors?.address && (
                      <p className="error-message text-[13px] text-red-500">
                        {errors?.address?.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="w-[48%] max-sm:w-full">
                    <label>
                      <span className="input-name">Số điện thoại</span>
                      <input
                        type="text"
                        {...register("phoneNumber", {
                          required: "Số điện thoại là trường bắt buộc",
                          pattern: {
                            value: /^0\d{9,10}$/,
                            message:
                              "Vui lòng nhập đúng định dạng số điện thoại",
                          },
                        })}
                        className="w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[10px]"
                      />
                    </label>
                    {errors?.phoneNumber && (
                      <p className="error-message text-[13px] text-red-500">
                        {errors?.phoneNumber?.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
                <button className="bg-[#455CC6] max-sm:w-full text-white text-center rounded-[10px] p-[10px]">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export default UserInfoPage;
