import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';
import defaultStyle from '../../style';

const MyLink = styled(NavLink)`
  display: flex;
  align-items: center;
  /* padding: 10px 30px; */
  margin: 10px;
  text-decoration: none;
  color: black;

  -webkit-tap-highlight-color: transparent;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* ${(props) =>
    props.selected &&
    css`
      color: white;
    `} */

  user-select: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: black;
    `}
`;

function PreviewLink({ children, selected, to }) {
  return (
    <MyLink selected={selected} to={to}>
      {children}
    </MyLink>
  );
}

export default PreviewLink;
