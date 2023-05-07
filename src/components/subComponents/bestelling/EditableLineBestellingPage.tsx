import {
  EditablePreview,
  useColorModeValue,
  Input,
  Editable,
  Tooltip,
  EditableInput,
} from "@chakra-ui/react";

import EditControlsBestellingPage from "./EditControlsBestellingPage";

export default function EditableLineBestellingPage() {
  return (
    <Editable
      defaultValue="Land"
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      w={"100%"}
      alignItems={"flex-start"}
      flex={1}
    >
      <Tooltip label="Klik om aan te passen" shouldWrapChildren={true}>
        <EditablePreview
          py={2}
          px={4}
          minW={"300px"}
          w={"100%"}
          border={"1px solid black"}
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableInput} />
      <EditControlsBestellingPage />
    </Editable>
  );
}
