import React, { createContext, useState } from "react";

interface MyContextType {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  fields: string[];
  setFields: (value: string[]) => void;
  rest: () => void;
}

const MyContext = createContext<MyContextType>({
  isChecked: false,
  setChecked: () => {},
  fields: [],
  setFields: () => {},
  rest: () => {},
});

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isChecked, setChecked] = useState(false);
  const [fields, setFields] = useState<string[]>([]);

  const rest = () => {
    setChecked(false);
    setFields([]);
  };

  return (
    <MyContext.Provider
      value={{
        isChecked,
        setChecked,
        fields,
        setFields,
        rest,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
