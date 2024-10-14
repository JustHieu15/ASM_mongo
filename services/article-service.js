const articleRepository = require('../repositories/article-repository');
const puppeteer = require("puppeteer");
const slugify = require('slugify');
const cron = require('node-cron');

// Xóa dấu
function removeAccents(str) {
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
        .replace(/đ/g, 'd')              // Chuyển đổi 'đ' thường thành 'd'
        .replace(/Đ/g, 'D');             // Chuyển đổi 'Đ' hoa thành 'D'
}

class ArticleService {
    async getAllArticles(page, limit) {
        return articleRepository.getArticles(page, limit);
    }

    async createArticle(articleData) {
        const titleWithoutAccents = removeAccents(articleData.title);
        articleData.slug = slugify(titleWithoutAccents, { lower: true, strict: true });

        return await articleRepository.createArticle(articleData);
    }

    async updateArticle(id, updateData) {
        if (updateData.title) {
            const titleWithoutAccents = removeAccents(updateData.title);
            updateData.slug = slugify(titleWithoutAccents, { lower: true, strict: true });
        }
        return await articleRepository.updateArticle(id, updateData);
    }

    async getArticleById(id) {
        return await articleRepository.getArticleById(id);
    }

    async getArticleByIdAndSlug (slug, id) {
        return await articleRepository.getArticlebyIdAndSlug(slug, id)
    }

    async deleteArticle(id) {
        return await articleRepository.deleteArticle(id);
    }

    async searchArticles(query, page, limit) {
        return await articleRepository.searchArticles(query, page, limit);
    }


    //craw dữ liệu
    async crawlData(url) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

        const result = await page.evaluate(() => {
            const titleEl = document.querySelector("h1.title-page.detail");
            const contentEls = document.querySelector(".singular-content");
            const authorEl = document.querySelector(".author-name");

            const convert = [];

            contentEls.childNodes.forEach((child) => {
                if (child.tagName.toLowerCase() === "p") {
                    convert.push(child.textContent); // Chỉ thêm textContent vào mảng
                }
                if (child.tagName.toLowerCase() === "figure") {
                    const figure = {
                        src: null,
                        caption: null,
                    };
                    child.childNodes.forEach((child2) => {
                        if (child2.tagName.toLowerCase() === "img") {
                            figure.src = child2.src;
                        }
                        if (child2.tagName.toLowerCase() === "figcaption") {
                            const figcaption = child2.childNodes[0];
                            figure.caption = figcaption.textContent;
                        }
                    });
                    // Thêm caption vào mảng nếu có
                    if (figure.caption) {
                        convert.push(figure.caption);
                    }
                }
            });

            return {
                title: titleEl ? titleEl.innerText : null,
                content: convert.join('\n\n'), // Nối các phần tử thành một chuỗi, mỗi phần tử cách nhau bằng hai dòng
                author: authorEl ? authorEl.innerText : "Tác giả không xác định",
            };
        });

        await browser.close();

        if (result.title && result.content) {
            const newArticle = {
                title: result.title,
                content: result.content,
                author: result.author,
                categoryId: '670640fa94c2145271473d9b', // ID category "tạo tự động"
                slug: slugify(result.title, { lower: true, strict: true }) // Tạo slug
            };

            return await articleRepository.createArticle(newArticle);
        } else {
            throw new Error("Failed to crawl article data");
        }
    }

}


//CronJob
cron.schedule(
    "0 7 * * *",
    async () => {
        console.log("Starting crawler at 7 AM VN time...");

        const articleService = new ArticleService();
        try {
            const url = "https://dantri.com.vn/the-thao/haaland-co-phan-ung-gay-phan-no-sau-tham-bai-voi-ty-so-1-5-20241014104544093.htm";
            await articleService.crawlData(url);
            console.log("Crawling completed successfully.");
        } catch (error) {
            console.error("Error during crawling:", error);
        }
    },
    {
        timezone: "Asia/Ho_Chi_Minh",
    }
);


module.exports = new ArticleService();
