import React from "react";
import { Link } from "react-router-dom";

function RouterLink(props) {
  const location = props.href.substring(
    props.href.indexOf(process.env.PUBLIC_URL) + process.env.PUBLIC_URL.length
  ); // location: leave base url off

  const onClick = () => {
    if (props.setLink) {
      console.log(location); /////
      props.setLink(location.substring(1)); // link: leave '/' off
    }
  };

  //   return props.href.match(/^(https?:)?\/\//) ? (
  //     <a href={props.href}>{props.children}</a>
  //   ) : (
  //     <div onClick={onClick}>
  //       <Link to={location}>{props.children}</Link>
  //     </div>
  //   );

  return (
    <Link onClick={onClick} to={location}>
      {props.children}
    </Link>
  );
}

export default RouterLink;
