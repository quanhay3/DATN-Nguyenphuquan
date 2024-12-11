import { Spin } from 'antd'

const Loading = ({ sreenSize }) => {
   return (
      <div
         className={`flex justify-center items-center w-full min-h-[400px] h-full relative ${sreenSize === 'md' && 'min-h-[500px]'} ${
            sreenSize === 'lg' && 'min-h-[1000px]'
         }`}
      >
         <Spin
            size='large'
            className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
         />
      </div>
   )
}

export default Loading