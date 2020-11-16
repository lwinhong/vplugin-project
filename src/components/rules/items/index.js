/**
 * 该文件`@/item/index.js`能够一次性导入同路径下的所有vue组件。 
 * 不要随意编辑此文件。
 */

const files = require.context('.', false, /\.vue$/)
const components = {}

files.keys().forEach(key => {
    if (key === './index.js')
        return
    const componentKey = key.replace(/(\.\/|\.vue)/g, '');
    components[componentKey] = files(key);
})

export default components