// PLUGINS IMPORTS //
import React, { FC, ReactNode } from 'react';
import { styled, Typography } from '@mui/material';
import { TypographyProps } from '@mui/system';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const StyledError = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.error.main,
  whiteSpace: 'pre-line',
  fontSize: '13px',
  marginTop: '5px',
}));

interface FieldErrorProps {
  children: ReactNode;
}

const FieldError: FC<FieldErrorProps> = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

export default FieldError;
