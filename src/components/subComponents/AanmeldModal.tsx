import {Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import profile from "../../assets/icons/profile.png"
import AanmeldFormulier from "./AanmeldFormulier";


export default function AanmeldModal(){
    const {isOpen, onOpen, onClose} = useDisclosure();

    return(
        <>
        {/* HIER NOG ONDERSCHEID GAAN MAKEN WANNEER INGELOGD => PROFIEL BEKIJKEN IPV MODAL */}
        <Button className="menuButton" id="profileButton" onClick={onOpen}><Image src= {profile} boxSize='80px' fit="fill"/></Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Meld je aan</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                <AanmeldFormulier onClose={onClose}/>

                </ModalBody>
            </ModalContent>
        </Modal>
        
        </>
    )





}