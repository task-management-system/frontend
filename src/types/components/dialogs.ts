export interface DialogChildrenHelpers {
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ConfirmDialogChildrenHelpers extends DialogChildrenHelpers {
  handleAccept: () => void;
  handleCancel: () => void;
}
