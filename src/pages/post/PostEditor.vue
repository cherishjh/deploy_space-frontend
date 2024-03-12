<template>
  <q-page class="sj-container">
    <div class="sj-content">

      <q-item-section class="editor__aline">
        <form
          @submit.prevent="submitPost"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          style=" width: 100%"
        >

          <MySpaceList
            :mySpaceList="mySpaceList"
            @getClickedSpaceId="spaceId=$event"
            style="padding: 40px 50px 50px 50px"
          />

          <q-card class="q-my-lg q-ma-sm row">
            <q-input placeholder="제목을 입력하세요." class="col-10" standout v-model=title required></q-input>
            <q-btn class="col-2 bg-orange text-white submit" type="submit">SUBMIT</q-btn>
          </q-card>

          <q-editor
            class="q-ma-sm"
            ref="editorRef"
            :definitions="definitions"
            :toolbar="[['left','center','right','justify'],['bold','italic','underline','strike'],['undo','redo'],['insert_img']]"
            v-model="editor"
          />
          <q-card flat bordered class="q-pa-md q-ma-lg">
            <p class="Preiview"> Preiview </p>
            <div v-html="renderedHtml"></div>
          </q-card>
        </form>

      </q-item-section>
    </div>
  </q-page>

  <AppSidebar></AppSidebar>

</template>

<script>

import AppSidebar from "components/layout/AppSidebar.vue";
import {axiosInstance} from "boot/axios";
import MySpaceList from "pages/space/cardList/MySpaceList.vue";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  components: {MySpaceList, AppSidebar},
  data() {
    return {
      title: '',
      editor: '',
      spaceId: 0,
      mySpaceList: {},
      imgUrlList:[],
      definitions: {
        insert_img: {
          tip: '사진첨부',
          icon: 'photo',
          handler: this.insertImg
        }
      }
    }
  },
  computed: {
    renderedHtml() {
      return this.editor;
    }
  },
  methods: {

    async loadMySpacesByEmail() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/space/my`);
        this.mySpaceList = response.data.result
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },

    insertImg() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.png, .jgp'
      let file
      input.onchange = _ => {
        const files = Array.from(input.files)
        file = files[0]

        const reader = new FileReader()
        reader.onloadend = () => {
          const blob = this.base64ToBlob(reader.result);
          const url = URL.createObjectURL(blob);
          this.imgUrlList.push(url);
          this.editor += `<div><img style="max-width: 100%;" src="${url}" alt=""/></div>`
        }
        reader.readAsDataURL(file)
      }
      input.click()
    }
    ,
    async fetchBlobFromUrl(url) {
      try {
        const response = await fetch(url); // URL에서 데이터를 가져옴
        return await response.blob(); // Blob 반환
      } catch (error) {
        console.error('Error fetching blob from URL:', error);
        throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
      }
    }
    ,
    base64ToBlob(base64Data) {
      const byteString = atob(base64Data.split(',')[1]);
      const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]; // 이미지의 MIME 유형을 가져옴

      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      return new Blob([uint8Array], {type: mimeString});
    }
    ,
    async submitPost() {
      if (!this.title.trim() || !this.editor.trim()) {
        alert('제목과 내용을 입력하세요.');
        return;
      }

      if (this.spaceId === 0) {
        alert('포스팅할 스페이스를 클릭해주세요');
        return;
      }

      if (confirm("작성하시겠습니까?")) {
        try {
          const editors = this.editor
          const formData = new FormData();
          formData.append('title', this.title);
          formData.append('contents', editors);
          formData.append('spaceId', this.spaceId);
          formData.append('imgUrlList', this.imgUrlList);

          // 이미지 파일 추가
          const images = this.$refs.editorRef.$el.querySelectorAll("img");
          console.log(images);
          for (const image of images) {
            const imageUrl = image.getAttribute('src');
            const blob = await this.fetchBlobFromUrl(imageUrl);
            // 단일 파일로 추가
            formData.append('attachFileList', blob, 'image.jpg');
          }
          console.log([...formData.entries()]);

          // Axios를 사용하여 서버로 데이터 전송
          await axiosInstance.post(`${BASE_URL}/api/post/create`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.title = ''; // 제목 초기화
          this.editor = ''; // 에디터 초기화
          formData.delete('attachFileList');
        } catch (error) {
          console.error('Error submitting post:', error);
        }
        this.$router.push('/') // 홈 라우팅
      }
    }
  },

  created() {
    this.loadMySpacesByEmail();
  },
};

</script>

<style scoped>

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 1.2fr;
}

.sj-content {
  box-sizing: border-box;
  //background-color: gray;
  width: 100%;
  height: 100%;
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.editor__aline {
  width: 100%;
}

.submit {
  font-size: 22px;
  letter-spacing: 4px;
}
</style>
