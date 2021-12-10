import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import {LOCATION_TEST,LOCATION_TEST_NORMAL} from "./constants/routes";
let browser: puppeteer.Browser | undefined;
let page: puppeteer.Page | undefined;

const sleep = async (ms: number) => await new Promise(res => setTimeout(res, ms));

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [`--window-size=1920,1080`],
    });
    page = await browser.newPage();
    await page.goto(LOCATION_TEST);
    localStorage.setItem('articleId','')
});
afterAll(() => {
    browser?.close();
});

afterEach(() => {
    sleep(3_000);
});

describe('All', () => {
test('Login', async () => {
    await sleep(1_000);
    const toLoginFormButton = await page?.$('#login');
    toLoginFormButton?.click();
    await sleep(1_000);

    await page?.type('#loginTest', '1@1.com');
    await page?.type('#passwordTest', '1@1.com');
    const submitLoginButton = await page?.$('#buttonLogin');
    submitLoginButton?.click();
    await sleep(1_000);
    const url = page?.url();

    expect(url).toBe(`${LOCATION_TEST_NORMAL}/`);
}, 15_000);
    //
    // test('Add article', async () => {
    //     const toHomeButton = await page?.$('#home');
    //     toHomeButton?.click();
    //     await sleep(1_000);
    //
    //     const toChannelButton = await page?.$('#channel');
    //     toChannelButton?.click();
    //     await sleep(7_000);
    //    // await page?.setViewport({width: 1366, height: 768});
    //     await page?.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    //
    //     const createArticleButton = await page?.$('#createTest');
    //     createArticleButton?.click();
    //     await sleep(1_000);
    //     await page?.type('.ql-editor', 'Текст статьи для теста');
    //
    //     const openModalPublish = await page?.$('#openModalPublishTest');
    //     openModalPublish?.click();
    //     await sleep(2_000);
    //     await page?.type('#title', "Заголовок");
    //     await page?.type('#shortDescription', 'Краткое описание');
    //
    //     await page?.select('#rubrics', 'Наука');
    //
    //    // await sleep(100_000);
    //    //  const fileDirectory = path.resolve(__dirname, 'imgs');
    //    //  const filePath = `${fileDirectory}\\4b0a56929d.jpg`;
    //    //  const element = await page?.$('#exampleControlsFile1');
    //    //  await element?.uploadFile(filePath);
    //    //  await page?.waitForSelector('input[type=file]');
    //    //  await page?.waitFor(1000);
    //    //
    //    //  // get the ElementHandle of the selector above
    //    //  const inputUploadHandle = await page?.$('input[type=file]');
    //    //
    //    //  // prepare file to upload, I'm using test_to_upload.jpg file on same directory as this script
    //    //  // Photo by Ave Calvar Martinez from Pexels https://www.pexels.com/photo/lighthouse-3361704/
    //    //  let fileToUpload = '../imgs/4b0a56929d.jpg';
    //    //
    //    //  // Sets the value of the file input to fileToUpload
    //    //  inputUploadHandle?.uploadFile(fileToUpload);
    //    //
    //    //  // doing click on button to trigger upload file
    //    //  await page?.waitForSelector('#exampleControlsFile1');
    //    //  await page?.evaluate(() => document.getElementById('exampleControlsFile1')?.click());
    //    //
    //
    //
    //     const publicationCreateButton = await page?.$('#publicationCreateTest');
    //     publicationCreateButton?.click();
    //     // await page?.on('dialog', async dialog => {
    //     //     console.log(dialog.message());
    //     //     await dialog.accept();
    //     // });
    //
    //     await sleep(10_000);
    //     const url = page?.url();
    //     expect(url).toBe(`${LOCATION_TEST_NORMAL}/editor`);
    // }, 30_000);
    //
    // test('change profile', async () => {
    //     const toHomeButton = await page?.$('#home');
    //     toHomeButton?.click();
    //     await sleep(1_000);
    //   //  await page?.goto(`${LOCATION_TEST}/article/10`);
    //     const toTravelButton = await page?.$('#l');
    //     toTravelButton?.click();
    //     await sleep(10_000);
    //     const toArticleButton = await page?.$('#art');
    //     toArticleButton?.click();
    //     await sleep(5_000);
    //     const toChannelButton = await page?.$('#likeTest');
    //     toChannelButton?.click();
    //     await sleep(3_000);
    //
    //
    //     const url = page?.url();
    //     expect(url).toBe(`${LOCATION_TEST_NORMAL}/article/10`);
    // }, 30_000);


    test('Export to Excel test', async () => {

        const client = await page?.target().createCDPSession();
        const downloadPath = path.resolve(__dirname, 'imgs');
        await client?.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath,
        });
        const toHomeButton = await page?.$('#home');
        toHomeButton?.click();

        await sleep(1_000);

        const toChannelButton = await page?.$('#channel');
        toChannelButton?.click();
        await sleep(1_000);

        const toStatTestButton = await page?.$('#statTest');
        toStatTestButton?.click();
        await sleep(10_000);
        const exportButton = await page?.$('#downloadTest');
        exportButton?.click();

        const filePath = `${downloadPath}\\Статистика.xlsx`;
        let resultSaving = '';
        if (fs.existsSync(filePath)) {
            resultSaving = 'ok';
        } else {
            resultSaving = 'error';
        }
        expect(resultSaving).toBe('ok');
        await sleep(1_000);
    }, 25_000);


})