package com.app.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.chat.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	Room findByRoomId(String roomId);  
}
