const _notifications = [
  { key: '', category: 1, name: '收银台会员验证', description: '收银台进行会员验证时发送' },
  { key: '', category: 1, name: '注册验证', description: '会员注册时填写手机号，点击获取动态码进行发送' },
  { key: '', category: 1, name: '动态码登录', description: '会员手机号登录时，点击获取验证码时发送' },
  { key: '', category: 1, name: '设置密码', description: '会员修改密码时，点击获取动态码时发送' },
  { key: '', category: 1, name: '找回密码', description: '会员申请找回密码时，点击获取动态码时发送' },
  { key: '', category: 1, name: '账户绑定', description: '会员申请账号绑定时，点击获取动态码时发送' },
  { key: '', category: 1, name: '会员注销成功', description: '会员申请账号注销成功后发送' },
  { key: '', category: 1, name: '会员注销失败', description: '会员申请账号注销失败后发送' },
  { key: '', category: 1, name: '订单催付通知', description: '未付款订单将会在订单关闭前10分钟对买家进行催付提醒' },
  { key: '', category: 1, name: '订单关闭通知', description: '订单未付款自动关闭后进行发送' },
  { key: '', category: 1, name: '订单支付通知', description: '买家订单支付成功后发送通知' },
  { key: '', category: 1, name: '订单发货通知', description: '只针对实物商品物流发货，卖家发货完成后进行发送' },
  { key: '', category: 1, name: '订单完成通知', description: '订单交易状态为已完成时对买家进行发送' },
  { key: '', category: 1, name: '核销商品临期提醒', description: '核销码过期前一段时间（可设置时间）对买家发送' },
  { key: '', category: 1, name: '核销码过期提醒', description: '核销码过期后对买家发送提醒' },
  { key: '', category: 1, name: '核销成功通知', description: '核销码核销成功后对买家发送，可以是虚拟商品核销、门店自提订单核销' },
  { key: '', category: 1, name: '商家同意退款', description: '卖家统一退款后对买家发送' },
  { key: '', category: 1, name: '商家拒绝退款', description: '卖家拒绝退款申请后对买家进行发送' },
  { key: '', category: 1, name: '会员提现成功通知', description: '会员余额提现到账后进行发送' },
  { key: '', category: 1, name: '会员余额变动通知', description: '会员余额发生收入、支出发生改变时发送' },
  { key: '', category: 1, name: '分销佣金发放通知', description: '会员余额发生收入、支出发生改变时发送' },
  { key: '', category: 1, name: '分销提现成功通知', description: '会员佣金提现成功后进行发送' },
  { key: '', category: 1, name: '分销提现失败通知', description: '会员佣金提现失败后进行发送' },
  { key: '', category: 1, name: '砍价成功通知', description: '会员佣金提现失败后进行发送' },
  { key: '', category: 1, name: '拼团成功通知', description: '拼团成功后通知会员' },
  { key: '', category: 1, name: '拼团失败通知', description: '拼团失败后通知会员' },
  { key: '', category: 2, name: '买家支付通知', description: '买家订单支付成功后对卖家发送' },
  { key: '', category: 2, name: '买家订单完成通知', description: '买家订单交易完成后对卖家发送' },
  { key: '', category: 2, name: '订单维权通知', description: '买家提交退款申请后对卖家进行发送' },
  { key: '', category: 2, name: '买家已退货通知', description: '买家提交退货信息后对卖家进行发送' },
  { key: '', category: 2, name: '会员申请提现通知', description: '买家申请余额提现后对卖家进行通知' },
  { key: '', category: 2, name: '分销申请提现通知', description: '买家发起佣金提现后对卖家进行通知' },
  { key: '', category: 2, name: '会员注销申请', description: '会员提交账户注销申请后对商家进行发送' },
]

export default defineMocks({
  '/api/notification/template/list': () => {
    return responseMock(
      _notifications,
    )
  },
})
