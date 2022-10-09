<template>
  <div class="session-panel-warp">
    <div class="session-panel-header">
      <img
        :src="session.avatarUrl"
        @mousedown.stop=""
        alt=""
        class="session-avatar"
      />
      <span class="session-name">{{ session.name }}</span>
      <slot name="info"></slot>
    </div>
    <div class="session-panel-body">
      <slot name="body"></slot>
    </div>
    <div class="session-panel-footer" @mousedown.stop="">
      <div class="session-tool-warp">
        <!-- 上传文件功能 -->
        <form
          id="frmUploader"
          enctype="multipart/form-data"
          action="/upload"
          method="post"
          ref="form"
        >
          <input
            type="file"
            name="Uploader"
            ref="file"

            accept=".xls,.doc,.txt,.pdf,.pptx,.docx"
            @change="checkFileSure"
          />
          <input
            type="submit"
            name="submit"
            id="btnSubmit"
            value="上传"
            @click="uploadForm"
          />
        </form>
        <!-- <el-upload
  class="upload-demo"
  action="/upload"
  multiple
  :limit="1"
  :file-list="fileList">
  <el-button type="text" ><i class="el-icon-folder"></i></el-button>
</el-upload> -->

        <!-- 上传图片 -->
        <label class="session-tool-item">
          <span class="iconfont icon-img"></span>

          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            @change="fileChange"
          />
        </label>

        <div class="session-tool-item" @click="toggleShow">
          <span class="iconfont icon-expression"></span>
        </div>
        <transition name="slide">
          <div class="emoji-panel" v-show="isShow">
            <ul class="emoji-list">
              <li
                class="emoji-item"
                v-for="(item, i) in expressions"
                :key="i"
                @click.stop="pickerEmoji(item)"
              >
                <img
                  :src="baseUrl + item.url"
                  :alt="item.title"
                  :title="item.title"
                />
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="session-text-warp">
        <textarea
          class="session-textarea"
          v-model="text"
          @keypress.enter="sendText(text)"
        ></textarea>
      </div>
      <div class="session-btn-warp">
        <button class="session-send-btn" @click="sendText(text)">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { expressions } from "./emoji";
import Message from "./Message";
import { EMOJI_BASE_URL } from "./config";

export default {
  name: "UiSessionPanel",
  components: {},
  props: {
    session: {
      type: Object,
      default() {
        return {
          name: "似水流年",
          avatarUrl:
            "http://himg.bdimg.com/sys/portrait/item/90193135323338383137313237bc13.jpg",
        };
      },
    },
  },
  data() {
    return {
      expressions,
      baseUrl: EMOJI_BASE_URL,
      isShow: false,
      text: "",
      fileObject: {
        fileName: "", //文件
      fileUrl: "", //文件路径
      fileSize: "", //文件大小
      fileType: "", //文件类型
      videoUrl: "", //视频
      videoSize: "", //视频大小
      videoSrc: "", //视频路径
      },
      fileList: [],

    };
  },
  methods: {
    toggleShow() {
      const vm = this;
      function hide() {
        vm.isShow = false;
        document.removeEventListener("click", hide);
      }
      if (vm.isShow) {
        hide();
      } else {
        vm.isShow = true;
        setTimeout(() => {
          document.addEventListener("click", hide);
        }, 0);
      }
    },
    pickerEmoji(emoji) {
      this.text += emoji.title;
    },
    sendText(text) {
      // text=text.replace(/^\s+|\s+$/g,'');
      if (text) {
        this.sendMessage(text, "text");
      }
      setTimeout(() => {
        this.text = "";
      }, 0);
    },
    fileChange(e) {
      const reg = /\.(?:png|jpg|jepg)$/i;
      let file = e.target.files[0];
      if (!reg.test(file.name)) {
        Message.warning("请选择正确格式的图片文件!");
        return;
      }
      let maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        Message.warning("图片大小不能超过1M!", "warning");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = () => {
        let html = reader.result;
        this.sendMessage(html, "image");
      };
    },
    sendMessage(content, type) {
      this.$emit("sendMessage", content, type, this.session);
    },
    //文件
    checkFileSure() {
      this.fileObject.fileName = this.$refs.file.files[0].name;
      this.fileObject.fileSize = Math.floor(this.$refs.file.files[0].size/1024/1024)+'MB';
      this.fileObject.fileType =this.$refs.file.files[0].type;
      //this.fileUrl= window.location.href + '/' + document.querySelector('#btnfile').files[0].name
      this.fileObject.fileUrl = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.fileObject.filebox = true;
      console.log(this.fileObject.fileUrl, "文件地址");
      console.log(this.fileObject.fileName, this.fileObject.fileSize, this.fileObject.fileType, "文件");
    },

    // 上传文件
    uploadForm() {
      console.log(this.fileObject, "上传file", this.session);
      this.$emit("sendMessage", this.fileObject, "file", this.session);
      // this.sendMessage(this.fileObject, "file", this.session);

    },
  },
};
</script>

<style scoped lang="less">
.session-panel-warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #f2f2f2;
}
.session-panel-header {
  position: relative;
  height: 50px;
  padding: 10px 0;
  line-height: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #d1d1d1;
  margin: 0 10px;
}
.session-avatar {
  display: inline-block;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.session-name {
  font-size: 14px;
  color: #333333;
  line-height: 30px;
  margin: 0 5px;
}
.session-panel-body {
  width: 100%;
  height: calc(100% - 206px);
}
.session-panel-footer {
  height: 156px;
  box-sizing: border-box;
  padding: 0 10px 10px;
}
.session-tool-warp {
  position: relative;
  height: 40px;
  box-sizing: border-box;
  border-top: 1px solid #d1d1d1;
}
.session-tool-item {
  display: block;
  float: left;
  line-height: 40px;
  height: 40px;
  margin: 0 3px;
  cursor: pointer;
}
.session-tool-item span.iconfont {
  font-size: 25px;
  color: #606266;
}
.session-tool-item input[type="file"] {
  display: none;
}
.session-text-warp {
  height: 80px;
  box-sizing: border-box;
}
.session-textarea {
  font-size: 14px;
  padding: 10px;
  color: #666666;
  line-height: 20px;
  height: 80px;
  overflow-y: auto;
  resize: none;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
}
.session-btn-warp {
  height: 26px;
  text-align: right;
}
.session-send-btn {
  display: inline-block;
  height: 26px;
  line-height: 24px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #d1d1d1;
  color: #606266;
  outline: none;
  width: 80px;
  text-align: center;
  background-color: #ffffff;
  cursor: pointer;
}
.emoji-panel {
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  position: absolute;
  bottom: 100%;
  width: 420px;
  box-shadow: 0 0 3px #d1dbe5;
  margin-bottom: 5px;
  left: -40px;
}
.emoji-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.emoji-list:after {
  display: block;
  clear: both;
  content: "";
}
.emoji-item {
  float: left;
  width: 26px;
  height: 26px;
  padding: 2px;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: 2px;
  user-select: none;
}
.emoji-item:hover {
  background-color: #f2f2f2;
}
.emoji-item img {
  display: block;
  width: 100%;
  height: 100%;
}
/deep/.upload-demo {
  font-size: 25px;
  display: inline-block;
  border: none;
  .el-button {
    height: 40px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #606266;
  }
  i {
    font-size: 25px;
  }
}
</style>
