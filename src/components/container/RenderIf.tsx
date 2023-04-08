import React, { ReactNode } from 'react';

type Props = {
  condition: boolean;
  children: ReactNode;
};

const RenderIf: React.FC<Props> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default RenderIf;