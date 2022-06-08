import React from "react";
import queryString from "query-string";
const Message = ({msg,user}) => {
  //data from query string
  const parsed = queryString.parse(window.location.search);
 
  let custom=null;
  if(parsed.name ===user){
    custom='current';
  }
  else{
    custom='message';
  }
  return (
    <>
      <div className={custom} id="eachMsg">
        <div className="msgContainer">
          <small className="tprimary">
            <b>{user}</b>
          </small>
          <p>{msg}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
