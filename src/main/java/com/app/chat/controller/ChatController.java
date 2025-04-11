package com.app.chat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.chat.entities.Message;
import com.app.chat.entities.Room;
import com.app.chat.payload.MessageRequest;
import com.app.chat.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:8080")
public class ChatController {

	@Autowired
	private RoomRepository roomRepository;

	// for sending and receiving messages
	@MessageMapping("/sendMessage/{roomId}") // client sent message on this but it actually goes on
												// /app/sendMessage/roomId
	@SendTo("/topic/room/{roomId}") // subscribe
	public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {
		Room room = roomRepository.findByRoomId(request.getRoomId());
		Message message = new Message();
		message.setContent(request.getContent());
		message.setSender(request.getSender());
		message.setTimeStamp(LocalDateTime.now());

		if (room != null) {
			room.getMessages().add(message);
			roomRepository.save(room);
		} else {
			throw new RuntimeException("room not found");
		}
		return message;

	}

}
