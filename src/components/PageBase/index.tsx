import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const PageBase: React.FC<PageBaseProps> = ({ title, description, children }) => (
  <HelmetProvider>
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
    {children}
  </HelmetProvider>
)

export default PageBase;