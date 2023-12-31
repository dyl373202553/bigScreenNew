import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators"
import store from "@/store"
import { login, refresh, getUser, getRoleInfo } from "@/api/user"
import localStorage from "@/lib/js/localStorage"
import Cookies from "js-cookie"

const TOKEN_KEY = "kmportaltoken"
const RETOKEN = "kmportalrefreshtoken"
const EXPIRESIN = "kmportalexpires_in"
const BUILDTIME = "kmportalbuildTime"
const USER = "user"
const USERROLE = "userrole"

export interface UserState {
  token: any;
  refreshToken: any;
  expiresIn: any;
  buildTime: any;
  user: any;
  userrole: any;
  routerList: any;
  powerList: any;
  roleList: any;
  todo: number;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserState {
  public refreshToken = this.getReTokenValue()
  public expiresIn = this.getExpiresinValue()
  public buildTime = this.getBuildTimeValue()
  public token = this.getTokenValue()
  public user = this.getUserValue()
  public userrole = ""
  public routerList: any = []
  public powerList: any = []
  public roleList = ""
  public role = ""
  public todo = 0

  @Mutation
  private SET_TOKEN(token: any): void {
    this.token = token
  }

  @Mutation
  private SET_REFRESHTOKEN(refreshToken: any): void {
    this.refreshToken = refreshToken
  }

  @Mutation
  private SET_EXPIRESIN(expiresIn: any): void {
    this.expiresIn = expiresIn
  }

  @Mutation
  private SET_BUILDTIME(value: any): void {
    this.buildTime = value
  }

  @Mutation
  private SET_USER(user: any) {
    this.user = user
    localStorage.set(USER, JSON.stringify(user))
  }

  @Mutation
  private SET_USERROLE(userrole: any) {
    this.userrole = userrole
  }

  @Mutation
  private SET_ROUTER(menuList: any) {
    const arr: any = []
    menuList.forEach((item: any) => {
      arr.push(item.code)
    });
    this.routerList = arr
  }

  @Mutation
  private SET_POWRE(powerList: any) {
    const arr: any = []
    powerList.forEach((item: any) => {
      arr.push(item.code)
    });
    this.powerList = arr
  }

  @Mutation
  private SET_ROLELIST(roleList: any) {
    const arr: any = []
    const brr: any = []
    roleList.forEach((item: any) => {
      arr.push(item.name)
      brr.push(item.code)
    });
    this.roleList = arr.toString()
    this.role = brr.toString()
  }

  @Action
  public async isToken(): Promise<boolean> {
    const token: string | undefined = Cookies.get(TOKEN_KEY)
    const expires: number = Cookies.get(EXPIRESIN) ? Number(Cookies.get(EXPIRESIN)) : 0
    const buildTime: number = Cookies.get(BUILDTIME) ? Number(Cookies.get(BUILDTIME)) : 0

    if (expires !== 0 && (new Date().getTime() - buildTime) / 1000 > expires) {
      const isToken: boolean = await this.RefreshToken()
      return isToken
    } else if (token && (new Date().getTime() - buildTime) / 1000 < expires) {
      return true
    } else {
      return false
    }
  }

  @Action
  public async Login({ userName, passWord }: { userName: string; passWord: string }) {
    const res = await login({ userName, passWord })
    const { access_token, refresh_token, expires_in } = res
    if (access_token) {
      this.setValue(res)
      this.SET_TOKEN(access_token)
      this.SET_REFRESHTOKEN(refresh_token)
      this.SET_EXPIRESIN(expires_in)
      this.SET_BUILDTIME(new Date().getTime() - 60000)
      this.getUser()
      this.getRoleInfo()
      return true
    }
    return false
  }

  @Action
  public async getUser() {
    const { user } = await getUser()
    this.SET_USER(user)
  }

  @Action
  public async getRoleInfo() {
    const { data } = await getRoleInfo({})
    this.SET_USERROLE(data)
    this.SET_ROUTER(data.menuList)
    this.SET_POWRE(data.powerList)
    this.SET_ROLELIST(data.roleList)
    // Cookies.set(USERROLE, data)
  }

  @Action
  initialize({ userName, passWord }: { userName: string; passWord: string }) {
    // @ts-ignore
    if (process.env.NODE_ENV !== "development") {
      this.SET_TOKEN(String(Cookies.get(TOKEN_KEY)))
      this.SET_REFRESHTOKEN(String(Cookies.get(RETOKEN)))
      this.SET_EXPIRESIN(Number(Cookies.get(EXPIRESIN)))
      this.SET_BUILDTIME(Number(Cookies.get(BUILDTIME)))
      this.getUser()
      this.getRoleInfo()
    } else {
      this.Login({ userName, passWord })
    }
  }

  @Action
  public async RefreshToken(): Promise<boolean> {
    const res = await refresh(this.refreshToken)
    const { access_token, refresh_token, expires_in } = res

    if (access_token) {
      this.setValue(res)
      this.SET_TOKEN(access_token)
      this.SET_REFRESHTOKEN(refresh_token)
      this.SET_EXPIRESIN(expires_in)
      this.SET_BUILDTIME(new Date().getTime() - 60000)
      return true
    }

    return false
  }

  @Action
  public setValue(value: any): void {
    const { access_token, refresh_token, expires_in } = value

    Cookies.set(TOKEN_KEY, access_token)
    Cookies.set(RETOKEN, refresh_token)
    Cookies.set(EXPIRESIN, String(expires_in))

    const buildTime = String(new Date().getTime() - 60000)
    Cookies.set(BUILDTIME, buildTime)
  }

  @Action
  public ResetToken(): void {
    this.removeLogin()
    this.SET_TOKEN("")
    this.SET_REFRESHTOKEN("")
    this.SET_EXPIRESIN(0)
    this.SET_BUILDTIME(0)
  }

  @Action
  private removeLogin(): void {
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(RETOKEN)
    Cookies.remove(EXPIRESIN)
    Cookies.remove(BUILDTIME)
  }

  @Action
  public async getUserValue() {
    const isToken = await this.isToken()
    if (!isToken) {
      return {}
    }
    return JSON.parse(String(localStorage.get(USER)))
  }

  @Action
  public async getUserRole() {
    const isToken = await this.isToken()
    if (!isToken) {
      return {}
    }
    return Number(Cookies.get(USERROLE))
  }

  @Action
  public async monitor() {
    const expiresIn = await this.expiresIn
    const buildTime = await this.buildTime
    if (expiresIn !== 0 && (new Date().getTime() - buildTime) / 1000 > 10000) {
      this.RefreshToken()
    } else if (expiresIn !== 0 && (new Date().getTime() - buildTime) / 1000 > expiresIn) {
      this.Login({ userName: "0804553E53D2E5BA", passWord: "B6D99AD4A856637B7F14042708632B26" })
    }
  }

  @Action
  private async getTokenValue() {
    const isToken = await this.isToken()

    if (!isToken) {
      return ""
    }

    return Cookies.get(TOKEN_KEY)
  }

  @Mutation
  private async getReTokenValue() {
    const isToken = await this.isToken()
    if (!isToken) {
      return ""
    }

    return Cookies.get(RETOKEN)
  }

  @Mutation
  private async getExpiresinValue() {
    const isToken = await this.isToken()
    if (!isToken) {
      return 0
    }

    return Number(Cookies.get(EXPIRESIN))
  }

  @Mutation
  private async getBuildTimeValue() {
    const isToken = await this.isToken()
    if (!isToken) {
      return 0
    }

    return Number(Cookies.get(BUILDTIME))
  }
}
export const UserModule = getModule(User)
