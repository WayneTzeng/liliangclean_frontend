import { basename } from 'path'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url, manifest, axios) {
  const { app, router, pinia } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  const customMeta = await renderCustomMeta(url, axios)
  return [html, customMeta, preloadLinks, JSON.stringify(pinia.state.value)]
}

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    return ''
  }
}

async function renderCustomMeta(url, axios) {
  console.log('url', url)
  if (url.includes('service')) {
    const content = await getMetaFromApi(axios)
    return `<meta name="description" content="${content}" />`
  } else {
    return `<meta name="description" content="立亮居家家飾清潔位於大台中地區，在此為您提供居家清潔、裝潢細清、空屋清潔、搬出/搬入清潔、套房清潔、辦公室清潔、年節大掃除、定期清潔、整理收納、沙發清洗、床墊清洗、分離式冷氣清洗、直立式洗衣機清洗、窗戶清潔、廚房清潔、衛浴清潔、客廳清潔、陽台清潔、除塵蟎等家事服務，我們的清潔人員皆為臺灣籍具有良民證、經過專業訓練，採鐘點費清潔，歡迎線上預約諮詢。立亮絕對是有效率、值得信賴的清潔公司。" />`
  }
}

function getMetaFromApi(axios) {
  return new Promise((resolve, reject) => {
    axios
      .get('https://stamp.family.com.tw/api/maps/MapList')
      .then((response) => {
        const res = response.data
        resolve(res.data[0].copyWrite)
      })
      .catch((err) => {
        console.error(err)
        reject()
      })
  })
}
