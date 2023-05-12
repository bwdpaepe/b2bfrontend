import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
} from "@chakra-ui/react";
import profile from "../../assets/icons/profile.png";
import AanmeldFormulier from "./AanmeldFormulier";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sessionClose } from "../../service/aanmelden";
import useLoggedUser from "../../util/useLoggedUser";
import User from "../../type/User";

export default function AanmeldModal() {
  const [user] = useLoggedUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  
  let loggedInUser: User | null = null;
  if (user.length) {
    loggedInUser = JSON.parse(user);
  }

  const handleButtonClick = () => {
    if (!loggedInUser) {
      onOpen();
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Ben je zeker dat je wil uitloggen?");
    if (confirmLogout) {
      sessionClose(); // before deleting the localstorage Token !!
      localStorage.removeItem("Bedrijf");
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      navigate("/");
      window.location.reload(); // reload the page to update the navbar
    }
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          className="menuButton"
          id="profileButton"
          onClick={handleButtonClick}
        >
          <Center>
          <Image src={profile} boxSize="80px" fit="fill" />
          </Center>
        </MenuButton>
        {loggedInUser && (
          <MenuList>
            <MenuItem onClick={handleProfileNavigation}>Profiel</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        )}
      </Menu>
      {!loggedInUser && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Meld je aan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AanmeldFormulier onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
