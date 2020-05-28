import { Toast } from 'vant'
import msgPicUrl from '@/assets/image/icon/msg.png'
export default {
  popup (msg) {
    Toast({
      message: msg,
      duration: 3000,
      closeOnClick: true,
      icon: msgPicUrl,
      position: 'top',
      className: 'tipPopup'
    })
  }
}
