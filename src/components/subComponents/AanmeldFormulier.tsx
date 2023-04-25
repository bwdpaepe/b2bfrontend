import {
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  useBoolean,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { login } from "../../service/aanmelden";
import ErrorMessage from "./ErrorMessage";

export default function AanmeldFormulier(onClose: { onClose: () => void }) {
  const [isLoading, setIsloading] = useBoolean();
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const aanmelden = async (event: FormEvent) => {
    event.preventDefault();
    setIsloading.on();
    try {
      await login(email, password);
      onClose.onClose();
      window.location.reload();
    } catch (error: any) {
      setError(error.message);
    }
    setIsloading.off();
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form
          onSubmit={(e) => {
            aanmelden(e);
          }}
        >
          <FormControl>
            {error && <ErrorMessage message={error} />}
            <FormLabel>E-mail Adress</FormLabel>
            <Input
              type="email"
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
              required
            ></Input>
            <FormLabel>Paswoord</FormLabel>
            <Input
              type="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              required
            ></Input>
            <Center>
              <Button className="button" type="submit">
                Meld Aan
              </Button>
            </Center>
          </FormControl>
        </form>
      )}
    </>
  );
}
