'use strict';

const { Canvas, loadImage} = require('skia-canvas');
const canvasHeight = 678;
const canvasWidth = 1200;
const { Blob } = require("buffer");
const fetch = require('node-fetch');
const { blobFrom } = require('node-fetch');
const UPLOAD_TOKEN = '2f04a409d898a4dba15cf36df6ecc8b5b08ff10f808702e4fd8d57c43493a0ceadd649be30b8e3f97bfd27db5188a396afe718766a851aa4ad1cd61121096072df092c814a3da49454dee039dc71927da0fb52590cfbde83133053df1b3e9cea65d3852033e25ebf3661d0d3f398564a7fb87cf5fd3a8bcf452d3658436c84d8'

module.exports = ({ strapi }) => ({
  async getSocialImage(entry, fieldName, uid) {
    const image = await loadImage(`http://localhost:1337${entry?.image?.url}`);
    // const image = await loadImage(`https://editor.luxtoday.lu${entry?.image?.url}`);
    console.log(entry,'entry')

    const title = entry.title;
    let tag = '#Blog';

    let canvas = new Canvas( canvasWidth, canvasHeight ),
      ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.filter = 'blur(5px)';
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    let splittedTitle = title.split(' ');
    let firstLine = '';
    let secondLine = '';
    let thirdLine = '';
    for (let i in splittedTitle) {
      if (firstLine.length < 30) {
        firstLine += `${splittedTitle[i]} `;
      } else if (secondLine.length < 30) {
        secondLine += `${splittedTitle[i]} `;
      } else {
        thirdLine += `${splittedTitle[i]} `;
      }
    }
    ctx.restore();
    ctx.filter = "none";

    printText( ctx, 'EasyBiz', 'bold 48px -apple-system, sans-serif', 48, 80, 'white');
    printText( ctx, firstLine, '600 56px -apple-system, sans-serif', 48, 400, 'white');
    if (secondLine.length > 0) {
      printText( ctx, secondLine, '600 56px -apple-system, sans-serif', 48, 470, 'white');
    }
    if (thirdLine.length > 0) {
      printText( ctx, thirdLine, '600 56px -apple-system, sans-serif', 48, 540, 'white');
    }

    printText( ctx, tag, '700 40px -apple-system, sans-serif', 48, 650, '#CACBCC');

    await uploadImage(await canvas.jpg, entry.documentId, title, fieldName, uid);
  }
});

async function uploadImage (buffer, entryId, title, fieldName, uid) {
  try {
    // const file = await blobFrom(buffer, 'image/jpg');
    const blob = new Blob([buffer]);
    const imageFile = new File([blob], `${new Date().getTime()}_${entryId}.jpg`, { type: 'image/jpg' });
    const form = new FormData();
    console.log(entryId,'entryId')
    console.log(uid,'uid')
    console.log(fieldName,'fieldName')
    form.append('files', imageFile, `${new Date().getTime()}_${entryId}.jpg`);
    console.log("UPLOAD")
    form.append('refId', entryId);
    form.append('ref', uid);
    form.append('field', fieldName);
    const response = await fetch('http://localhost:1337/api/upload', {
      method: 'post',
      body: form,
      // headers: new Headers({
      //   'Authorization': `Bearer ${UPLOAD_TOKEN}`,
      // }),
    });
    console.log(response,'response')
    // const response = await fetch('http://localhost:1337/api/upload', {
    // const response = await fetch('http://localhost:1337/api/upload', {
    //   method: 'post',
    //   body: form,
    //   headers: new Headers({
    //     'Authorization': `Bearer ${process.env.STRAPI_PLUGIN_TOKEN}`,
    //   }),
    // });
    // return await response.json();
  } catch (e) {
    console.log(e);
  }
}
function printText (ctx, text, font, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
}
