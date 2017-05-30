const photoMessage = {
  message : '이러면 가려나 몰라요우~',
  type : 'photo',
  content : 'http://placehold.it/600/92c952'
}
const photoMessage2 = {
  message : {
    photo : {
      url : 'http://placehold.it/600/771796',
      width : 640,
      height : 480
    },
    message_button : {
      label : '선택적 청력상실이죠',
      url : 'http://placehold.it/150/24f355'
    }
  },
  keyboard : {
    type : 'buttons',
    buttons : [
      '처음으로',
      '다시 등록하기',
      '취소하기'
    ]
  }
}

module.export = {
  photoMessage,
  photoMessage2
}
