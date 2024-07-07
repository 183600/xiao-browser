/**
 * 关于图标数据说明
 *
 * Description of icon data
 *
 * 数据来源于：
 * The data comes from:
 *
 * https://icon-sets.iconify.design/
 * https://icones.netlify.app/
 */
// 此处仅做了Element Plus的部分引入示例
// 此处做法的缺点是，引入的图标会被全量引入打包中，所以建议仅引入所需部分图标名称。

// Here is only a partial import example of Element Plus
// The disadvantage of this approach is that the imported icons will be fully imported into the package, so it is recommended to only import the required part of the icon names.
export default {
  prefix: 'ep',
  icons: ['arrow-down', 'arrow-down-bold', 'arrow-left', 'arrow-left-bold', 'arrow-right', 'arrow-right-bold', 'arrow-up', 'arrow-up-bold'],
}
