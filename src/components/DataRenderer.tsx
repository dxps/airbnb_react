import { Spinner } from './ui';

const DataRenderer = ({
  children,
  error,
  isLoading,
}: {
  children: React.ReactNode;
  error: string | null;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className='text-center text-red-500'>{error}</div>;
  }

  return children;
};

export default DataRenderer;
