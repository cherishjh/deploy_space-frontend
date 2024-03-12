# ✅ 메시지 서비스

## 1. 구현한 기능

- 다대다 채팅
- 채팅방 생성과 구독
- 메시지 송수신

<br/>

---

<br/>

## 2. 기반 기술 설명

<br/>

### 2.1. 웹소켓

- HTTP 환경에서 클라이언트와 서버 사이에서 하나의 TCP 연결을 통해 실시간 양방향 통신을 가능하게 하는 프로토콜
- 웹소켓 기술이 없을 때는 Polling 또는 Long Polling 등의 방식으로 실시간 통신에 가깝게 구현해서 해결함
- 경우에 따라서 웹소켓 통신을 지원하지 않는 브라우저는 Polling 또는 Long Polling 등의 방식으로 양방향 통신을 함.

<br/>

### 2.2. 웹소켓 동작 방식

- 웹소켓은 또다른 프로토콜이지만, HTTP 환경에서 최초에는 TCP 연결을 통해서 Upgrade 되는 방식
- 웹소켓은 연결을 수립하기 위해서 Upgrade헤더와 Connection헤더를 포함하는 HTTP요청을 최초에 보낸다.

<p align="center">
    <img src="/docs/docs_jaeseok/img/01websocket.png"/>
</p>

- 상태코드: `101 Switching Protocols` 
  - handshake 요청 이후부터 웹소켓 통신이 가능해진다.
  - handshake 과정을 통해서 연결이 수립되면 HTTP에서 웹소켓으로 업그레이드 된다.

<br/>

### 2.3. HTTP vs 웹소켓

- 첫 연결의 시작은 HTTP 요청이 들어가지만, HTTP와 웹소켓 두 프로토콜은 다르게 동작한다.
- HTTP는 클라이언트와 서버간의 접속을 유지하지 않고, Response와 Request 형태의 단방향 통신만 가능하다.
- 따라서 서버에서 클라이언트로의 요청은 불가능하다. 또한 Request와 Response가 완료되면 해당 연결은 종료되는 특징을 가지고 있다.
  - 실시간으로 서버와 클라이언트 간의 통신이 이루어져야 하는 채팅 프로그램 상에서는 적절하지 않을 수 있다.
- 한편, 웹소켓은 클라이언트와 서버 간의 접속이 유지되고, 요청과 응답이 아닌 서로 데이터를 주고 받는 형식이다.

<br/>

---

<br/>

## 3. 스프링 환경에서 웹소켓 사용하기

<p align="center">
  <img src="/docs/docs_jaeseok/img/02_STOMP_logo.png"/>
</p>

- 앞에서 설명한 웹소켓만을 사용해서 채팅을 구현하게 되면 고려해야 할 사항이 많아진다.
- 웹소켓은 메시지 형식이 정해져 있지 않기 때문에 해당 메시지가 어떤 요청인지, 어떤 포맷으로 오는지 등에 대해서 일일이 구현하는 작업이 필요하다.
- STOMP는 웹소켓의 서브 프로토콜로 클라이언트와 서버가 서로 통신할 때 메시지의 형식, 유형, 내용 등을 정의해주는 프로토콜이다.
- STOMP를 사용하게 되면 규격화된 메시지를 보낼 수 있고, 스프링 자체에서도 `spring-messaging`과 `spring-websocket` 모듈을 통해서 웹소켓을 지원하고 있다.

<br/>

### 3.1. STOMP frame 예시

```
COMMAND
header1:value1
header2:value2

Body^@
```

- STOMP는 위와 같은 형식으로 HTTP 위에 올라가는 Frame으로 모델링된다.
- COMMAND로는 주로 SEND, SUBSCRIBE 명령을 사용
- `key:value` 형태로 메시지의 수신대상과 메시지에 대한 정보를 설명
- 그리고 이를 통해서 Publisher(송신)와 Subscriber(수신)를 지정하고, 메시지 브로커를 통해 특정 사용자에게 메시지를 전송하는 기능 등이 가능하게 한다.
- 메시지 브로커는 Publisher로부터 받은 메시지를 Subscriber로 전달해주는 중간 매개체의 역할을 한다.

<br/>

### 3.2. Publish / Subscribe

<p align="center">
  <img src="/docs/docs_jaeseok/img/03_pubsub.png"/>
</p>

- 2명의 사용자 클라이언트가 있고, 사용자는 서버와 웹소켓으로 연결
- 구독하는 주소를 동일하게 `no01`에 구독하도록 설정
- **발행자**의 메시지 타겟을 `no01`으로 설정해서 메시지를 보내고, 서버에서는 발행자의 메시지를 확인한 후 `no01` 채널을 구독하는 모든 사용자에게 메시지를 보내게 됨.

<p align="center">
  <img src="/docs/docs_jaeseok/img/04_pubsub.png"/>
</p>

- 구독 URL이 다르다면?
- 발행자가 메시지 타겟을 `no01`로 설정해서 메시지를 보냈을 때 `no02`를 구독 중인 사용자는 해당 메시지를 받지 못한다.

<p align="center">
  <img src="/docs/docs_jaeseok/img/05_pubsub.png"/>
</p>

- 한편 구독과 발행을 동시에 하는 것도 가능(e.g., 채팅)
- 채팅은 양방향으로 채팅 메시지를 주고 받아야 한다.
- 참고) 

<br/>

---

<br/>

## 4. 구현 내용

<br/>

### 4.1. WebSocket 연결을 요청할 주소 설정

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // 클라이언트가 구독할 수 있는 endpoint의 접두사를 설정합니다.
        // 구독은 클라이언트가 서버로부터 메시지를 받기 위해 사용됩니다.
        // SimpMessagingTemplate의 convertAndSend() 메소드는 이 endpoint를 사용하여 메시지를 전송,
        // 구독하고 있는 모든 클라이언트가 이 메시지를 받게 됩니다.
        registry.enableSimpleBroker("/sub");

        // 클라이언트에서 메시지를 보내는 데 사용되는 endpoint의 접두사를 설정합니다.
        // 클라이언트는 이 접두사를 사용하여 메시지를 보내며, 이 메시지는 @MessageMapping으로 어노테이션이 달린 컨트롤러 메소드에 전달됩니다.
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
```

- `EnableWebSocketMessageBroker`로 WebSocket 메시지 처리를 활성화
- `configureMessageBroker()`
  - 인메모리 기반의 SimpleMessageBroker를 활성화
- `registry.enableSimpleBroker("/sub");` : `/sub`으로 시작하는 주소의 Subscriber들에게 메시지를 전달하는 역할
- `registry.setApplicationDestinationPrefixes("/pub");` : 클라이언트는 `/pub`으로 시작하는 주소로 메시지를 보내고, 해당 메시지는 `@MessageMapping`으로 어노테이션이 달린 컨트롤러 메서드에 전달된다.
- `registerStompEndpoints`
  - HandShake로 통신을 담당할 endpoint.
  - 클라이언트에서 서버로 웹소켓 연결을 할 때 `/ws`로 요청을 보낸다.

<br/>

### 4.2. 채팅 데이터 DTO

- 메시지를 전송 및 DB에 저장할 때는 채팅 데이터를 아래의 DTO에 담아서 사용합니다.

```java
package com.encore.space.domain.chat.dto;

import com.encore.space.domain.chat.domain.Chat;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResDto {
    private Long id;
    private String messageType;
    private String roomId;
    private String sender;
    private String message;
    private String time;

    public static ChatResDto convertToDto(Chat chat) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm");
        String formatedNow = chat.getSendAt().format(formatter);
        return new ChatResDto(
                chat.getId(),
                chat.getMessageType().toString(),
                chat.getChatroom().getRoomId(),
                chat.getSender(),
                chat.getMessage(),
                formatedNow);
    }
}
```

<br/>

### 4.3. Controller

```java
@Tag(name = "웹소켓 통신을 위한 API")
@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MemberService memberService;
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final MemberChatRoomService memberChatRoomService;

    ...
  
    @Operation(
            summary = "메시지 전송 및 DB 저장",
            description = "구독 중인 채팅룸으로 메시지를 전송과 동시에 DB에 채팅 메시지를 저장"
    )
    @MessageMapping("/chat/send/{roomId}")
    @SendTo("/sub/chat/send/{roomId}")
    public ChatResDto sendMessage(@DestinationVariable String roomId, ChatReqDto messageData) {
        Chat createdChat = chatService.save(messageData, MessageType.CHAT);
        ChatResDto chatResDto = ChatResDto.convertToDto(createdChat);
        // 받은 메시지를 그대로 다시 전송합니다.
        return chatResDto;
    }
}
```

- `@MessagingMapping` : Client가 SEND할 수 있는 경로
- WebSocketConfig의 `configureMessageBroker`에서 `setApplicationDestinationPrefixes`로 등록한 `/pub`과 MessagingMapping의 경로가 합쳐져서 `/pub/chat/send/{roomId}`로 메시지를 전달한다.
- 따라서, 클라이언트에서 `/pub/chat/send/{roomId}` URL로 메시지를 보내면 해당 roomId를 구독 중인 사용자들에게 메시지를 전달하게 된다.

<br/>

### 4.4. 클라이언트에서 메시지를 송수신

```javascript
initializeWebSocket() {
  const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 WebSocket 엔드포인트 URL
  this.stompClient = Stomp.over(socket);
  this.stompClient.connect({}, (frame) => {
    console.log('WebSocket 연결됨');
    this.stompClient.subscribe('/sub/chat/send/' + this.chatRoomId, (response) => {

      const responseObject = JSON.parse(response.body);

      const receivedMessage = {
        sender: responseObject.sender, // 다른 정보 채널에서 실제 sender 값을 가져옵니다.
        message: responseObject.message
      };

      // 받은 메시지를 채팅목록에 추가
      this.chatMessage.chatList.push(receivedMessage);

    });
  }, (error) => {
    console.error('WebSocket 연결 오류:', error);
  });
}
```

- 채팅방에 참가하면 Stomp.over를 통해서 웹소켓 연결 후 stompClient.subscribe로 해당 채팅룸을 구독한다.

```javascript
sendMessage() {
  if (!this.stompClient || !this.stompClient.connected) {
    console.error('STOMP connection is not established yet.');
    return;
  }
  const messageData = {
    sender: this.loginUser,
    roomId: this.chatRoomId,
    message: this.message
  }
  console.log("Sending Data: ", messageData);

  this.stompClient.send('/pub/chat/send/'+this.chatRoomId, {}, JSON.stringify(messageData));

  this.message = '';
}
```

- Client에서 /pub/chat/send/{chatRoomID} URL로 메시지를 보내면 chatRoomId를 이용해서 메시지를 전송

<br/>

---

<br/>

## 5. 서비스 시연

<br/>
<br/>



