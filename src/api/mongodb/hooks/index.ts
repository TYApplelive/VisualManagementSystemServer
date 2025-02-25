//**  mongodb 函数出口文件
// * 本文件用于提供mongodb CURD 函数 使用XXXOne()单步函数
// * 不适用于过多的批量内容写入等操作
// * 多次操作可以通过循环实现，但是会损耗较多的资源
//  */

export * from "./db_find"
export * from "./db_insert"
export * from "./db_update"
export * from "./db_delete"
