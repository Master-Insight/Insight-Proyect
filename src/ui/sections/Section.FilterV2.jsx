import PropTypes from "prop-types";
// import { Icon } from '@iconify/react';
// import { useState, useEffect } from "react";
// import { icons } from "../../../config/layout";
// import ElementList from "./SectionWFilter/Elements";
// import FilterSection from "./SectionWFilter/Filters";
// import ActionModal from "../modal/ActionModal";
import BackButton from "../buttons/BackButton2";

/**
 * Componente principal que gestiona una sección con filtros y lista de elementos basados en unos componetnes prearmados intercambiables
 */

const SectionWFiltersV2 = ({ title,
  togoBack = {
    Element: BackButton,
  },
  Header,
  filters,
  cards,
  aside,
  apis,
}) => {
  const { Element } = togoBack

  return (
    <div>
      Exemplo
      {/* <Element /> */}
      <togoBack.Element />
    </div>
  )
};

SectionWFiltersV2.propTypes = {
  title: PropTypes.string,
  togoBack: PropTypes.shape({
    Element: PropTypes.elementType,
    up: PropTypes.bool,
    right: PropTypes.bool,
    left: PropTypes.bool,
    botton: PropTypes.bool,
  }),
  Header: PropTypes.elementType,
  filters: PropTypes.shape({
    Filters: PropTypes.elementType,
  }),
  cards: PropTypes.shape({
    Cards: PropTypes.elementType,
  }),
  aside: PropTypes.shape({
    Aside: PropTypes.elementType,
  }),
  apis: PropTypes.shape({
  }),
};

export default SectionWFiltersV2;