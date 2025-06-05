package com.app.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.app.chat.service.RoomService;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody String roomId) {
		return roomService.create_room(roomId);
	}

	@GetMapping("/{roomId}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
		return roomService.join_room(roomId);
	}

	@GetMapping("/{roomId}/messages")
	public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
			@RequestParam(value = "page", defaultValue = "0", required = false) int page,
			@RequestParam(value = "size", defaultValue = "20", required = false) int size) {
		return roomService.get_message(roomId, page, size);
//		return ResponseEntity.ok(messages);
//        return ResponseEntity.ok(room.getMessages());
	}
}