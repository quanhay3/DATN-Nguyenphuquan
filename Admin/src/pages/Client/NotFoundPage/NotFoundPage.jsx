import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import images from '../../../assets/images';

const NotFoundPage = () => {
   const auth = useSelector((state) => state.userReducer);
   return (
      <div>
         <Helmet>
            <title>404 Not Found</title>
         </Helmet>
         <div className='text-center p-10'>
            <div>
               <img className='m-auto w-48 mt-[2%] mb-[5%]' src={images.logoPath} alt='' />
            </div>

            <div className='text-5xl font-extrabold ...'>
               <span className='text-color3rd md:text-8xl text-5xl font-extrabold'>404</span>
            </div>

            <div className='flex flex-col gap-3 items-center mx-auto md:w-1/2 lg:w-3/5'>
               <div className='w-full md:w-4/5'>
                  <p className='md:text-5xl text-4xl font-extrabold'>Không tìm thấy nội dung</p>
               </div>
            </div>

            <div className='mt-3'>
               <p className='text-lg font-medium'>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
               <p className='text-lg font-medium'>
                  Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì sử dụng URL đã lưu.
               </p>
            </div>

            <div className='mt-8'>
               <Link to={auth.user?.role === 'member' ? '/' : '/manage/dashboard'} className='p-2'>
                  <button className='rounded-full bg-color3rd px-2 text-white lg:text-lg text-sm  font-medium  h-10 mx-auto md:mx-0'>
                     Quay về trang chủ
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default NotFoundPage;
