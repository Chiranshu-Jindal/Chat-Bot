//package com.app.chat.service;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.util.Base64;
//import java.util.UUID;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.app.chat.entities.Message;
//import com.app.chat.repositories.RoomRepository;
//
//@Service
//public class FileService {
//	
//	@Autowired
//	private RoomRepository roomRepository;
//	
//	public Message saveFile(Message message) {
//		
//		if (message.getFileContent() != null) {
//            try {
//                byte[] fileBytes = Base64.getDecoder().decode(message.getFileContent());
//                String fileExtension = getFileExtension(message.getFileType());
//                String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
//                String filePath = "uploads/" + uniqueFileName;
//                File file = new File(filePath);
//                try (FileOutputStream fos = new FileOutputStream(file)) {
//                    fos.write(fileBytes);
//                }
//                message.setFilePath(filePath);
//                message.setFileContent(null);
//            } catch (Exception e) {
//                throw new RuntimeException("Failed to save file: " + e.getMessage());
//            }
//        }
//        return messageRepository.save(message)
//		
//	}
//
//}
