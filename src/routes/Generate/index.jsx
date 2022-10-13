import React, { useContext, useEffect } from 'react';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const Generate = () => {
  const [state1, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex } = state1;
  const language = state1.languages[languageIndex];

  useEffect(() => {
    d1(setPageIndex(2));
  }, []);

  return (
    <>{language.generate}</>
  );
};

export default Generate;
