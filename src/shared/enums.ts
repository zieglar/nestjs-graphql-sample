export enum PayStatus {
  FULL_PRICE = 'fullPrice',
  DISCOUNT = 'discount',
  FREE = 'free',
  GIFT = 'gift',
  PROMOTION = 'promotion',
}

export enum PaidChannels {
  WECHAT_JSAPI = 'wechat-jsapi',
  WECHAT_MWEB = 'wechat-mweb',
  WECHAT_APP = 'wechat-app',
  WECHAT_NATIVE = 'wechat-native',
  ALIPAY = 'alipay',
  PAYPAL = 'Paypal',
  STRIPE = 'stripe',
}

// 性别 0：未知、1：男、2：女
export enum WeChatUserGender {
  UNKNOWN,
  MALE,
  FEMALE,
}

export enum WeChatLanguage {
  EN = 'en',
  ZH_CN = 'zh_CN',
  ZH_TW = 'zh_TW',
}

export enum ClientOperation {
  BIND = 'bind',
  UNBIND = 'unbind',
  SHARE = 'share',
  CHARGE = 'charge',
}
