import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { screen } = ConfigModule
// 产品信息
export const getProjectList = (params: any) => { return getData(`${screen}/net-magazine/page`, { ...params }) }

// 保障任务
export const getTaskList = (params: any) => { return getData(`${screen}/net-task/page`, { ...params }) }

// 敌方
export const getArticleList = (params: any) => { return getData(`${screen}/net-article/page/type2`, { ...params }) }

// 我方动态
export const getArticleStateList = (params: any) => { return getData(`${screen}/net-article/page/type1`, { ...params }) }

// 社会环境
export const getArticleEnvironmentList = (params: any) => { return getData(`${screen}/net-article/page/type3`, { ...params }) }

// 网络态势基础信息
export const getBaseCollectInfo = (params: any) => { return getData(`${screen}/net-log/report/base/collect`, { ...params }) }
