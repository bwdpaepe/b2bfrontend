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
} from "@chakra-ui/react";
import profile from "../../assets/icons/profile.png";
import AanmeldFormulier from "./AanmeldFormulier";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AanmeldModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("User");
    if (userFromStorage) {
      setLoggedInUser(JSON.parse(userFromStorage));
    }
  }, []);

  const handleButtonClick = () => {
    if (!loggedInUser) {
      onOpen();
    }
  };

  const handleLogout = () => {
    const confirmedLogout = window.confirm('Ben je zeker dat je wil uitloggen?');
    if (confirmedLogout) {
        localStorage.removeItem("Bedrijf");
        localStorage.removeItem("Token");
        localStorage.removeItem("User");
        setLoggedInUser(null);
        navigate("/");
        window.location.reload();
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
          <Image src={profile} boxSize="80px" fit="fill" />
        </MenuButton>
        {loggedInUser && (
          <MenuList>
            <MenuItem onClick={handleProfileNavigation}>Profiel</MenuItem>
            <MenuItem as="a" href="#">
              (placeholder)
            </MenuItem>
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
