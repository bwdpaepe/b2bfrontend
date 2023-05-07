import { Button, useEditableControls, ButtonGroup } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function EditControlsBestellingPage() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="start" size="sm" w="full" spacing={2} mt={2}>
      <Button rightIcon={<CheckIcon />} {...getSubmitButtonProps()} />
      <Button
        rightIcon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
}
