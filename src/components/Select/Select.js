import React, { useState } from "react";
import propTypes from "prop-types";

import Button from "../Button/Button";

import styled from "styled-components";
import { shadow } from "../common";
import {
  blockSizes,
  fontSizes,
  padding,
  colors
} from "../common/theme.variables";
import { StyledCutout } from "../common";

const StyledSelectWrapper = styled(StyledCutout)`
  height: ${blockSizes.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.light};
  font-size: ${fontSizes.md};
`;
const StyledSelectContent = styled.div`
  width: 100%;
  padding-left: ${padding.sm};
  overflow: hidden;
`;
const StyledDropdownButton = styled(Button)`
  height: 100%;
  width: 30px;
  padding: 0;
  z-index: 1;
  flex-shrink: 0;
  border-left-color: ${colors.lightGray};
  border-top-color: ${colors.lightGray};
  box-shadow: inset 1px 1px 0px 1px ${colors.light},
    inset -1px -1px 0 1px ${colors.darkGray};
`;
const StyledDropdownIcon = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  display: inline-block;
  border-top: 6px solid #050608;
`;

const StyledDropdownList = styled.ul`
  font-size: ${fontSizes.md};
  position: absolute;
  bottom: -2px;
  width: calc(100% - 2px);
  transform: translateY(100%);
  left: 0px;
  background: ${colors.light};
  border: 2px solid ${colors.dark};
  border-top: none;
  box-shadow: ${props => (props.shadow ? shadow : "none")};
  cursor: default;
  z-index: 99;
`;
const StyledDropdownListItem = styled.li`
  height: calc(${blockSizes.md} - 8px);
  width: 100%;
  padding-left: ${padding.sm};

  line-height: calc(${blockSizes.md} - 8px);
  font-size: ${fontSizes.md};
  white-space: nowrap;
  &:hover {
    background: ${colors.navy};
    color: ${colors.light};
  }
`;
const Select = ({
  items,
  selectedIndex,
  shadow,
  width,
  height,
  otherProps,
  className,
  onSelect,
  style
}) => {
  const [index, setIndex] = useState(selectedIndex);
  const [open, setOpen] = useState(false);

  const handleSelect = i => {
    onSelect(items[i].value);
    setIndex(i);
  };
  return (
    <StyledSelectWrapper
      className={className}
      onClick={() => setOpen(!open)}
      style={{ ...style, width }}
      shadow={shadow}
      {...otherProps}
    >
      <StyledSelectContent>
        {items.length ? items[index].title : ""}
      </StyledSelectContent>
      <StyledDropdownButton>
        <StyledDropdownIcon />
      </StyledDropdownButton>
      {open && (
        <StyledDropdownList
          shadow={shadow}
          style={height && { overflowY: "scroll", height }}
        >
          {items.map((item, i) => (
            <StyledDropdownListItem
              key={i}
              onClick={e => {
                handleSelect(i);
              }}
            >
              {item.title}
            </StyledDropdownListItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledSelectWrapper>
  );
};

Select.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  className: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
  selectedIndex: propTypes.number,
  shadow: propTypes.bool,
  style: propTypes.object,
  onSelect: propTypes.func.isRequired
};
Select.defaultProps = {
  style: {},
  shadow: true,
  selectedIndex: 0
};
export default Select;
