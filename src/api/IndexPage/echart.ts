import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { screen } = ConfigModule

// 攻击类型分布
export const getAttackTypeData = (params: any) => { return getData(`${screen}/net-warn/report/attackType`, { ...params }) }

// 运行指数
export const getDelayData = (params: any) => { return getData(`${screen}/net-log/report/delay`, { ...params }) }

// 网咯运行态势
// 坐标
export const getMapRegionData = (params: any) => { return getData(`${screen}/net-base/list/all/region`, { ...params }) }

// 连线
export const getMapLineData = (params: any) => { return getData(`${screen}/net-log/report/base/line`, { ...params }) }

// 流量趋势图
export const getTrafficTrendsData = (params: any) => { return getData(`${screen}/net-log/report/upload/download`, { ...params }) }

// 事件趋势图
export const getLevelTypeData = (params: any) => { return getData(`${screen}/net-warn/report/levelType`, { ...params }) }

// 保障任务情况
export const getMonthTypeData = (params: any) => { return getData(`${screen}/net-task/report/month`, { ...params }) }

// 安全防护态势
export const getCollectLevelTypeData = (params: any) => { return getData(`${screen}/net-warn/collect/levelType`, { ...params }) }

// 任务保障态势
export const getCollectCountyStatusData = (params: any) => { return getData(`${screen}/net-task/collect/county/status`, { ...params }) }

// 通信设备使用情况
export const getReportDeviceTypeData = (params: any) => { return getData(`${screen}/net-task/report/deviceType`, { ...params }) }

// 保障任务态势详情
export const getNetTaskDetail = (id: string) => { return getData(`${screen}/net-task/get`, { id }) }

// 连接数
export const getConnectionsData = (params: any) => { return getData(`${screen}/log-firewall-snmp/collect/connect`, { ...params }) }

// 接口流量
export const getInterfaceTrafficData = (params: any) => { return getData(`${screen}/log-firewall-snmp/collect/up/down`, { ...params }) }

// 病毒防护事件统计
export const getVirusProtectionData = (params: any) => { return getData(`${screen}/log-firewall/collect/apple`, { ...params }) }

// 安全事件统计
export const getBananaData = (params: any) => { return getData(`${screen}/log-firewall/collect/banana`, { ...params }) }

// 连接数百分比统计
export const getConnectionsRateData = (params: any) => { return getData(`${screen}/log-firewall-snmp/collect/up/down/percent`, { ...params }) }

// 风险等级
export const getCherryData = (params: any) => { return getData(`${screen}/log-firewall/collect/cherry`, { ...params }) }