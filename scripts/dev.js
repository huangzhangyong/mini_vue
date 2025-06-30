import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import esbuild from 'esbuild'
import { createRequire } from 'node:module'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
})

const target = positionals.length ? positionals[0] : 'vue'
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
const requireFun = createRequire(import.meta.url)
const pkg = requireFun(`../packages/${target}/package.json`)
console.log('pkg==>', pkg)
esbuild
  .context({
    entryPoints: [entry], //入口文件
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`), //输出文件
    format, //输出格式
    bundle: true, //把所有依赖打包到一个文件
    sourcemap: true, //生成sourcemap
    minify: false, //是否压缩
    platform: format === 'cjs' ? 'node' : 'browser', //平台
    globalName: pkg.buildOptions.name, //全局变量名
  })
  .then((ctx) => {
    ctx.watch().catch((err) => {
      console.error('Error starting watch mode:', err)
    })
  })
  .catch((err) => {
    console.error('Error starting esbuild context:', err)
  })
