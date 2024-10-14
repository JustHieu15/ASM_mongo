const cron = require('node-cron');
const ArticleService = require('./services/article-service');
const puppeteer = require("puppeteer");

async function autoGetLink() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://dantri.com.vn/", {
        waitUntil: "domcontentloaded",
        timeout: 0,
    });

    const result = await page.evaluate(() => {
        const linkEls = document.querySelectorAll(".article-item");
        const links = [];
        linkEls.forEach((link) => {
            links.push({
                url: link.querySelector("a").href,
            });
        });

        return links;
    });

    console.log("Links crawled: ", result); // Kiểm tra kết quả
    await browser.close();
    return result; // Trả về result
}

const randomLink = async () => {
    const links = await autoGetLink(); // Đảm bảo hàm autoGetLink trả về giá trị
    const randomLink = links[Math.floor(Math.random() * links.length)];
    await ArticleService.crawlData(randomLink.url); // Cần await khi gọi hàm async
    return links.filter((link) => link.url !== randomLink.url); // Sửa lỗi
};

async function runCrawlJob() {
    try {
        const links = await randomLink(); // Sửa lại cho đúng giá trị trả về
        console.log("Crawling completed successfully.");
    } catch (error) {
        console.error("Error during crawling:", error);
    }
}


function setupCronJobs() {
    runCrawlJob()

    // Thiết lập cronjob để chạy vào lúc 7 AM
    cron.schedule(
        "0 7 * * *",
        async () => {
            console.log("Starting crawler at 7 AM VN time...");
            await runCrawlJob();
        },
        {
            timezone: "Asia/Ho_Chi_Minh",
        }
    );
}

module.exports = { setupCronJobs };
