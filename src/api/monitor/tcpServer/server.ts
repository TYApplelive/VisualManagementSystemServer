import net from "net"
// 监听服务器 TCP 传输
export const tcpserver = net.createServer((socket) => {
    // TODO 连接拦截+验证
    console.log("客户端连接成功", socket.remoteAddress)

    socket.on("data", (data) => {
        console.log(`客户端发送的数据: ${data} , 接收到得字节数 ${socket.bytesRead} `)
        socket.write("服务器已收到数据")
        //TODO 存储信息
    })

    socket.on("error", (err) => {
        console.error(`客户端错误: ${err}`)
    })

    socket.on("end", () => {
        console.log("数据接收完毕")
    })

    socket.on("close", () => {
        console.log("服务器关闭连接")
    })
})
