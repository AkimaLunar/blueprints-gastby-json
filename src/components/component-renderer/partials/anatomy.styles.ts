import { tokens } from "@fluentui/react-theme";
import { makeStyles } from "@griffel/react";

export const usePreviewStyles = makeStyles({
    content: {
      width: '100%',
      height: '360px',
      position: 'relative',
      borderTopWidth: tokens.strokeWidthThin,
      borderTopStyle: 'solid',
      borderTopColor: tokens.colorNeutralStroke1,
      borderBottomWidth: tokens.strokeWidthThin,
      borderBottomStyle: 'solid',
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftWidth: tokens.strokeWidthThin,
      borderLeftStyle: 'solid',
      borderLeftColor: tokens.colorNeutralStroke1,
      borderRightWidth: tokens.strokeWidthThin,
      borderRightStyle: 'solid',
      borderRightColor: tokens.colorNeutralStroke1,
      overflowY: 'hidden',
      overflowX: 'hidden',
    },
    overlay: {
      position: 'absolute',
      display: 'grid',
      alignItems: 'center',
      justifyItems: 'center',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transitionProperty: 'all',
      transitionDuration: tokens.durationSlow,
      transitionTimingFunction: tokens.curveAccelerateMax,
      backgroundColor: 'transparent',
    },
    removeOverlay: {
      display: 'none',
    },
    loading: {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    iframe: {
      height: '360px',
      width: '100%',
      borderTopStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'none',
      borderRightStyle: 'none',
    },
  });