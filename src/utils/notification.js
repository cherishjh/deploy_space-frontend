// 성공 메세지
export function triggerOngoing(message, $q) {
  $q.notify({
    type: 'positive',
    message: message,
    timeout: 1000
  });
}

// 경고 메시지
export function triggerNegative(message, $q) {
  $q.notify({
    type: 'warning',
    position: 'top',
    message: message
  });
}
