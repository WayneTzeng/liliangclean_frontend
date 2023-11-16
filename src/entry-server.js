import { basename } from 'path'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url, manifest) {
  const { app, router, pinia } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  const customMeta = await renderCustomMeta(url)
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

async function renderCustomMeta(url) {
  if (url.includes('service')) {
    return `<meta name="description" content="立亮居家家飾清潔，在居家清潔中的範圍包含客廳清潔、廚房清潔、浴室清潔、陽台清潔、房間清潔、窗戶清潔，裝潢細清、定期清潔、套房清潔、辦公室清潔。包含日常髒污清潔、整理收納、油污清潔、水垢清潔、消毒、裝潢後的粉塵清潔。清潔服務區域以大台中市區為主。台中清潔公司、台中居家清潔、台中裝潢清潔都交給認真、負責，網友好評推薦的立亮。" />`
  } else if (url.includes('notice')) {
    return `<meta name="description" content="立亮居家家飾清潔提供專員三大保證、四大安心服務，專員為台灣籍具有良民證、本公司專員皆受過專業訓練並且定期回訓、嚴選清潔劑、合法登記公司、超高滿意度。服務須知整理出常見的問題以及權利告知，包含服務的項目：居家清潔、裝潢細清、空屋清潔、定期清潔、Dyson除塵蟎、沙發清潔、床墊清潔、直立式洗衣機清潔、分離式冷氣清潔。時間如何估算、服務當天是否可以加時或減時、如何修改訂單、付款方式、不服務的內容有哪些、驗收方式、居家清潔的注意事項以及清潔用具的提供，清潔相關Q&A。" />`
  } else {
    return `<meta name="description" content="立亮居家家飾清潔位於大台中地區，在此為您提供居家清潔、裝潢細清、空屋清潔、搬出/搬入清潔、套房清潔、辦公室清潔、年節大掃除、定期清潔、整理收納、沙發清洗、床墊清洗、分離式冷氣清洗、直立式洗衣機清洗、窗戶清潔、廚房清潔、衛浴清潔、客廳清潔、陽台清潔、除塵蟎等家事服務，我們的清潔人員皆為臺灣籍具有良民證、經過專業訓練，採鐘點費清潔，歡迎線上預約諮詢。立亮絕對是有效率、值得信賴的清潔公司。" />`
  }
}
