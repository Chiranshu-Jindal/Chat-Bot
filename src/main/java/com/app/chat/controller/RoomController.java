package com.app.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.chat.entities.Message;
import com.app.chat.entities.Room;
import com.app.chat.repositories.RoomRepository;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:8080")
public class RoomController {

	private final RoomRepository roomRepository;

	public RoomController(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody String roomId) {
		String cleanedRoomId = roomId.trim();
		if (roomRepository.findByRoomId(cleanedRoomId) != null) {
			return ResponseEntity.badRequest().body("room already exist");
		}
		Room room = new Room();
		room.setRoomId(cleanedRoomId);
		Room savedRoom = roomRepository.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
	}

	@GetMapping("/{roomId}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
		Room room = roomRepository.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().body("room not found");
		}
		return ResponseEntity.ok(room);
	}

	@GetMapping("/{roomId}/messages")
	public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
			@RequestParam(value = "page", defaultValue = "0", required = false) int page,
			@RequestParam(value = "size", defaultValue = "20", required = false) int size) {
		Room room = roomRepository.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().build();
		}
		List<Message> messages = room.getMessages();

		int start = Math.max(0, messages.size() - (page + 1) * size);

		int end = Math.min(messages.size(), start + size);

		List<Message> paginatedMessages = messages.subList(start, end);
		return ResponseEntity.ok(paginatedMessages);
//		return ResponseEntity.ok(messages);
//        return ResponseEntity.ok(room.getMessages());
	}
}