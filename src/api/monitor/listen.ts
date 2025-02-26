import net from "net"

// 监听服务器
const server = net.createServer((socket) => {
    socket.on("connect", () => {
        console.log("客户端连接")
    })
    socket.on("data", (data) => {
        console.log(`客户端发送的数据: ${data}`)
        socket.write("服务器已收到数据")
    })
    socket.on("close", () => {
        console.log("客户端关闭连接")
    })
    socket.on("error", (err) => {
        console.error(`客户端错误: ${err}`)
    })
})

export default server
