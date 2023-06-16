import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from "vuex-module-decorators"

import store from "@/store"

export interface ConfigState {
  uaa: string;
  baseUrl: string;
  user: any;
  api: string;
  include: any;
}

@Module({ dynamic: true, store, name: "config" })
class Config extends VuexModule implements ConfigState {
  public uaa = `uaa/oauth/token`
  public user = `uaa/api/getUserInfo`
  public baseUrl = `/prod-api/`
  public scheduleName = "/app-schedule/api"
  public api = `/information-unifyuser/api`
  public dictValue = `configure-system/api/server/dict/getDictValueList`
  public addressBook = `app-address/api/bluepage` // 通讯录
  public userBook = `information-unifyuser/api/unifyuser/unifyUser/userList`
  public fileId = `/vue-potal/portal-file/api/file/provider/uploadfile` // 查询fileId详情
  public fileImg = `/vue-potal/portal-file/api/file/provider/resourcesUploadfile`
  public file = `/vue-potal/portal-file/api/file/provider`
  public include = []
  public upLoadAction = `/portal-file/api/file/provider`
  public wisdomadm = `/portal-zhxz/api` // 员工服务
  public screen = `screen-api/lb`

  @Mutation
  public setInclude(arr: any) {
    this.include = arr
  }
}

export const ConfigModule = getModule(Config)
