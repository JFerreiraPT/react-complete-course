//import styled from 'styled-components';

import React from "react";

//importing this way it will create modules, so the styles will be scoped this way
//import styles from '/Button.module.css'



import './Button.css';

//using styled
// const Button = styled.button`
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;
//   width: 100%;


//   @media (min-width: 768px) {
//     width: auto;
//   }

// &:focus {
//   outline: none;
// }

// &:hover,
// &:active {
//   background: #ac0e77;
//   border-color: #ac0e77;
//   box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
// }

// `; //->what we pass inside `` goes directly into button, which is a function btw


const Button = props => {
  return (
    // <button type={props.type} className={styles.button} onClick={props.onClick}>
     <button type={props.type} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
