package com.app.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.chat.entities.Message;
import com.app.chat.entities.Room;
import com.app.chat.repositories.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository roomRepository;

	public ResponseEntity<?> create_room(String roomId) {
		String cleanedRoomId = roomId.trim();
		if (roomRepository.findByRoomId(cleanedRoomId) != null) {
			return ResponseEntity.badRequest().body("room already exist");
		}
		Room room = new Room();
		room.setRoomId(cleanedRoomId);
		Room savedRoom = roomRepository.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
	}

	public ResponseEntity<?> join_room(String roomId) {
		Room room = roomRepository.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().body("room not found");
		}
		return ResponseEntity.ok(room);
	}

	public ResponseEntity<List<Message>> get_message(String roomId, int page, int size) {
		Room room = roomRepository.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().build();
		}
		List<Message> messages = room.getMessages();
		int start = Math.max(0, messages.size() - (page + 1) * size);
		int end = Math.min(messages.size(), start + size);
		List<Message> paginatedMessages = messages.subList(start, end);
		return ResponseEntity.ok(paginatedMessages);
	}
}
