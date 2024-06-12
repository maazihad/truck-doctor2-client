import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-100px)]'>
      <ReactLoading type={'bars'} color={'#d35400'} height={50} width={100} />
    </div>
  );
};

export default Loading;
