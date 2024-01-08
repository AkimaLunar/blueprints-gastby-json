import { tokens } from '@fluentui/react-theme';
import { makeStyles } from '@griffel/react';

export const useWrapperStyles = makeStyles({
  root: {
    minHeight: '480px',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px',
    backgroundColor: tokens.colorNeutralBackground1
  }
});
