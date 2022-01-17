import React from 'react';
import { Heading, ThemeUICSSObject } from 'theme-ui';

export interface IAdministrationAsidePanel {
  title?: string;
  titleToolTip?: string;
  children: React.ReactNode;
  columns?: number;
}

const AdministrationAsidePanel = ({
  title,
  titleToolTip,
  children,
  columns = 2,
}: IAdministrationAsidePanel) => {
  const contentSx: ThemeUICSSObject = React.useMemo(
    () => ({
      gridTemplateColumns: `${Array(columns).fill('1fr').join(' ')} !important`,
    }),
    [columns],
  );

  return (
    <div className="adminPanel">
      {title && (
        <Heading as="h3" variant="text.title" title={titleToolTip}>
          {title}
        </Heading>
      )}
      <div className="content" sx={contentSx}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(AdministrationAsidePanel);
