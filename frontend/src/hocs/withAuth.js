import React, { useEffect, useState } from 'react';
import Loading from '../components/layout/Loading';

const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const [loading, setLoading] = useState(false);

    useEffect(() => console.log(loading), [loading])
    const handleAction = async (action) => {
      setLoading(true);
      try {
        console.log(loading)
        action()
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <WrappedComponent
            {...props}
            loading={loading}
            onAction={handleAction}
          />
        )}
      </>
    );
  };
};

export default withAuth