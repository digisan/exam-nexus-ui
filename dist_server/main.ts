// Copy this file into /dist/
// in /dist folder, run `deno init`, `deno install` and `deno run -A main.ts`

// 启动服务器
const port = 8000

Deno.serve({ port: port }, async (req: Request) => {
    const url = new URL(req.url);
    const filePath = `.${url.pathname}`; // 当前路径（相对于 dist 文件夹）

    try {
        // 如果请求的是根路径，返回 index.html
        if (filePath === "./" || filePath === "./index.html") {
            const file = await Deno.open("./index.html", { read: true }); //
            return new Response(file.readable, {
                headers: { "Content-Type": "text/html" },
            });
        }

        // 尝试打开请求的文件
        const file = await Deno.open(filePath, { read: true });
        return new Response(file.readable, {
            headers: { "Content-Type": getContentType(filePath) },
        });

    } catch (err) {
        // 如果文件不存在，返回 404
        if (err instanceof Deno.errors.NotFound) {
            return new Response("File not found", { status: 404 });
        }
        // 其他错误返回 500
        return new Response("Internal Server Error", { status: 500 });
    }
});

console.log(`Server running at http://localhost:${port}/`);

// 根据文件扩展名获取 Content-Type
function getContentType(filePath: string): string {
    // 使用 Map 存储文件扩展名和对应的 Content-Type
    const contentTypeMap = new Map<string, string>([
        [".html", "text/html"],
        [".css", "text/css"],
        [".js", "application/javascript"],
        [".svg", "image/svg+xml"],
        [".png", "image/png"],
        [".jpg", "image/jpeg"],
        [".jpeg", "image/jpeg"],
        [".json", "application/json"],
        [".txt", "text/plain"],
        [".ico", "image/x-icon"],
        [".woff", "font/woff"],
        [".woff2", "font/woff2"],
        [".ttf", "font/ttf"],
    ]);

    // 获取文件扩展名
    const extension = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();

    // 返回对应的 Content-Type，如果未找到则返回默认值 "text/plain"
    return contentTypeMap.get(extension) || "text/plain";
}
