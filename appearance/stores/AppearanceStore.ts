import { computed, observable } from "mobx"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"
import { THEMES } from "../constants"
import type { Appearance } from "../types/Appearance"
import type { Theme } from "../types/Theme"

export class AppearanceStore extends InitializableStore<Stores> {
  @observable color: Appearance["color"] = "dark"
  @observable display: Appearance["display"] = "cozy"
  @observable fontSize: Appearance["fontSize"] = 16
  @observable mobile: Appearance["mobile"] = false

  async initialize() {
    const { ssrStore } = this.manager.stores
    await ssrStore.initialized

    const userAgent = ssrStore.context
      ? ssrStore.context.get("User-Agent")
      : navigator.userAgent
    this.mobile = /mobile/i.test(userAgent)
  }

  @computed get theme(): Theme {
    return {
      ...THEMES[this.color],
      appearance: {
        color: this.color,
        display: this.display,
        fontSize: this.fontSize,
        mobile: this.mobile,
      },
    }
  }
}
