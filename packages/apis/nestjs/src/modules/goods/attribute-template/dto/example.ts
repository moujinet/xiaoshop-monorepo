import { GoodsAttributeOptionType } from '@xiaoshop/schema'

export const example = {
  name: '家具参数模板',
  desc: '家具参数模板描述',
  options: [
    {
      name: '树种',
      type: GoodsAttributeOptionType.CHECKBOX,
      options: ['黑胡桃', '橡木', '榆木'],
      defaultValue: ['黑胡桃'],
    },
  ],
}
