package com.app.chat.service;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.chat.entities.Message;
import com.app.chat.entities.Room;
import com.app.chat.payload.MessageRequest;
import com.app.chat.repositories.RoomRepository;

@Service
public class ChatService {
	private static final Logger logger = LoggerFactory.getLogger(ChatService.class);

	@Autowired
	private RoomRepository roomRepository;

	public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {
		Room room = roomRepository.findByRoomId(roomId);
		if (room == null) {
			logger.error("Room not found: {}", roomId);
			throw new RuntimeException("Room not found");
		}
		Message message = new Message();
		message.setId(java.util.UUID.randomUUID().toString());
		message.setContent(request.getContent());
		message.setSender(request.getSender());
		message.setTimeStamp(LocalDateTime.now());
		message.setRoom(room);

		room.getMessages().add(message);
		roomRepository.save(room);
		logger.info("Message saved and broadcasted: {}", message);
		return message;
	}

}
