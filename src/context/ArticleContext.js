import { useState, createContext } from "react";

const ArticleContext = createContext([{}, () => {}]);

let initialState = {};

const ArticleProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <ArticleContext.Provider value={[state, setState]}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
