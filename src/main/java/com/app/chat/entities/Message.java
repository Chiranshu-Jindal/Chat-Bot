package com.app.chat.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "messages")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {

	@Id
	private String id; // Added ID field for JPA entity

	private String sender;
	private String content;
	private LocalDateTime timeStamp;

	@ManyToOne
	@JoinColumn(name = "room_id")
	private Room room; // Added relationship to Room

	public Message(String sender, String content) {
		this.sender = sender;
		this.content = content;
		this.timeStamp = LocalDateTime.now();
	}
	// Explicitly adding the setter for room
    public void setRoom(Room room) {
        this.room = room;
    }
    
//    // You might also want to add a getter if needed
//    public Room getRoom() {
//        return room;
//    }
}