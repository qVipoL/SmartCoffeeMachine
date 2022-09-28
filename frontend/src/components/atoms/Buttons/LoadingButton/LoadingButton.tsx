// PLUGINS IMPORTS //
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface LoadingButtonProps {
  buttonProps: ButtonProps;
  text: string;
  isLoading: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  buttonProps,
  text,
  isLoading,
}) => {
  return (
    <Button {...buttonProps}>
      {text}
      {isLoading && <CircularProgress size={20} sx={{ ml: 1 }} />}
    </Button>
  );
};

export default LoadingButton;
