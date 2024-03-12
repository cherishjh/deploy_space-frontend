<template>
<!--  <div>-->
<!--    {{ chatRoomId }}-->
<!--  </div>-->
<!--  <div>-->
<!--    {{ loginUser }}-->
<!--  </div>-->
  <div class="q-pa-md row justify-center" ref="messageList" v-for="(msg, id) in chatMessage.chatList" :key="id">
    <div style="width: 100%; max-width: 400px">

      <q-chat-message v-if="this.loginUser == msg.sender"
                      :name=this.loginUser
                      :text="[msg.message]"
                      sent
      />
      <q-chat-message v-else
                      :name=msg.sender
                      :text="[msg.message]"
      />
    </div>
  </div>
  <div>
    <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm"
             bg-color="white"
             v-model="message"
             placeholder="Type a message"
             @keyup.enter="sendMessage" />
    <q-btn round flat @click="sendMessage()" label="보내기" />
  </div>
</template>

<script>

import {axiosInstance} from "boot/axios";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { BackURL } from "src/services/authService";

const VUE_APP_WS_URL = process.env.VUE_APP_WS_URL;

export default {

  props: {
    chatRoomId: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      chatMessage: [],
      loginUser: null,
      stompClient: null,
      // 메시지 내용을 저장할 변수
      message: '',
    }
  },

  watch: {
    chatRoomId(newChatRoomId) {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.disconnect();
        console.log('WebSocket 연결 종료됨');
      }
      if (newChatRoomId) {
        this.roomDetail();
        this.initializeWebSocket()
      }
    },
  },

  setup() {
    return {}
  },

  methods: {
    initializeWebSocket() {
      const socket = new SockJS(VUE_APP_WS_URL); // 백엔드 WebSocket 엔드포인트 URL
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log('WebSocket 연결됨');
        this.stompClient.subscribe('/sub/chat/send/' + this.chatRoomId, (response) => {

          const responseObject = JSON.parse(response.body);

          console.log('받은 메시지:', responseObject);
          console.log('sender: ', responseObject.sender)
          // const receivedMessage = JSON.parse(response.body);
          // const messageData = {
          //   sender: receivedMessage.loginUser,
          //   roomId: receivedMessage.chatRoomId,
          //   message: receivedMessage.message
          // }

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
    },

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

      // 대화 목록에 메시지를 추가
      // this.chatMessage.chatList.push(messageData);

      this.message = '';
    },

    roomDetail() {
      if (this.chatRoomId === null) {
        return;
      }
      axiosInstance.get(BackURL + `/chat/room/enter/` + this.chatRoomId)
        .then(response => {
          this.chatMessage = response.data.result;
          this.loginUser = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 스크롤을 아래로 내리는 메서드
    scrollToBottom() {
      this.$nextTick(() => {
        let container = this.$refs.messageList;
        if (container.scrollHeight > 0) {
          container.scroll({ top: container.scrollHeight, behavior: 'smooth' });
        }
      });
    },
  },

  created() {
    this.roomDetail();
  },

  mounted() {
    this.roomDetail();
    window.addEventListener('scroll', this.scrollPagination);
  },

};
</script>

<style lang="scss" scoped>

</style>
