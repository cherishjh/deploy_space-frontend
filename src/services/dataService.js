// 애플리케이션의 비즈니스 로직을 처리하고 데이터를 관리하는 파일로, 데이터를 가져오고 저장하는 작업을 수행하며, 데이터의 가공이나 변환을 처리

import {BackURL} from "src/services/authService";

export function imgApi(attach_file_path) {
  return `${BackURL}/api/file/images/${attach_file_path}/image`;

}
