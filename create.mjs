import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

const resolve = (__dirname, ...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))
log('请输入要生成的"页面名称:页面描述"')

let inputName, inputDesc
process.stdin.on('data', async (chunk) => {
  // 获取输入的信息
  const content = String(chunk).trim().toString()
  const inputSearch = content.search(':')
  if (inputSearch == -1) {
    errorLog('格式错误，请重新输入')
    return
  }
  // 拆分用户输入的名称和描述
  inputName = content.split(':')[0]
  inputDesc = content.split(':')[1] || inputName
  successLog(`将在当前目录下创建 ${inputName} 页面`)
  const targetPath = resolve('./', inputName)
  // 判断同名文件夹是否存在
  const pageExists = fs.existsSync(targetPath)
  if (pageExists) {
    errorLog('页面已经存在，请重新输入')
    return
  }

  // 获取map.json文件内容，获取当前已有的页面集合
  await fs.readFile(path.resolve('./', 'map.json'), 'utf-8', (err, data) => {
    //获取老数据
    let datas = JSON.parse(data)
    //和老数据去重
    let index = datas.findIndex((ele) => {
      return ele.chunk == inputName
    })
    if (index == -1) {
      //写入新页面的信息
      let obj = {
        name: inputName,
        desc: inputDesc,
        createTime: Date.now()
      }
      datas.push(obj)
      setMapFile(datas)
    }
  })

  /**
   * 改变map.json
   */
  function setMapFile(datas) {
    // 通过writeFile改变数据内容
    fs.writeFile(
      path.resolve('./', 'map.json'),
      JSON.stringify(datas),
      'utf-8',
      (err) => {
        if (err) throw err
        // 源文件路径
        const source = './temp.html'
        // 目标文件路径
        const destination = `./${ inputName }.html`
        fs.copyFileSync(source, destination)
        process.stdin.emit('end')
      }
    )
  }
})

process.stdin.on('end', () => {
  console.log('exit')
  process.exit()
})

//递归复制模版文件夹内的文件
const copyFile = (sourcePath, targetPath) => {
  const newSourcePath = path.resolve(sourcePath, file.name)
  const newTargetPath = path.resolve(targetPath, file.name)
  fs.copyFileSync(newSourcePath, newTargetPath)
}
