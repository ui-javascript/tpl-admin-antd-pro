/**
 * 通知接口，需要子类实现
 */
export default class Notification {
  /* 成功 */
  static success(config) {}

  /* 失败 */
  static error(config) {}

  /* 信息 */
  static info(config) {}

  /* 警告 */
  static warning(config) {}

  /* 警告 */
  static warn(config) {}

  /* 关闭 */
  static close(key) {}

  /* 销毁 */
  static destroy() {}

}
