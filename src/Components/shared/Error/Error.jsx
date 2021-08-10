import './Error.scss'

const Error = (props) => {
    const { errorMessage } = props;
  
    return (
      <div className="error__text">
        {errorMessage}
      </div>
    );
  };
  
  export default Error;