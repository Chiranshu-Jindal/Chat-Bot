package com.app.chat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.chat.entities.Message;
import com.app.chat.payload.MessageRequest;
import com.app.chat.service.ChatService;

import jakarta.transaction.Transactional;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

	@Autowired
	private ChatService service;

	// for sending and receiving messages
	@MessageMapping("/sendMessage/{roomId}") // client sent message on this but it actually goes on
	@Transactional // /app/sendMessage/roomId
	@SendTo("/topic/room/{roomId}") // subscribe
	public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {
		logger.info("Received message for room {}: {}", roomId, request);
		if (request.getContent() == null || request.getContent().trim().isEmpty()) {
			logger.error("Invalid message content");
			throw new IllegalArgumentException("Message content cannot be empty");
		}
		return service.sendMessage(roomId, request);

	}

}
