import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from "vuex-module-decorators"

import store from "@/store"

export interface PageState {
  isTop: boolean;
  roleSubmit: boolean;
  addServSubmit: boolean;
  businessBuildingId: string;
  isSubmit: string;
}

@Module({ dynamic: true, store, name: "page" })
class Config extends VuexModule implements PageState {
  public isTop = false
  public roleSubmit = false
  public addServSubmit = false
  public businessBuildingId = ""
  public isSubmit = ""

  @Mutation
  public setIsTop(val: boolean) {
    this.isTop = val
  }

  @Mutation
  public setRoleSubmit(val: boolean) {
    this.roleSubmit = val
  }

  @Mutation
  public setAddServSubmit(val: boolean) {
    this.addServSubmit = val
  }

  @Mutation
  public setBusinessBuildingIdt(val: string) {
    this.businessBuildingId = val
  }

  @Mutation
  public setIsSubmit(val: string) {
    this.isSubmit = val
  }
}

export const PageModule = getModule(Config)
